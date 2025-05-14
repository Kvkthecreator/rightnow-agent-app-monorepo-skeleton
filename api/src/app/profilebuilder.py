from app.profilebuilder_agent import profilebuilder_agent
from agents.run import Runner
from app.util.webhook import send_webhook          # make sure this import path is right
from app.util.task_utils import create_task_and_session
from datetime import datetime
from fastapi import APIRouter, Request, HTTPException
import os

router = APIRouter()
# Profilebuilder conversation flow configuration
QUESTIONS = [
    ("niche", "What niche or topic best describes your content?"),
    ("audience_goal", "Who are you hoping to reach?"),
    ("platforms", "Which platforms do you post on?"),
    ("follower_count", "Roughly how many followers do you have in total?"),
    ("content_frequency", "How often do you post?"),
    ("monetization_goal", "What's your primary revenue goal?"),
]
KICKOFF_MESSAGE = "Hi! I'm here to help build your creator profile. I'll ask you a few quick questions to understand your goals better."
FINAL_MESSAGE = "Thanks! You can now review and edit your answers before generating your Insight Report."
PROFILE_WEBHOOK_URL = os.getenv("PROFILE_WEBHOOK_URL")
CHAT_WEBHOOK_URL    = os.getenv("CLARIFICATION_WEBHOOK_URL")


@router.post("/profilebuilder")
async def profilebuilder_handler(req: Request):
    body = await req.json()
    # Extract user_id and prompt
    user_id = body.get("user_id")
    prompt = body.get("prompt") or body.get("user_prompt") or body.get("message")
    # Validate presence of user_id
    if not user_id:
        raise HTTPException(422, "Missing user_id")
    # Determine if this is the initial call (no task_id)
    original_task_id = body.get("task_id")
    # Initial call: start session and send kickoff + first question
    if not original_task_id:
        task_id = create_task_and_session(user_id, "profilebuilder")
        created_at = datetime.utcnow().isoformat()
        # Kickoff message
        if CHAT_WEBHOOK_URL:
            await send_webhook(
                CHAT_WEBHOOK_URL,
                {
                    "task_id":         task_id,
                    "user_id":         user_id,
                    "agent_type":      "profilebuilder",
                    "message_type":    "text",
                    "message_content": KICKOFF_MESSAGE,
                    "created_at":      created_at,
                },
            )
        # First question
        first_field, first_question = QUESTIONS[0]
        if CHAT_WEBHOOK_URL:
            await send_webhook(
                CHAT_WEBHOOK_URL,
                {
                    "task_id":         task_id,
                    "user_id":         user_id,
                    "agent_type":      "profilebuilder",
                    "message_type":    "text",
                    "message_content": first_question,
                    "created_at":      created_at,
                },
            )
        return {"type": "text", "message_content": first_question}
    # Subsequent calls: must have prompt
    task_id = original_task_id
    if not prompt:
        raise HTTPException(422, "Missing prompt for existing session")
    # Debug log
    print(f"[profilebuilder] user_id={user_id} task_id={task_id} prompt={prompt}")
    # 1. Run the agent to parse input and generate next question
    result = await Runner.run(profilebuilder_agent, prompt)
    out = result.final_output  # ProfileFieldOut
    profile_fragment = {out.field_name: out.field_value}
    follow_up = out.clarification_prompt
    created_at = datetime.utcnow().isoformat()
    # 2. Send profile-partial webhook
    if not PROFILE_WEBHOOK_URL:
        raise RuntimeError("PROFILE_WEBHOOK_URL env var is missing")
    await send_webhook(
        PROFILE_WEBHOOK_URL,
        {
            "task_id":         task_id,
            "user_id":         user_id,
            "agent_type":      "profilebuilder",
            "message_type":    "profile_partial",
            "message_content": profile_fragment,
            "created_at":      created_at,
        },
    )
    # 3. Send chat webhook: next question or final message
    message_to_send = follow_up if follow_up else FINAL_MESSAGE
    if CHAT_WEBHOOK_URL:
        await send_webhook(
            CHAT_WEBHOOK_URL,
            {
                "task_id":         task_id,
                "user_id":         user_id,
                "agent_type":      "profilebuilder",
                "message_type":    "text",
                "message_content": message_to_send,
                "created_at":      created_at,
            },
        )
    # Return normalized chat response
    return {"type": "text", "message_content": message_to_send}
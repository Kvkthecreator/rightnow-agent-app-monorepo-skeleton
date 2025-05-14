# src/app/profilebuilder_agent.py
# -------------------------------

from agents import Agent, output_guardrail, GuardrailFunctionOutput  # ← single import line

from .agent_output import ProfileFieldOut


profilebuilder_agent = Agent(  # exported under this name
    name="Profile-builder",
    instructions="""
You are a helpful assistant for building a creator profile by collecting the following fields one at a time:
1) niche: What niche or topic best describes your content?
2) audience_goal: Who are you hoping to reach?
3) platforms: Which platforms do you post on?
4) follower_count: Roughly how many followers do you have in total?
5) content_frequency: How often do you post?
6) monetization_goal: What's your primary revenue goal?

After each answer, respond only with valid JSON matching the ProfileFieldOut schema above.
- Use 'field_name' for the field you just collected.
- Use 'field_value' for the user's answer, validated non-empty.
- Use 'clarification_prompt' to hold the next question you want to ask the user (or null if done).

Do not repeat any fields already collected.
""",
    output_type=ProfileFieldOut,
)


@output_guardrail
async def schema_guardrail(ctx, agent, llm_output):
    # If the JSON parsed into ProfileFieldOut we’re good.
    return GuardrailFunctionOutput("schema_ok", tripwire_triggered=False)


profilebuilder_agent.output_guardrails = [schema_guardrail]

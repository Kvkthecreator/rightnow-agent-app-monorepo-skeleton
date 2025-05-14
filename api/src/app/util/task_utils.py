# /api/src/app/utils/task_utils.py

import uuid
import os
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)


def create_task_and_session(user_id: str, agent_type: str, metadata: dict = {}) -> str:
    """
    Generates a task_id, logs a new agent_session, and returns the task_id.
    Reusable across all agent types.
    """
    task_id = str(uuid.uuid4())

    payload = {
        "id": task_id,
        "user_id": user_id,
        "agent_type": agent_type,
        **metadata,
    }

    response = supabase.table("agent_sessions").insert(payload).execute()

    if getattr(response, "status_code", 200) != 201:
        print("❌ Error inserting agent_session:", response)
        raise Exception("Agent session creation failed.")

    return task_id

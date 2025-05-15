# agent_entrypoints.py
from fastapi import Request
from app.agents.run import Runner
from app.util.webhook import send_webhook
import json

async def run_agent(req: Request):
    data = await req.json()
    ...
    return { ... }

async def run_agent_direct(req: Request):
    data = await req.json()
    ...
    return { ... }

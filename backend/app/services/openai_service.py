import json
import logging
from typing import Any

from openai import AsyncOpenAI

from app.core.config import get_settings


logger = logging.getLogger(__name__)


class OpenAIService:
    def __init__(self) -> None:
        settings = get_settings()
        self.model = settings.openai_model
        self.client = AsyncOpenAI(api_key=settings.openai_api_key) if settings.openai_api_key else None

    async def complete_json(self, prompt: str, fallback: dict[str, Any]) -> dict[str, Any]:
        if self.client is None:
            return fallback

        try:
            content = await self._request_json(prompt)
            parsed = json.loads(content)
            if not isinstance(parsed, dict):
                return fallback
            return parsed
        except Exception:
            logger.exception("OpenAI request failed; using fallback output.")
            return fallback

    async def _request_json(self, prompt: str) -> str:
        if hasattr(self.client, "responses"):
            response = await self.client.responses.create(
                model=self.model,
                input=prompt,
                text={"format": {"type": "json_object"}},
            )
            return response.output_text

        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": "Return only valid JSON that matches the requested schema.",
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            response_format={"type": "json_object"},
        )
        return response.choices[0].message.content or "{}"

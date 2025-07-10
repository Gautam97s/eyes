from pydantic import BaseModel

class NLQuery(BaseModel):
    prompt: str

class NLSummaryResponse(BaseModel):
    summary: str


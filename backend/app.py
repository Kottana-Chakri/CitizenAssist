import os
import logging
from typing import Optional
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, validator
from dotenv import load_dotenv
from agents import run_agent, list_all_agents, get_agent_info, AGENTS

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=getattr(logging, os.getenv("LOG_LEVEL", "INFO")),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="CitizenAssist API",
    description="Multi-agent AI system providing citizen services from education to career coaching",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in cors_origins],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Request Models
class ChatRequest(BaseModel):
    agent_id: str
    message: str
    
    @validator('agent_id')
    def validate_agent_id(cls, v):
        if v not in AGENTS:
            raise ValueError('Invalid agent_id')
        return v
    
    @validator('message')
    def validate_message(cls, v):
        if not v or not v.strip():
            raise ValueError('Message cannot be empty')
        if len(v) > 2000:
            raise ValueError('Message too long (max 2000 characters)')
        return v.strip()

# Response Models
class AgentInfo(BaseModel):
    id: str
    role: str
    goal: str
    description: str

class ChatResponse(BaseModel):
    reply: str
    agent_id: str
    processing_time: Optional[float] = None

class ErrorResponse(BaseModel):
    error: str
    message: str
    code: int

# Error Handlers
@app.exception_handler(ValueError)
async def value_error_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content=ErrorResponse(
            error="Validation Error",
            message=str(exc),
            code=400
        ).dict()
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unexpected error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error="Internal Server Error",
            message="An unexpected error occurred. Please try again later.",
            code=500
        ).dict()
    )

# API Routes
@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": "CitizenAssist API",
        "version": "1.0.0",
        "description": "Multi-agent AI system for citizen services",
        "endpoints": {
            "agents": "/api/agents",
            "chat": "/api/respond",
            "health": "/health",
            "docs": "/docs"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "agents_available": len(AGENTS),
        "timestamp": "2025-01-11"
    }

@app.get("/api/agents", response_model=list[AgentInfo])
async def get_agents():
    """Get list of all available agents with their capabilities."""
    try:
        agents = list_all_agents()
        return agents
    except Exception as e:
        logger.error(f"Error fetching agents: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch agents")

@app.get("/api/agents/{agent_id}", response_model=AgentInfo)
async def get_agent(agent_id: str):
    """Get detailed information about a specific agent."""
    agent_info = get_agent_info(agent_id)
    if not agent_info:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent_info

@app.post("/api/respond", response_model=ChatResponse)
async def chat_with_agent(request: ChatRequest):
    """Send a message to a specific agent and get a response."""
    import time
    
    start_time = time.time()
    
    try:
        # Log the request (without sensitive data)
        logger.info(f"Processing request for agent: {request.agent_id}")
        
        # Get response from agent
        reply = run_agent(request.agent_id, request.message)
        
        processing_time = time.time() - start_time
        
        # Log successful processing
        logger.info(f"Successfully processed request for {request.agent_id} in {processing_time:.2f}s")
        
        return ChatResponse(
            reply=reply,
            agent_id=request.agent_id,
            processing_time=processing_time
        )
        
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Failed to process your request. Please try again or contact support if the issue persists."
        )

# Optional: Rate limiting middleware (basic implementation)
from functools import lru_cache
import time

@lru_cache(maxsize=1000)
def get_rate_limiter():
    return {}

# Startup event
@app.on_event("startup")
async def startup_event():
    logger.info("CitizenAssist API starting up...")
    logger.info(f"Available agents: {list(AGENTS.keys())}")
    logger.info("API is ready to serve requests")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("CitizenAssist API shutting down...")

if __name__ == "__main__":
    import uvicorn
    
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    
    logger.info(f"Starting server on {host}:{port}")
    
    uvicorn.run(
        app,
        host=host,
        port=port,
        log_level=os.getenv("LOG_LEVEL", "info").lower(),
        reload=os.getenv("ENVIRONMENT") == "development"
    )
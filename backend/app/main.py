import os
from typing import Annotated

from fastapi import FastAPI, UploadFile, File, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from .services.pdf_service import PDFManager
from .database import init_db
from dotenv import load_dotenv
import uvicorn

from pydantic import BaseModel


app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

# Temporary saving document query_engine in server memory has CACHE by document id 
DOCUMENT_QUERY_ENGIN = {}


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/upload-file")
async def upload_file(file: UploadFile = File(...)):
    print(":: Uploaded File ::", file)
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid document type")

    pdf_manager = PDFManager(file)
    record_id, engine = await pdf_manager.save()
    DOCUMENT_QUERY_ENGIN[record_id] = engine
    return {"record": { "id" : record_id } }


# {question: string}
class Question(BaseModel):
    question: str


@app.post("/response")
async def process_question(
    request: Question,
    x_document_id: Annotated[str | None, Header()] = None,
):
    engine = DOCUMENT_QUERY_ENGIN.get(int(x_document_id))
    if not engine:
        raise HTTPException(400, detail="Please upload document again")
    result = engine.query(request.question)
    if result:
        response = result.response
    return {"result": response, "X_Document_Id": x_document_id}


if __name__ == "__main__":
    uvicorn.run(app, port=8080, host="0.0.0.0")

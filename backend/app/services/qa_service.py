from ..models.pdf_file import PDFFile
from ..database import SessionLocal
# from .llm_service import process_qa

class QnAManager:

    def __init__(self, question: str, document_id: str):
        self.question = question
        self.document_id = int(document_id)
        self.session = SessionLocal()

    async def get_answer(self) -> str:
        print(":::::: QUERY ::::::")
        document = self.session.query(PDFFile).get(self.document_id)
        question = self.question
        # process_qa(document=document, question=question)
        return {"Question": question, "document": document}

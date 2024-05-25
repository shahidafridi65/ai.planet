import os
import pymupdf
from fastapi import  UploadFile

from ..database import SessionLocal
from .llm_service import get_query_engine
from ..models.pdf_file import PDFFile

class PDFManager:

    record: PDFFile = None
    filepath: str = None

    def __init__(self, file: UploadFile):
        self.session = SessionLocal()
        self.file = file

    async def save(self):
        await self.save_db()
        await self.save_local()
        query_engine = await self.get_query_engine()
        return (self.record.id, query_engine)

    async def save_db(self):
        contents = await self.extract_text()
        filename = self.file.filename
        self.record = PDFFile(
            filename=filename,
            type=self.file.content_type,
            size=self.file.size,
            content=contents,
        )
        self.session.add(self.record)
        self.session.commit()

    async def save_local(self):
        file_location = self.get_filepath()
        if file_location:
            with open(file_location, "wb+") as file_object:
                file_object.write(await self.file.read())

    async def get_query_engine(self):
        dir = self.get_dir()
        if dir:
            return await get_query_engine(self.record.content)

    def get_filepath(self):
        if self.record:
            dir = self.get_dir()
            return f"{dir}/{self.file.filename}"
        return None

    def get_dir(self):
        if self.record:
            path = os.getcwd()
            dir = f"{path}/app/storage/{self.record.id}"
            is_exist = os.path.exists(dir)
            if not is_exist:
                os.mkdir(dir)
            return dir
        return None

    async def extract_text(self) -> str:
        contents = await self.file.read()
        pdf_document = pymupdf.open(stream=contents, filetype="bytes")
        text = ""
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
        return text

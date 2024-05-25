import datetime

from sqlalchemy import Column, Integer, String, DateTime
from ..database import Base


class PDFFile(Base):
    __tablename__ = "pdf_files"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    filename = Column(String, nullable=False)
    type = Column(String, nullable=False)
    size = Column(Integer, nullable=False)
    content = Column(String, nullable=False)
    upload_at = Column(DateTime, default=datetime.datetime.now)

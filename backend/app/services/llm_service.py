import os

# HERE I have use COHERE MODEL for NLP TASK 
# Because it don't OPENAI Key to complete this task, so I have taken a trial account on Cohere
# ADDED KEY HERE FOR TESTING, I WILL DELETE THIS KEY IN ONE WEEK
os.environ["COHERE_API_KEY"] = "umC2ahdpRcpqGb09vtEDhTeMOFqUlqSQmWVy9eop"

from llama_index.llms.litellm import LiteLLM
from llama_index.core.node_parser import TokenTextSplitter
from llama_index.core.node_parser import SimpleNodeParser
from llama_index.embeddings.cohere import CohereEmbedding
from llama_index.core import Settings

from llama_index.core import ServiceContext, VectorStoreIndex, SimpleDirectoryReader, Document


import tiktoken

from llama_index.core.node_parser import SentenceSplitter
node_parser = SentenceSplitter(chunk_size=1024, chunk_overlap=20)

embed_model = CohereEmbedding(
    model_name="embed-english-v3.0",
    input_type="search_query",
    embedding_type="int8",
)

# cohere call
llm = LiteLLM("command-nightly")

Settings.node_parser = node_parser
Settings.llm = llm

service_context = ServiceContext.from_defaults(llm=llm, embed_model=embed_model)

path = os.getcwd()

async def get_query_engine(content:str):
    document = Document(text=content)
    index = VectorStoreIndex.from_documents(
        documents=[document], transformation=[node_parser, llm], embed_model=embed_model
    )
    query_engine = index.as_query_engine(
        similarity_top_k=10,
    )
    return query_engine

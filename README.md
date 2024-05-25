# Setup Instructions

- [Backend Setup](./backend/README.md)
- [Frontend Setup](./frontend/README.md)

## Running the Application Locally

1. Start the Backend Server
    Make sure the FastAPI server is running.
    - API Server: <http://localhost:8000>
    - API DOC: <http://localhost:8000/docs>

2. Start the Frontend Development Server
    Ensure the Next.js development server is running.

3. Access the Application
    Open a web browser and navigate to <http://localhost:3000> to use the application.


### Demo Video
<https://streamable.com/ri4grs>

<div style="position:relative; width:100%; height:0px; padding-bottom:56.250%"><iframe allow="fullscreen" allowfullscreen height="100%" src="https://streamable.com/e/ri4grs?" width="100%" style="border:none; width:100%; height:100%; position:absolute; left:0px; top:0px; overflow:hidden;"></iframe></div>

<video src="ai-planet-demo.mp4" controls></video>



## Technologies Used

### Backend
- Framework: FastAPI
- NLP Processing: LlamaIndex with Cohere model and embeddings
- Database: SQLite
- File Storage: Local filesystem

### Frontend

- Framework: Next.js (with Client Components)
- Styling: Tailwind CSS

### Functional Requirements

- PDF Upload: Users can upload PDF documents, which are stored in the file system and their details are saved in the database.
- Question Asking: Users can ask questions about the content of an uploaded PDF. The system processes the question and provide an answer.
- Answer Display: Answers to questions are displayed to the user.

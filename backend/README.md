## Backend Setup

1. Clone the Repository

```bash
git clone https://github.com/shahidafridi65/ai.planet.git
cd ai.planet/backend
```

2. Create a Virtual Environment and Activate It

```
python3 -m venv venv
source venv/bin/activate
```

3. Install Dependencies

```bash
pip install -r requirements.txt
```

4. Run the FastAPI Server

```bash
fastapi dev
```

5. API Endpoints

- **Upload Document: `POST /upload`**
  - Request Body: Multipart/form-data with PDF file
  - Response: JSON containing the id of the stored document

- **Query Document: `POST /response`**
  - Request Header: `X-Document_Id`
  - Request Body: JSON with question
  - Response: JSON with the answer to the question

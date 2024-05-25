// Importing necessary modules and setting up API endpoint
const API_ENDPOINT = process.env.API || 'http://localhost:8000';

// Defining interface for upload document response
interface IUploadDocumentResponse {
    record: {
        id: number
    }
}

// Class for AI services
export default class AIServices {
    // Method for uploading a document
    static async uploadDocument(file: File): Promise<IUploadDocumentResponse | null> {
        try {
            // Creating form data with the file
            const requestBody = new FormData();
            requestBody.append("file", file);

            // Sending POST request to upload the file
            const apiResponse = await fetch(`${API_ENDPOINT}/upload-file`, {
                method: 'POST',
                body: requestBody
            });

            // Parsing the response
            const response = await apiResponse.json();
            return response;
        } catch (error: any) {
            // Handling errors
            console.error(error.message);
        }

        return null; // Returning null if there's an error
    }

    // Method for processing a question
    static async processQuestion(question: string, documentId: number): Promise<string | null> {
        try {
            // Sending POST request to get response for the question
            const apiResponse = await fetch(`${API_ENDPOINT}/response`, {
                method: 'POST',
                headers: {
                    'x-document-id': String(documentId),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ question })
            });

            // Parsing the response
            const response = await apiResponse.json();
            return response?.result;
        } catch (error: any) {
            // Handling errors
            console.error(error.message);
        }

        return null; // Returning null if there's an error
    }
}



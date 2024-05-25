import React, { ChangeEvent, PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react'
import usePDFUploader from '../hooks/usePDFUploader';

interface Message {
	role: string;
	message: string
}

interface IDocumentQAContext {
	file: File | null;
	messages: Message[];
	loading?: boolean;
	fileUploadId?: any;
	onFileUpload?(e: ChangeEvent<HTMLInputElement>): void;
	addNewMessage?(message: Message): void; 
}

const DocumentQAContext = createContext<IDocumentQAContext>({
	file: null,
	messages: []
});

const DocumentQAProvider = ({ children }: PropsWithChildren) => {
	const [file, setFile] = useState<File | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);

	// Use the custom PDF uploader hook, passing in the current file.
	const { loading, fileUploadId } = usePDFUploader(file);

	// Callback function to handle file uploads.
	const onFileUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.files);
		if (e.target.files?.length) {
			setFile(e.target.files[0]);
			setMessages([]);
		}
	}, []);

	const addNewMessage = useCallback((message: Message) => {
		console.log(message);
		setMessages(prevMessages => {
			return [...prevMessages, message]
		});
	}, [])

	// Memoize the context value to avoid unnecessary re-renders.
	const value = useMemo<IDocumentQAContext>(() => {
		return {
			file,
			messages,
			onFileUpload,
			addNewMessage,
			loading,
			fileUploadId
		}
	}, [file, onFileUpload, loading, fileUploadId, addNewMessage, messages])

	return (
		<DocumentQAContext.Provider value={value}>
			{children}
		</DocumentQAContext.Provider>
	)
}

// Custom hook to use the Document QA context.
export const useDocumentContext = () => useContext(DocumentQAContext)

export default DocumentQAProvider
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input'
import { RiSendPlane2Fill } from '@remixicon/react'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import useQA from './hooks/useQA';
import { useDocumentContext } from './context/DocumentQAProvider';

const QuestionInput = () => {
  const { fileUploadId: documentId, addNewMessage } = useDocumentContext();
  const [question, setQuestion] = useState<string | null>(null);
  const { loading, answer } = useQA(question, documentId)

  // Handling form submission
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData) as { question: string };
    const { question: message } = values;
    setQuestion(message);
    if (addNewMessage) {
      addNewMessage({ role: 'USER', message });
      form.reset();
    }
  }, [addNewMessage]);

  useEffect(() => {
    if (answer && addNewMessage) {
      addNewMessage({ role: 'SYSTEM', message: answer })
    }
  }, [answer])

  return (
    <form onSubmit={handleSubmit}>
      <Input
        disabled={loading}
        name="question"
        id="questionInput"
        type="text"
        size='lg'
        placeholder="Send a message..."
        labelPlacement="outside"
        endContent={
          <Button type='submit' isIconOnly variant='light'><RiSendPlane2Fill /></Button>
        }
      />
    </form>
  )
}

export default QuestionInput;
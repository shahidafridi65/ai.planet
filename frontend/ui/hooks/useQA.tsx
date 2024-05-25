import { useEffect, useState } from 'react'
import AIServices from '../services/AIServices';

const useQA = (question: string | null, documentId: number) => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (question) {
      setLoading(true);
      const processQuestion = async () => {
        // Call the processQuestion function from the AIServices to get the answer.
        const questionResponse = await AIServices.processQuestion(question, documentId);
        setLoading(false);
        setAnswer(questionResponse || null);
      }
      processQuestion(); 
    } else {
      setLoading(false); 
    }
  }, [question]) 

  return { answer, loading }; 
}

export default useQA
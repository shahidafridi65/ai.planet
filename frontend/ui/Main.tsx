import React, { useEffect } from 'react'
import { useDocumentContext } from './context/DocumentQAProvider'
import FileUploadMessage from './FileUploadMessage';


export default function Main() {
  const { fileUploadId, messages = [] } = useDocumentContext();

  useEffect(() => {
    document?.getElementById("scrollView")?.scrollIntoView();
  }, [messages]);

  return (
    <div className="flex-1 h-full relative w-full overflow-hidden">
      <div className='h-full overflow-hidden overflow-y-auto flex flex-col gap-4 p-4 md:p-8 container'>
        {messages.map((message, idx) => <div
          key={idx}
          className={`bg-slate-300 p-4 max-w-[80%] rounded-xl ${message.role === "SYSTEM" ? 'text-left mr-auto' : 'text-right ml-auto'}`}
        >
          {message.message}
        </div>)}
        <div id="scrollView" />
        {!fileUploadId && <FileUploadMessage />}
      </div>

      <div  className='absolute h-12 w-full bg-gradient-to-t from-white to-transparent bottom-0 right-0' />
    </div>
  )
}
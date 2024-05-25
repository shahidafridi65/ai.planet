import { Input } from '@nextui-org/input'
import { RiSendPlane2Fill } from "@remixicon/react";
import React from 'react'
import { useDocumentContext } from './context/DocumentQAProvider';
import QuestionInput from './QuestionInput';


export default function Footer() {
  const { fileUploadId } = useDocumentContext();
  // if (!fileUploadId) return null;

  return (
    <footer className="p-4 md:px-8 pt-0" >
      <QuestionInput />
    </footer>
  )
}
import React from 'react'
import PDFUploader from './PDFUploader'
import { Button } from '@nextui-org/button'
import { RiAddCircleLine } from '@remixicon/react'

const FileUploadMessage = () => {
  return (
    <div className='flex items-center justify-center w-[50vw] min-h-[30vh] bg-slate-100 border mx-auto my-6 p-6 border-dashed border-3'>
      <Button
        as="label"
        htmlFor='uploadFile'
        variant='bordered'
        className='px-2 md:px-8'
        startContent={<RiAddCircleLine size="20" />}
      >
        <span>Upload PDF</span>
      </Button >
    </div>
  )
}

export default FileUploadMessage
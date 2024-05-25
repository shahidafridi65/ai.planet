import { Button } from '@nextui-org/button'
import { RiAddCircleLine, RiFile2Line, RiFile3Line } from '@remixicon/react'
import React from 'react'
import { useDocumentContext } from './context/DocumentQAProvider'

const PDFUploader = () => {
	const { file, onFileUpload } = useDocumentContext()
	return (
		<div className='flex gap-2'>
			{file && <div className='text-green-400 flex items-center gap-1 text-sm'>
				<RiFile3Line size="20" />
				{file?.name}
			</div>}
			<Button
				as="label"
				htmlFor='uploadFile'
				variant='bordered'
				className='px-2 md:px-8'
				startContent={<RiAddCircleLine size="20" />}
			>
				<span className='hidden md:inline'>Upload PDF</span>
			</Button >
			<input
				type="file"
				id="uploadFile"
				name="uploadFile"
				className='hidden'
				accept='application/pdf'
				onChange={onFileUpload}
			/>
		</div >
	)
}

export default PDFUploader
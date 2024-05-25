import { Button } from '@nextui-org/button'
import { RiAddCircleLine, RiAddLine } from "@remixicon/react";
import React from 'react'
import PDFUploader from './PDFUploader';
import AiPlanetLogo from './AiPlanetLogo';

export default function Header() {
	return (
		<header className="p-4 flex justify-between items-center shadow">
			<AiPlanetLogo />
			<PDFUploader />
		</header>
	)
}
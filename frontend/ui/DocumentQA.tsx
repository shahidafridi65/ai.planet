'use client';

// Importing necessary modules and components
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main';
import DocumentQAProvider from './context/DocumentQAProvider';

// Main component for DocumentQA application
const DocumentQA = () => {
	// Rendering the DocumentQA application structure
	return (
		<DocumentQAProvider>
			<main className="flex flex-col h-full">
				<Header /> {/* Header component */}
				<Main />   {/* Main content component */}
				<Footer /> {/* Footer component */}
			</main>
		</DocumentQAProvider>
	)
}

export default DocumentQA
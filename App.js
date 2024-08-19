import './App.css';
import React, { useEffect, useState } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
import requestNotificationPermission from './requestPushNotification';

function App() {
	const [fileName, setFileName] = useState('');
	const [fileType, setFileType] = useState('');
	const [fileContent, setFileContent] = useState();

	useEffect(() => {
		requestNotificationPermission();
	}, []);

	const pushCopyNotification = () => {
		new Notification('Data copied', { body:"File data copied to clipboard", icon: '../public/favicon.ico'})
	}

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
			let type = file.type.split('/')[file.type.split('/').length - 1];
			if (type.includes("x-")) {
				type = type.split('x-')[type.split('x-').length - 1]
			}
			console.info(type)
			setFileType(type ?? type);
			setFileName(file.name);
			const reader = new FileReader();
			reader.onload = (e) => {
				setFileContent(e.target.result);
			};
			reader.readAsText(file);
		}
	};

	return (
		<main className='container m-auto p-3'>
			<h1 className='text-3xl font-bold font-sans text-center'>File Reader</h1>
			<div className='flex justify-center my-2'><input className='file:px-3 file:py-1 file:bg-blue-300 file:rounded-lg file:border-blue-400 file:border-solid file:mr-3 hover:file:bg-blue-400 transition-all border-2 border-gray-400 rounded-md p-5 border-dashed w-full md:w-3/4 lg:w-1/2' type="file" onChange={handleFileChange} /></div>
			{(fileName && fileContent) && <div>
				<CopyBlock onCopy={pushCopyNotification} text={fileContent} codeBlock={true} language={fileType} showLineNumbers={true} theme={dracula} />
			</div>}
		</main>
	);
}

export default App;

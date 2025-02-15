import { useRef, useState } from "react";

export function useUploadFile() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFile(event.target.files[0]);
		}
	};

	const handleFileUpload = () => {
		console.log(file);
	};

	return {
		fileInputRef,
		file,
		handleButtonClick,
		handleFileChange,
		handleFileUpload,
	};
}

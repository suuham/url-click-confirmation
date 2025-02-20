import { downloadFileAtom } from "@/stores";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useDownloadFile() {
	const navigate = useNavigate();
	const [downloadFile, setDownloadFile] = useAtom(downloadFileAtom);

	useEffect(() => {
		if (!downloadFile) {
			navigate("/");
		}
	}, [downloadFile, navigate]);

	const onClickDownload = () => {
		if (!downloadFile) return;

		const urlBlob = window.URL.createObjectURL(downloadFile);
		const link = document.createElement("a");
		link.href = urlBlob;
		link.download = "scraping_file";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(urlBlob);

		setDownloadFile(null);
	};

	return {
		onClickDownload,
	};
}

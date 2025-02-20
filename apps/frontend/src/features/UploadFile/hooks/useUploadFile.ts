import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAtom, useSetAtom } from "jotai";
import { downloadFileAtom, uploadedFileAtom } from "@/stores";

import {
	convertCsvToJson,
	convertJsonToCsv,
} from "../functions/accessJudgmentCsv";
import { readCsvFile } from "@/utils/readFile";
import { isValidCsvFormat } from "../functions/isValidCsvFormat";
import { postAccessJudgmentUrl } from "../api/postAccessJudgmentUrl";
import { useNavigate } from "react-router";

export function useUploadFile() {
	const navigate = useNavigate();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [uploadFile, setUploadFile] = useAtom(uploadedFileAtom);
	const setDownloadFile = useSetAtom(downloadFileAtom);

	const handleButtonClick = async () => {
		fileInputRef.current?.click();
	};

	const handleFileUpload = async () => {
		try {
			setIsLoading(true);

			if (!uploadFile) {
				setError("ファイルを選択してください");
				return;
			}

			const _uploadCsv = await readCsvFile(uploadFile);
			if (!isValidCsvFormat(_uploadCsv)) {
				setError("CSVファイルの形式が正しくありません");
				return;
			}

			const request = convertCsvToJson(_uploadCsv);
			const response = await postAccessJudgmentUrl(
				request.createAccessJudgmentUrlsRequest,
			);

			setDownloadFile(
				new File([convertJsonToCsv(response)], "download.csv", {
					type: "text/csv",
				}),
			);

			navigate("/complete");
		} catch (err) {
			setError("エラーが発生しました");
		} finally {
			setIsLoading(false);
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { "text/csv": [".csv"] },
		onDrop: async (acceptedFiles, fileRejections) => {
			if (fileRejections.length > 0) {
				setError("CSVファイルのみアップロードできます");
				return;
			}

			if (acceptedFiles.length > 0) {
				setUploadFile(acceptedFiles[0]);
				setError(null);
			}
		},
		onDragEnter: () => setError(null),
	});

	return {
		fileInputRef,
		error,
		isDragActive,
		isLoading,
		handleButtonClick,
		handleFileUpload,
		getRootProps,
		getInputProps,
	};
}

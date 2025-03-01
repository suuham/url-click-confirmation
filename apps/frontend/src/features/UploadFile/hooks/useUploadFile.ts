import { downloadFileAtom, uploadedFileAtom } from "@/stores";
import { useAtom, useSetAtom } from "jotai";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

import { readCsvFile } from "@/utils/readFile";
import { useNavigate } from "react-router";
import { CreateAccessJudgmentUrlError } from "../api/errors";
import { postAccessJudgmentUrl } from "../api/postAccessJudgmentUrl";
import {
	convertCsvToJson,
	convertJsonToCsv,
} from "../functions/accessJudgmentCsv";
import { isValidCsvFormat } from "../functions/isValidCsvFormat";

export function useUploadFile() {
	const navigate = useNavigate();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [uploadFile, setUploadFile] = useAtom(uploadedFileAtom);
	const setDownloadFile = useSetAtom(downloadFileAtom);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileUpload = async () => {
		try {
			setIsLoading(true);

			if (!uploadFile) return setError("ファイルを選択してください");
			if (uploadFile.size > 1 * 1024 * 1024)
				return setError("ファイルサイズが1MBを超えています");

			const _uploadCsv = await readCsvFile(uploadFile);
			if (!isValidCsvFormat(_uploadCsv)) {
				return setError(
					"ファイルの形式が正しくないか、文字化けが発生している可能性があります。UTF-8形式のCSVファイルを使用してください。",
				);
			}

			const response = await postAccessJudgmentUrl(
				convertCsvToJson(_uploadCsv).createAccessJudgmentUrlsRequest,
			);

			setDownloadFile(
				new File([convertJsonToCsv(response)], "download.csv", {
					type: "text/csv",
				}),
			);
			navigate("/complete");
		} catch (err) {
			setError(
				err instanceof CreateAccessJudgmentUrlError
					? err.message
					: "予期せぬエラーが発生しました。",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { "text/csv": [".csv"] },
		onDrop: (acceptedFiles, fileRejections) => {
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

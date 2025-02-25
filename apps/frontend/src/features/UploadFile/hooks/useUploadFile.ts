import { downloadFileAtom, uploadedFileAtom } from "@/stores";
import { useAtom, useSetAtom } from "jotai";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

import { readCsvFile } from "@/utils/readFile";
import { useNavigate } from "react-router";
import { PostSalesFileError } from "../api/errors";
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

			if (!uploadFile) {
				setError("ファイルを選択してください");
				return;
			}
			if (uploadFile.size > 20 * 1024 * 1024) {
				setError("ファイルサイズが20MBを超えています");
				return;
			}

			const _uploadCsv = await readCsvFile(uploadFile);
			if (!isValidCsvFormat(_uploadCsv)) {
				setError("CSVファイルの形式が正しくありません");
				return;
			}
			if (!_uploadCsv.startsWith("company_name,base_url")) {
				setError(
					"ファイルの形式が正しくないか、文字化けが発生している可能性があります。UTF-8形式のCSVファイルを使用してください。",
				);
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
			if (err instanceof PostSalesFileError) {
				switch (err.type) {
					case "BadRequest":
						setError(
							"CSVのフォーマットが不正です。サンプルCSVを確認してください",
						);
						break;
					case "InternalServerError":
						setError(
							"サーバーでエラーが発生しました。時間をおいて再度お試しください",
						);
						break;
					case "FetchApiError":
						setError(
							"通信エラーが発生しました。インターネット接続を確認してください",
						);
						break;
					default:
						setError(
							"予期せぬエラーが発生しました。時間をおいて再度お試しください",
						);
				}
			} else {
				setError(
					"予期せぬエラーが発生しました。時間をおいて再度お試しください",
				);
			}
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

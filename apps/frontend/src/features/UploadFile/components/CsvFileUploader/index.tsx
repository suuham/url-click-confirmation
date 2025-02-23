import { Button } from "@/components/Button";
import { uploadedFileAtom } from "@/stores";
import { useAtomValue } from "jotai";
import type { RefObject } from "react";
import { UploadedFileSummary } from "../UploadedFileSummary";
import styles from "./index.module.scss";

type Props = {
	fileInputRef: RefObject<HTMLInputElement | null>;
	error: string | null;
	isDragActive: boolean;
	handleButtonClick: () => void;
	getRootProps: () => Record<string, unknown>;
	getInputProps: () => Record<string, unknown>;
};

export function CsvFileUploader({
	fileInputRef,
	error,
	isDragActive,
	handleButtonClick,
	getRootProps,
	getInputProps,
}: Props) {
	const uploadFile = useAtomValue(uploadedFileAtom);

	return (
		<div className={styles["uploader-block"]} {...getRootProps()}>
			<input
				{...getInputProps()}
				ref={fileInputRef}
				style={{ display: "none" }}
			/>
			<div>
				<h2>CSVをドラッグ&ドロップ</h2>
			</div>
			<div className={styles["button-block"]}>
				{isDragActive ? (
					<p className={styles["drop-text"]}>ここにドロップしてください</p>
				) : (
					<>
						<Button
							text="ファイルを選択"
							size="lg"
							isOutline={true}
							onClick={handleButtonClick}
						/>
					</>
				)}
				{error && <p className={styles["error-text"]}>{error}</p>}
			</div>
			{uploadFile && (
				<div>
					<UploadedFileSummary name={uploadFile.name} size={uploadFile.size} />
				</div>
			)}
		</div>
	);
}

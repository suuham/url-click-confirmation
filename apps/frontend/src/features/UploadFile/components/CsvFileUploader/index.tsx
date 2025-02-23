import { Button } from "@/components/Button";
import { UploadedFileSummary } from "../UploadedFileSummary";
import styles from "./index.module.scss";
import { useAtomValue } from "jotai";
import { uploadedFileAtom } from "@/stores";

type Props = {
	fileInputRef: React.RefObject<HTMLInputElement | null>;
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
							isOutline
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

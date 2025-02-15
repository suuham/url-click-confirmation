import { Button } from "@/components/Button";
import styles from "./index.module.scss";
import { useUploadFile } from "../../hooks/useUploadFile";

export function CsvFileUploader() {
	const { fileInputRef, handleButtonClick, handleFileChange } = useUploadFile();

	return (
		<div className={styles["uploader-block"]}>
			<div>
				<h2>CSVをドラック&ドロップ</h2>
			</div>
			<div>
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					style={{ display: "none" }}
				/>
				<Button
					text="ファイルを選択"
					size="lg"
					isOutline
					onClick={handleButtonClick}
				/>
			</div>
		</div>
	);
}

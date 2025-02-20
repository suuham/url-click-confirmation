import { useUploadFile } from "../hooks/useUploadFile";
import { CreateButton } from "./CreateButton";
import { CsvFileUploader } from "./CsvFileUploader";
import styles from "./index.module.scss";

export function UploadFile() {
	const {
		fileInputRef,
		error,
		isDragActive,
		isLoading,
		handleButtonClick,
		handleFileUpload,
		getRootProps,
		getInputProps,
	} = useUploadFile();

	return (
		<>
			<div className={styles["upload-file-block"]}>
				<div className={styles["upload-element"]}>
					<CsvFileUploader
						fileInputRef={fileInputRef}
						error={error}
						isDragActive={isDragActive}
						handleButtonClick={handleButtonClick}
						getRootProps={getRootProps}
						getInputProps={getInputProps}
					/>
				</div>
				<div>
					<CreateButton isLoading={isLoading} onClick={handleFileUpload} />
				</div>
			</div>
		</>
	);
}

import { Button } from "@/components/Button";
import colorStyles from "@/styles/colors.module.scss";
import { useDownloadFile } from "../../hooks/useDownloadFile";

export function DownloadSampleCsvButton() {
	const { handleDownloadSampleCSV } = useDownloadFile();
	return (
		<Button
			text="サンプルをダウンロード"
			backgroundColor={colorStyles.buttonColorGray}
			size="sm"
			isOutline
			onClick={handleDownloadSampleCSV}
		/>
	);
}

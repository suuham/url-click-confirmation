import { Button } from "@/components/Button";
import colorStyles from "@/styles/colors.module.scss";
import { useDownloadFile } from "../../hooks/useDownloadFile";

export function DownloadSampleCsvButton() {
	const { handleDownloadSampleCsv } = useDownloadFile();
	return (
		<Button
			text="サンプルダウンロード"
			backgroundColor={colorStyles.buttonColorGray}
			size="sm"
			isOutline={true}
			onClick={handleDownloadSampleCsv}
		/>
	);
}

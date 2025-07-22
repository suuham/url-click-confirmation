import { Button } from "@/components/Button";
import colorStyles from "@/styles/colors.module.scss";

export function DownloadSampleCsvButton() {
	// https://docs.google.com/spreadsheets/d/1znfUV2OKH_SAWsrojXSXpJVQGL4_acPo6dCuiXsKRcc/edit?usp=sharing　に飛ばす
	const handleOpenSampleCsv = () => {
		window.open(
			"https://docs.google.com/spreadsheets/d/1znfUV2OKH_SAWsrojXSXpJVQGL4_acPo6dCuiXsKRcc/edit?usp=sharing",
			"_blank",
		);
	};
	return (
		<Button
			text="サンプルCSVを開く"
			backgroundColor={colorStyles.buttonColorGray}
			size="sm"
			isOutline={true}
			onClick={handleOpenSampleCsv}
		/>
	);
}

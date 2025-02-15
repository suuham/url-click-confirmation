import { Button } from "@/components/Button";
import colorStyles from "@/styles/colors.module.scss";
import { useUploadFile } from "../../hooks/useUploadFile";

export function CreateButton() {
	const { handleFileUpload } = useUploadFile();

	return (
		<Button
			text="作成開始"
			backgroundColor={colorStyles.buttonColorOrange}
			size="xl"
			onClick={handleFileUpload}
		/>
	);
}

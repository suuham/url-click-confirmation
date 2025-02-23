import { Button } from "@/components/Button";
import colorStyles from "@/styles/colors.module.scss";

type Props = {
	isLoading: boolean;
	onClick: () => void;
};

export function CreateButton({ isLoading, onClick }: Props) {
	return (
		<Button
			text="作成開始"
			backgroundColor={colorStyles.buttonColorOrange}
			size="xl"
			isDisable={isLoading}
			onClick={onClick}
		/>
	);
}

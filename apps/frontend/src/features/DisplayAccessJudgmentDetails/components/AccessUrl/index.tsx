import { Toast } from "@/components/Toast";
import LinkCopyIcon from "../../assets/link.svg";
import { useUrl } from "../../hooks/useUrl";
import styles from "./index.module.scss";

type Props = {
	url: string;
};

export function AccessUrl({ url }: Props) {
	const { showToast, setShowToast, copyToClipboard } = useUrl();
	const truncatedUrl = url.length > 20 ? `${url.slice(0, 20)}...` : url;

	return (
		<div className={styles["access-url"]} title={url}>
			<div>
				<button
					type="button"
					onClick={() => copyToClipboard(url)}
					className={styles["copy-button"]}
				>
					<img src={LinkCopyIcon} alt="Copy URL" />
				</button>
				{showToast && (
					<Toast
						message="リンクをコピーしました"
						onClose={() => setShowToast(false)}
					/>
				)}
			</div>
			<div>
				<a href={url} target="_blank" rel="noopener noreferrer">
					{truncatedUrl}
				</a>
			</div>
		</div>
	);
}

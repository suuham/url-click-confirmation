import { Toast } from "@/components/Toast";
import { useState } from "react";
import LinkCopyIcon from "../../assets/link.svg";
import styles from "./index.module.scss";

type Props = {
	url: string;
};

export function AccessUrl({ url }: Props) {
	const [_copied, setCopied] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const truncatedUrl = url.length > 20 ? `${url.slice(0, 20)}...` : url;

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(url);
		setCopied(true);
		setShowToast(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className={styles["access-url"]} title={url}>
			<div>
				<button
					type="button"
					onClick={copyToClipboard}
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

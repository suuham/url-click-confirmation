import { useState } from "react";

export function useUrl() {
	const [showToast, setShowToast] = useState(false);

	const getSanitizedUrl = (url: string) => {
		try {
			const urlObj = new URL(url);
			urlObj.searchParams.delete("isDemo");
			return urlObj.toString();
		} catch {
			return url;
		}
	};

	const copyToClipboard = async (url: string) => {
		const sanitizedUrl = getSanitizedUrl(url);
		await navigator.clipboard.writeText(sanitizedUrl);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 2000);
	};

	return {
		showToast,
		getSanitizedUrl,
		setShowToast,
		copyToClipboard,
	};
}

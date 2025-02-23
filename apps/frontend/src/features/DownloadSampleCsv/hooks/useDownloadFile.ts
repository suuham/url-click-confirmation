import { generateCsv } from "../functions/generateSampleCsv";

export function useDownloadFile() {
	const handleDownloadSampleCsv = () => {
		generateCsv();
	};

	return {
		handleDownloadSampleCsv,
	};
}

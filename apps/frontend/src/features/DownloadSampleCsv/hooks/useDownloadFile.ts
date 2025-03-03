import { generateSampleCsv } from "../functions/generateSampleCsv";

export function useDownloadFile() {
	const handleDownloadSampleCsv = () => {
		generateSampleCsv();
	};

	return {
		handleDownloadSampleCsv,
	};
}

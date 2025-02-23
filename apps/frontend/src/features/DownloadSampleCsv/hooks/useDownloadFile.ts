import { generateCSV } from "../functions/generateSampleCsv";

export function useDownloadFile() {
	const handleDownloadSampleCSV = () => {
		generateCSV();
	};

	return {
		handleDownloadSampleCSV,
	};
}

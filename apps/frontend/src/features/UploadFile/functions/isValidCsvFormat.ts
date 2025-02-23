export function isValidCsvFormat(csv: string): boolean {
	const lines = csv.trim().split("\n");

	if (lines[0].trim() !== "company_name,base_url") {
		return false;
	}

	const dataLines = lines.slice(1);
	for (const line of dataLines) {
		const parts = line.split(",");
		if (parts.length !== 2 || parts.some((part) => part.trim() === "")) {
			return false;
		}
	}

	return true;
}

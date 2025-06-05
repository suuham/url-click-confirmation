export const escapeCsvValue = (
	value: string | number | null | undefined,
): string => {
	if (value === null || value === undefined) return "";
	const stringValue = String(value).trim();

	const normalizedValue = stringValue.replace(/\n/g, " ");
	if (
		normalizedValue.includes(",") ||
		normalizedValue.includes('"') ||
		normalizedValue.includes(" ")
	) {
		return `"${normalizedValue.replace(/"/g, '""')}"`;
	}

	return normalizedValue;
};

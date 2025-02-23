export function generateSampleCsv() {
	const header = ["company_name", "base_url"];
	const rows = [
		["Google", "https://super-hamster.com/#about"],
		["Facebook", "https://super-hamster.com/#service"],
		["Twitter", "https://super-hamster.com/#member"],
	];

	const csvContent = [
		header.join(","),
		...rows.map((row) => row.join(",")),
	].join("\n");

	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.href = url;
	link.download = "sample.csv";
	link.click();
	URL.revokeObjectURL(url);
}

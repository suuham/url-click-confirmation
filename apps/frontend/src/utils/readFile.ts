export function readCsvFile(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (event) => {
			if (event.target?.result) {
				resolve(event.target.result as string);
			} else {
				reject(new Error("ファイルの読み込みに失敗しました"));
			}
		};

		reader.onerror = () => {
			reject(new Error("ファイルの読み取り中にエラーが発生しました"));
		};

		reader.readAsText(file, "utf-8");
	});
}

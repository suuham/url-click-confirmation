export const stringToIntWithDefault =
	(defaultValue: number) => (val: string | undefined) => {
		if (!val) return defaultValue;
		const parsed = Number.parseInt(val, 10);
		return Number.isNaN(parsed) ? defaultValue : parsed;
	};

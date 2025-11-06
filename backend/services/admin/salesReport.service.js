export const computeDateRange = (range, start, end) => {
	let startDate, endDate;
	const now = new Date();

	switch (range) {
		case "today":
			startDate = new Date(now.setHours(0, 0, 0, 0));
			endDate = new Date();
			break;

		case "last7days":
			startDate = new Date();
			startDate.setDate(startDate.getDate() - 7);
			startDate.setHours(0, 0, 0, 0);
			endDate = new Date();
			break;

		case "last30days":
			startDate = new Date();
			startDate.setDate(startDate.getDate() - 30);
			startDate.setHours(0, 0, 0, 0);
			endDate = new Date();
			break;

		case "thismonth": {
			const year = now.getFullYear();
			const month = now.getMonth(); // current month
			startDate = new Date(year, month, 1);
			endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);
			break;
		}

		case "lastmonth": {
			const year = now.getFullYear();
			const month = now.getMonth() - 1; // previous month
			startDate = new Date(year, month, 1);
			endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);
			break;
		}

		case "custom":
			if (!start || !end ) {
				throw new Error("Start and end dates are required for custom range");
			}
			startDate = new Date(start);
			startDate.setHours(0, 0, 0, 0);
			endDate = new Date(end);
			endDate.setHours(23, 59, 59, 999);
			break;

		default:
			// fallback to last 7 days if range not provided
			startDate = new Date();
			startDate.setDate(startDate.getDate() - 7);
			startDate.setHours(0, 0, 0, 0);
			endDate = new Date();
			break;
	}

	return { startDate, endDate };
};

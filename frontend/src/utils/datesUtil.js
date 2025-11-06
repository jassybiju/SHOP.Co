export const calculateDateRange = (rangeName) => {
	const today = new Date();
	const startDate = new Date(today);
	const formatDate = (date) => date.toISOString().split("T")[0];

	// Set end date to today (or end of today)
	const endDate = new Date(today);

	switch (rangeName) {
		case "Today":
			startDate.setHours(0, 0, 0, 0);
			endDate.setHours(23, 59, 59, 999);
			break;
		case "Last Week":

			startDate.setDate(today.getDate() - 7);
			break;
		case "Last Month":

			startDate.setDate(today.getDate() - 30);
			break;
		case "Last Year":

			startDate.setDate(today.getDate() - 365);
			break;
		case "Custom Range":
		default:
			return { start: null, end: null };
	}

	return {
		start: formatDate(startDate),
		end: formatDate(endDate),
	};
};

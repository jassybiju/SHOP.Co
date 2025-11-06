import { useState } from "react";

const DatePicker = ({ isOpen, initialDates, onApply, onClose }) => {

    // Internal state for the date picker inputs
	const [startDate, setStartDate] = useState(initialDates.start || "");
	const [endDate, setEndDate] = useState(initialDates.end || "");

	if (!isOpen) return null;
	const handleApply = () => {
		if (startDate && endDate) {
			onApply(startDate, endDate);
		} else {
			alert("Please select both start and end dates.");
		}
	};

	return (
		<div className="border border-gray-300 p-4 mt-2 bg-gray-50 rounded-lg shadow-md">
			<h5 className="mb-3 font-semibold text-gray-700">Select Custom Range</h5>
			<input
				type="date"
				value={startDate}
				onChange={(e) => setStartDate(e.target.value)}
				className="mr-3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
			/>
			<input
				type="date"
				value={endDate}
				onChange={(e) => setEndDate(e.target.value)}
				className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
			/>
			<div className="mt-4">
				<button type="button" onClick={handleApply} className="px-4 py-2 mr-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150">
					Apply Dates
				</button>
				<button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-150">
					Cancel
				</button>
			</div>
		</div>
	);
};
export default DatePicker;

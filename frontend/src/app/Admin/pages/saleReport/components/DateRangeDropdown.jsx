// src/pages/SalesReport/components/DateRangeDropdown.jsx
import React, { useState, useCallback, useEffect } from 'react';
import DatePicker from './DatePicker';
import { calculateDateRange } from '@/utils/datesUtil';

// Note: This component no longer depends on react-hook-form's setValue.
// It uses a generic setFilter prop.

const DateRangeDropdown = ({ dateRange, setFilter }) => {
  const rangeOptions = [
    'Today',
    'Last Week',
    'Last Month',
    'Last Year',
    'Custom Range'
  ];

  // Derive the selected option from the dateRange prop on mount/change
  // This is a simple approach; complex logic would be needed for perfect sync.
  const [selectedRangeOption, setSelectedRangeOption] = useState('Today');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Internal state to hold the custom dates when the date picker is active
  const [customDates, setCustomDates] = useState(dateRange || calculateDateRange('Today'));

  // Sync internal state when the parent state (dateRange) changes
  useEffect(() => {
    setCustomDates(dateRange);
    // Simple logic to set the dropdown text based on current dates (imperfect but functional)
    if (dateRange && dateRange.start && dateRange.end) {
        // If the dates match 'Today', set the text to 'Today'
        const todayDates = calculateDateRange('Today');
        if (dateRange.start === todayDates.start && dateRange.end === todayDates.end) {
            setSelectedRangeOption('Today');
        } else if (selectedRangeOption !== 'Custom Range' && !isDatePickerOpen) {
            // Default back to 'Custom Range' if dates are set but it's not a known preset
            setSelectedRangeOption('Custom Range');
        }
    }
  }, [dateRange, isDatePickerOpen, selectedRangeOption]);


  const handlePredefinedRangeChange = (event) => {
    const rangeName = event.target.value;
    setSelectedRangeOption(rangeName);

    if (rangeName === 'Custom Range') {
      setIsDatePickerOpen(true);
    } else {
      setIsDatePickerOpen(false);

      const newDates = calculateDateRange(rangeName);

      // Update the parent state directly
      setFilter(newDates);
    }
  };

  const handleApplyCustomRange = useCallback((startDate, endDate) => {
    const newCustomDates = { start: startDate, end: endDate };
    setCustomDates(newCustomDates);
    setIsDatePickerOpen(false);

    // Update the parent state directly
    setFilter(newCustomDates);

    setSelectedRangeOption('Custom Range');
  }, [setFilter]);

  const handleCloseDatePicker = useCallback(() => {
    setIsDatePickerOpen(false);
    // If user cancels and no custom dates were set, revert to 'Today'
    if (!customDates.start && !customDates.end) {
        setSelectedRangeOption('Today');
        setFilter(calculateDateRange('Today'));
    }
    // If custom dates were set, keep the state as is.
  }, [customDates, setFilter]);

  return (
    <div className="flex flex-col">
      <label htmlFor="date-range-select" className="sr-only">Select Date Range</label>
      <select
        id="date-range-select"
        value={selectedRangeOption}
        onChange={handlePredefinedRangeChange}
        className="p-3 border border-gray-300 rounded-lg min-w-[200px] shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-lg font-medium"
      >
        {rangeOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <DatePicker
        isOpen={isDatePickerOpen}
        initialDates={customDates}
        onApply={handleApplyCustomRange}
        onClose={handleCloseDatePicker}
      />
    </div>
  );
};

export default DateRangeDropdown;
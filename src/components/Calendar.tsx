// src/components/Calendar.tsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
}

const Calendar: React.FC<CalendarProps> = ({ startDate, endDate, onChange }) => {
  return (
    <div className="calendar-container">
      <DatePicker
        selected={startDate || undefined} // Ensure the type matches Date | undefined
        onChange={onChange}
        startDate={startDate || undefined} // Convert null to undefined for compatibility
        endDate={endDate || undefined} // Convert null to undefined for compatibility
        selectsRange
        inline
        minDate={new Date()} // Prevent booking in the past
        className="rounded-lg p-2 border border-gray-300"
      />
    </div>
  );
};

export default Calendar;

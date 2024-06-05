import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'; // Corrected import
import "./DateSelector.css";

const DateSelector = ({ dateFilter, setDateFilter }) => {
    const [displayDate, setDisplayDate] = useState('__, __');

    const handleChange = (date) => {
        if (date) {
            const isoDate = date.toISOString();
            const formattedDate = format(date, 'MMM, dd');
            setDisplayDate(formattedDate);
            setDateFilter({ ...dateFilter, date: isoDate });
            console.log(isoDate);
        } else {
            setDateFilter({ ...dateFilter, date: "" });
            setDisplayDate('__, __');
        }
    };

    return (
        <div className="form-group">
            <DatePicker
                selected={dateFilter.date ? new Date(dateFilter.date) : null}
                onChange={handleChange}
                dateFormat="MMMM d, yyyy"
                isClearable={true}
                customInput={
                    <button className='mainDiv'>
                        <FontAwesomeIcon icon={faCalendar} style={{ color: "#B3B1F8", padding: '0px 10px 0px 3px', height: '18px' }} />
                        <p style={{"marginTop": "3px"}}>{displayDate}</p>
                    </button>
                }
            />
        </div>
    );
};

export default DateSelector;

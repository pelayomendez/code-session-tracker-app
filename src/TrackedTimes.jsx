import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

import TrackedTimesList from './TrackedTimesList';

const TrackedTimes = ({ trackedTimes, onDelete, onSave, selectedDate, onDateChange }) => {

  const handleDateChange = (date) => {
    onDateChange(date);
  };

  return (
    <div>
      <h2>Date:</h2>
      <DatePicker
        defaultValue={selectedDate}
        onChange={handleDateChange}
      />
      <TrackedTimesList
        trackedTimes={trackedTimes.filter((time) =>
          moment(time.startTime).isSame(selectedDate, 'day')
        )}
        onDelete={onDelete}
        onSave={onSave}
      />
    </div>
  );
};

export default TrackedTimes;

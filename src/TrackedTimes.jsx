import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

import TrackedTimesList from './TrackedTimesList';

const TrackedTimes = ({ trackedTimes, onDelete, onSave }) => {
  const [selectedDate, setSelectedDate] = useState(moment());

  return (
    <div>
      <h2>Date:</h2>
      <DatePicker
        defaultValue={selectedDate}
        onChange={(date) => setSelectedDate(date)}
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

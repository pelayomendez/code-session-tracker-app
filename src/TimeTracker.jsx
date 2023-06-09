// TimeTracker.js

import React, { useState, useEffect } from 'react';
import { Button, AutoComplete, Input } from 'antd';
import moment from 'moment';
import { useDatabase } from './DatabaseContext';

import TrackedTimes from './TrackedTimes';
import Footer from './Footer';

const TimeTracker = () => {
  const { trackedTimes, addTrackedTime, deleteTrackedTime, updateTrackedTime } = useDatabase();
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [previousDescriptions, setPreviousDescriptions] = useState([]);

  useEffect(() => {
    // Extract unique descriptions from trackedTimes
    const descriptions = [...new Set(trackedTimes.map((time) => time.description))];
    setPreviousDescriptions(descriptions);
  }, [trackedTimes]);


  useEffect(() => {
    let timer;
    if (startTime) {
      timer = setInterval(() => {
        const currentTime = new Date();
        const elapsed = currentTime - startTime;
        setElapsedTime(elapsed);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [startTime]);

  const startTracking = () => {
    setStartTime(new Date());
    setElapsedTime(0);
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((duration / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((duration / 1000) % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const stopTracking = () => {
    if (startTime) {
      const endTime = new Date();
      const duration = endTime - startTime;

      const newTime = {
        description,
        startTime,
        endTime,
        duration,
      };

      addTrackedTime(newTime);
      setDescription('');
      setStartTime(null);
      setElapsedTime(0);
    }
  };

  const cancelTracking = () => {
    setStartTime(null);
    setElapsedTime(0);
  };

  const handleSave = (editedRecord) => {
    const { startTime, endTime } = editedRecord;
    const duration = moment(endTime).diff(moment(startTime));
    editedRecord.duration = duration;

    updateTrackedTime(editedRecord);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };


  return (
    <div style={{ margin: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
      <AutoComplete
          placeholder="Select or enter descriptions"
          value={description}
          onChange={(value) => setDescription(value)}
          onSelect={(value) => setDescription(value)}
          style={{ width: 400 }}
          options={trackedTimes.map((time) => ({
            value: time.description,
          }))}
          allowClear
          disabled={startTime !== null}
        >
          <Input.Search />
        </AutoComplete>
      </div>

      <div>
        {startTime ? (
          <>
            <p>Elapsed Time: {formatDuration(elapsedTime)}</p>
            <Button type="primary" danger onClick={stopTracking}>
              Stop Tracking
            </Button>
            <Button onClick={cancelTracking}>Cancel Tracking</Button>
          </>
        ) : (
          <Button type="primary" onClick={startTracking}>
            Start Tracking
          </Button>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <TrackedTimes trackedTimes={trackedTimes} onDelete={deleteTrackedTime} onSave={handleSave} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Footer />
      </div>
    </div>
  );
};

export default TimeTracker;

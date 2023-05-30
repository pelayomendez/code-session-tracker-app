import React, { useState, useEffect } from 'react';
import Loki from 'lokijs';
import { Button, Input } from 'antd';
import moment from 'moment';

import TrackedTimes from './TrackedTimes';
import Footer from './Footer';

const db = new Loki('timeTrackerDB');


const TimeTracker = () => {
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [trackedTimes, setTrackedTimes] = useState([]);

  useEffect(() => {
    // Load tracked times from Lokidb or local storage when the component mounts
    const loadData = async () => {
      const collection = db.getCollection('times') || db.addCollection('times');
  
      // Check if there is data in local storage
      const storedTimes = localStorage.getItem('trackedTimes');
      if (storedTimes) {
        // If data exists, parse and set it as tracked times
        const parsedTimes = JSON.parse(storedTimes);
  
        parsedTimes.forEach((time) => {
          const existingTime = collection.findOne({startTime: time.startTime});
          if (existingTime) {
            // If the document already exists, update it
            collection.update({ ...existingTime, ...time });
          } else {
            // Otherwise, insert it
            const newTime = {
              description: time.description,
              startTime: time.startTime,
              endTime: time.endTime,
              duration: time.duration,
            };
            collection.insert(newTime);
          }
        });
  
        // Save the LokiDB database
        db.saveDatabase();
        const times = collection.find();
        setTrackedTimes(times);
      } else {
        // If no data in local storage, get the times from the LokiDB collection
        const times = collection.find();
        setTrackedTimes(times);
      }
    };
  
    loadData();
  }, []);
  


  useEffect(() => {
    // Save tracked times to local storage whenever it changes
    localStorage.setItem('trackedTimes', JSON.stringify(trackedTimes));
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

      // Save tracked time to Lokidb
      const collection = db.getCollection('times') || db.addCollection('times');
      collection.insert(newTime);
      db.saveDatabase();

      setTrackedTimes([...trackedTimes, newTime]);
      setDescription('');
      setStartTime(null);
      setElapsedTime(0);
    }
  };

  const cancelTracking = () => {
    setStartTime(null);
    setElapsedTime(0);
  };

  const handleDelete = (time) => {
    // Perform deletion logic here
    // In this example, we will remove the tracked time from the state and Lokidb
  
    // Remove the tracked time from the state
    const updatedTimes = trackedTimes.filter((t) => t !== time);
    setTrackedTimes(updatedTimes);
  
    // Remove the tracked time from Lokidb
    const collection = db.getCollection('times');
    collection.remove(time);
    db.saveDatabase();
  };

  const handleSave = (editedRecord) => {
    const { startTime, endTime } = editedRecord;
  
    // Recalculate the duration based on the updated start and end time
    const duration = moment(endTime).diff(moment(startTime));
    editedRecord.duration = duration;

    // Update the `trackedTimes` state with the modified record
    setTrackedTimes(trackedTimes.map(record => record["$loki"] === editedRecord["$loki"] ? editedRecord : record));


    // Update the record in the LokiJS database
    const collection = db.getCollection('times');
    collection.update(editedRecord);
    db.saveDatabase();
  }

  return (
    <div style={{ margin: '20px' }}>
      <h1>CodeSession Tracker</h1>

      <div style={{ marginBottom: '10px' }}>
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
        <TrackedTimes trackedTimes={trackedTimes} onDelete={handleDelete} onSave={handleSave} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Footer />
      </div>
    </div>
  );

};

export default TimeTracker;

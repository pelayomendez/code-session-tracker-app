// DatabaseContext.js

import React, { useState, useEffect, useContext } from 'react';
import Loki from 'lokijs';
import moment from 'moment';

const db = new Loki('timeTrackerDB');

const DatabaseContext = React.createContext();

const DatabaseProvider = ({ children }) => {
  const [trackedTimes, setTrackedTimes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const collection = db.getCollection('times') || db.addCollection('times');

      const storedTimes = localStorage.getItem('trackedTimes');
      if (storedTimes) {
        const parsedTimes = JSON.parse(storedTimes);

        parsedTimes.forEach((time) => {
          const existingTime = collection.findOne({ startTime: time.startTime });
          if (existingTime) {
            collection.update({ ...existingTime, ...time });
          } else {
            const newTime = {
              description: time.description,
              startTime: time.startTime,
              endTime: time.endTime,
              duration: time.duration,
            };
            collection.insert(newTime);
          }
        });

        db.saveDatabase();
        const times = collection.find();
        setTrackedTimes(times);
      } else {
        const times = collection.find();
        setTrackedTimes(times);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('trackedTimes', JSON.stringify(trackedTimes));
  }, [trackedTimes]);

  const addTrackedTime = (newTime) => {
    const collection = db.getCollection('times') || db.addCollection('times');
    collection.insert(newTime);
    db.saveDatabase();
    setTrackedTimes([...trackedTimes, newTime]);
  };

  const deleteTrackedTime = (time) => {
    const collection = db.getCollection('times');
    collection.remove(time);
    db.saveDatabase();
    setTrackedTimes(trackedTimes.filter((t) => t !== time));
  };

  const updateTrackedTime = (editedRecord) => {
    const { startTime, endTime } = editedRecord;
    const duration = moment(endTime).diff(moment(startTime));
    editedRecord.duration = duration;

    const collection = db.getCollection('times');
    collection.update(editedRecord);
    db.saveDatabase();
    setTrackedTimes(
      trackedTimes.map((record) => (record['$loki'] === editedRecord['$loki'] ? editedRecord : record))
    );
  };

  const contextValue = {
    trackedTimes,
    addTrackedTime,
    deleteTrackedTime,
    updateTrackedTime,
  };

  return <DatabaseContext.Provider value={contextValue}>{children}</DatabaseContext.Provider>;
};

const useDatabase = () => useContext(DatabaseContext);

export { DatabaseProvider, useDatabase };

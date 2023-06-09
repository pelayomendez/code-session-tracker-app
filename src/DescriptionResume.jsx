import React from 'react';
import { Table } from 'antd';
import { useDatabase } from './DatabaseContext';

const DescriptionResume = () => {
  const { trackedTimes } = useDatabase();

  // Group tasks by description and calculate total time for each description
  const groupedTasks = trackedTimes.reduce((groups, task) => {
    const { description, duration } = task;
    if (groups[description]) {
      groups[description].count += 1;
      groups[description].totalDuration += duration;
    } else {
      groups[description] = {
        description,
        count: 1,
        totalDuration: duration,
      };
    }
    return groups;
  }, {});

  // Convert grouped tasks object to an array
  const dataSource = Object.values(groupedTasks);

  // Define columns for the table
  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Task Count',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Total Time',
      dataIndex: 'totalDuration',
      key: 'totalDuration',
      render: (totalDuration) => {
        const hours = Math.floor(totalDuration / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((totalDuration / (1000 * 60)) % 60).toString().padStart(2, '0');
        const seconds = Math.floor((totalDuration / 1000) % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      },
    },
  ];

  return (
    <Table dataSource={dataSource} columns={columns} />
  );
};

export default DescriptionResume;

import React from 'react';
import { Table, Button } from 'antd';
import moment from 'moment';

const TrackedTimesList = ({ trackedTimes, onDelete }) => {
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((duration / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((duration / 1000) % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime) => moment(startTime).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (endTime) => moment(endTime).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration) => formatDuration(duration),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="danger" onClick={() => onDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Tracked Times:</h2>
      <Table
        dataSource={trackedTimes}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record.id}
      />
   </div>
  );
};

export default TrackedTimesList;

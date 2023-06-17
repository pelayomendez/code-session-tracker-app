import React, { useState } from 'react';
import { Table, Button, Input, DatePicker, TimePicker } from 'antd';
import moment from 'moment';

const TrackedTimesList = ({ trackedTimes, onSave, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedRecord, setEditedRecord] = useState({});

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((duration / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((duration / 1000) % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleEdit = (record) => {
    setEditingId(record["$loki"]);
    setEditedRecord({ ...record });
  };

  const handleSave = (record) => {
    onSave({ ...record, ...editedRecord });
    setEditingId(null);
    setEditedRecord({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedRecord({});
  };

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) =>
        editingId === record["$loki"] ? (
          <Input
            value={editedRecord.description}
            onChange={(e) => setEditedRecord({ ...editedRecord, description: e.target.value })}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text, record) =>
        editingId === record["$loki"] ? (
          <DatePicker
            showTime
            value={moment(editedRecord.startTime)}
            onChange={(date) => setEditedRecord({ ...editedRecord, startTime: date })}
          />
        ) : (
          moment(text).format('HH:mm:ss')
        ),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text, record) =>
        editingId === record["$loki"] ? (
          <DatePicker
            showTime
            value={moment(editedRecord.endTime)}
            onChange={(date) => setEditedRecord({ ...editedRecord, endTime: date })}
          />
        ) : (
          moment(text).format('HH:mm:ss')
        ),
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
      render: (_, record) =>
        editingId === record["$loki"] ? (
          <>
            <Button type="primary" onClick={() => handleSave(record)}>
              Save
            </Button>
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button type="primary" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button type="danger" onClick={() => onDelete(record)}>
              Delete
            </Button>
          </>
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

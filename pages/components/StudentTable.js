// components/StudentTable.js
import React from 'react';
import { Table, Button, Space } from 'antd';
import { useRouter } from 'next/router';

const StudentTable = ({ data, onEdit, onDelete }) => {
  const router = useRouter();

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button danger onClick={() => onDelete(record.id)}>Delete</Button>
          <Button type="primary" onClick={() => router.push(`/students/${record.id}`)}>
            View Detail
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="id" />;
};

export default StudentTable;

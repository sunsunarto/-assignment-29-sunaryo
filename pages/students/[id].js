// pages/students/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Spin, Button } from 'antd';

const StudentDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/students/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Status ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setStudent(data);
        })
        .catch((err) => {
          console.error('Fetch error:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <Spin style={{ margin: 50 }} />;
  if (!student) return <p>Student not found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <Card title={`Student Detail - ${student.name}`} bordered={false}>
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <Button onClick={() => router.push('/students')}>Back to List</Button>
      </Card>
    </div>
  );
};

export default StudentDetail;

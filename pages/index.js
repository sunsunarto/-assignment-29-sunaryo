'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Input, Button, Spin, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import StudentTable from './components/StudentTable';

// Point to your API
const STUDENTS_API = 'https://course.summitglobal.id/students';

const AdvancedCRUD = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  // Fetch students
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(STUDENTS_API);
      if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      notification.error({ message: 'Fetch Error', description: error.message });
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filtered list
  const filtered = useMemo(() => {
    return students.filter((s) =>
      s.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, students]);

  // Delete student
  const handleDelete = useCallback(async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${STUDENTS_API}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Delete failed with status ${res.status}`);
      notification.success({ message: 'Student deleted' });
      fetchData();
    } catch (error) {
      notification.error({ message: 'Delete Error', description: error.message });
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  // View detail
  const handleViewDetail = useCallback((id) => {
    router.push(`/students/${id}`);
  }, [router]);

  return (
    <Spin spinning={loading}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => notification.info({ message: 'Form removed', description: 'Add Student form is disabled' })}
        >
          Add Student
        </Button>
      </div>

      <StudentTable
        data={filtered}
        onEdit={() => notification.info({ message: 'Form removed', description: 'Edit Student form is disabled' })}
        onDelete={handleDelete}
        onViewDetail={handleViewDetail}
      />
    </Spin>
  );
};

export default AdvancedCRUD;

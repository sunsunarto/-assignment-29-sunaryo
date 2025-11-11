import { useState, useEffect, useCallback } from 'react';
import { notification } from 'antd';

const STUDENTS_API = '/api/students';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(STUDENTS_API, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      });

      if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Fetch error:', error);
      notification.error({
        message: 'Failed to fetch students',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const addOrUpdateStudent = async (student, isEdit = false) => {
    setLoading(true);
    try {
      const url = isEdit ? `${STUDENTS_API}/${student.id}` : STUDENTS_API;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name: student.name, age: student.age }),
      });

      if (!student.name || typeof student.age !== 'number' || student.age < 1) {
  notification.error({
    message: 'Invalid input',
    description: 'Please enter a valid name and age',
  });
  return;
}

      notification.success({
        message: isEdit ? 'Student updated' : 'Student added',
      });
      fetchData();
    } catch (error) {
      console.error('Save error:', error);
      notification.error({
        message: 'Failed to save student',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${STUDENTS_API}/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Delete failed with status ${res.status}`);
      }

      notification.success({ message: 'Student deleted' });
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
      notification.error({
        message: 'Failed to delete student',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { students, loading, fetchData, addOrUpdateStudent, deleteStudent };
};

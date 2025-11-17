"use client"
import { useState, useEffect } from 'react';
import { Button, message, Space, Input, Modal } from 'antd';
import { StudentForm, TableComponents, EditStudentForm, StudentDetailsPage } from '../export/page.js';

function StudentsTable() {
  const [students, setStudents] = useState([
    {
      id: "0",
      name: "No_name",
      nis: "000000",
      class_name: "0",
      major: "No_major",
      status: "active"
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [currentStudent, setCurrentStudent] = useState({
    id: "0",
    name: "No_name",
    nis: "000000",
    class_name: "0",
    major: "No_major",
    status: "active"
  });
  const [searchValue, setSearchValue] = useState("");

  async function getStudents() {
    try {
      const response = await fetch('/api/students', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();

      if (result.body['is_success']) {
        setStudents(result.body.data);
      }
    } catch (err) {
      console.log(err);
      messageApi.error("Failed to get student data.");
    }
  }

  async function loadStudents() {
    setLoading(true);
    try {
      await getStudents();
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      messageApi.error("Failed to load student data.");
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = students.filter(s => {
    const searchLower = (searchValue || "").toLowerCase();
    return (
      s.name.toLowerCase().includes(searchLower) ||
      (s.major || "").toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      {contextHolder}
      <div>
        <h1 className="text-2xl font-bold mb-4">Student Data Management</h1>

        <Space size="middle" className="mb-6 w-full justify-between">
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            className="bg-indigo-600 hover:bg-indigo-700 h-10 px-6 rounded-lg text-lg font-medium shadow-md"
          >
            Add Student
          </Button>

          <Input.Search
            placeholder="Search by name or major"
            onSearch={(e) => setSearchValue(e)}
            style={{ minWidth: "300px", width: "500px" }}
          />

          <Button
            onClick={() => {
              loadStudents();
              messageApi.success("Table refreshed.");
            }}
            disabled={loading || isSubmitting}
            loading={loading}
            className="border-gray-300 text-gray-600 hover:text-indigo-600 hover:border-indigo-600 h-10 px-4 rounded-lg"
          >
            Refresh
          </Button>
        </Space>

        <TableComponents
          students={filteredStudents}
          setStudents={setStudents}
          loading={loading}
          loadStudents={loadStudents}
          setIsEditModalVisible={setIsEditModalVisible}
          setDetailsModalVisible={setDetailsModalVisible}
          setCurrentStudent={setCurrentStudent}
        />

        <StudentForm
          students={students}
          setStudents={setStudents}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />

        <EditStudentForm
          setStudents={setStudents}
          isEditModalVisible={isEditModalVisible}
          setIsEditModalVisible={setIsEditModalVisible}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          currentStudent={currentStudent}
        />

        <Modal
          open={detailsModalVisible}
          title="Student Details"
          footer={null}
          onCancel={() => setDetailsModalVisible(false)}
        >
          <StudentDetailsPage
            currentStudent={currentStudent}
            setDetailsModalVisible={setDetailsModalVisible}
          />
        </Modal>
      </div>
    </div>
  );
}

export default StudentsTable;

// components/ViewStudents.js
"use client";
import React from "react";
import { Modal, Card, Button } from "antd";

const ViewStudents = ({ student, isVisible, setIsVisible }) => {
  if (!student) return null;

  return (
    <Modal
      open={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
      centered
      width={500}
    >
      <Card
        title={`Student Detail - ${student.name}`}
        bordered={false}
      >
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>NIS:</strong> {student.nis}</p>
        <p><strong>Class:</strong> {student.class_name}</p>
        <p><strong>Major:</strong> {student.major}</p>
        <p><strong>Status:</strong> {student.status}</p>

        <Button type="primary" onClick={() => setIsVisible(false)}>
          Close
        </Button>
      </Card>
    </Modal>
  );
};

export default ViewStudents;

"use client"
import { Card, Button } from "antd"

function StudentDetailsPage({ currentStudent, setDetailsModalVisible }) {
  if (!currentStudent) {
    return <p>No student selected</p>
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="font-bold text-4xl">Student Details</p>
      <Card
        title={`${currentStudent.name} - Student ID ${currentStudent.id}`}
        extra={
          <span
            onClick={() => setDetailsModalVisible(false)}
            className="text-blue-600 cursor-pointer underline"
          >
            Close
          </span>
        }
        className="w-100"
      >
        <p>NIS: {currentStudent.nis}</p>
        <p>Name: {currentStudent.name}</p>
        <p>Class: {currentStudent.class_name || "Not assigned"}</p>
        <p>Major: {currentStudent.major || "Not assigned"}</p>
        <p>Status: {currentStudent.status}</p>
        <p>Created At: {new Date(currentStudent.created_at).toLocaleString()}</p>
        <p>Updated At: {new Date(currentStudent.updated_at).toLocaleString()}</p>
      </Card>
    </div>
  )
}

export default StudentDetailsPage

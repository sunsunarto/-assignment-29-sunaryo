"use client";
import { Table, Tag, Spin, Button, Space, message, Popconfirm } from "antd";

function TableComponents({ students, setStudents, loading, loadStudents, setIsEditModalVisible, setCurrentStudent }) {
  const [messageApi, contextHolder] = message.useMessage();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a, b) => (a.name || "").localeCompare(b.name),
    },
    {
      title: "NIS (Student ID)",
      dataIndex: "nis",
      key: "nis",
      width: "20%",
      render: (nis) => <Tag color="blue">{nis}</Tag>,
    },
    {
      title: "Class",
      dataIndex: "class_name",
      key: "class_name",
      width: "20%",
      render: (text) => <Tag color="geekblue">{text}</Tag>,
      sorter: (a, b) => (a.class_name || "").localeCompare(b.class_name),
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
      width: "20%",
      render: (major) => {
        return <Tag color="purple">{major ? major.toUpperCase() : "No_major"}</Tag>;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setIsEditModalVisible(true);
              setCurrentStudent(record);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete student"
            description="Are you sure to delete this student?"
            onConfirm={() => removeStudents(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filterInactiveStudents = students.filter((s) => s.status !== "inactive");

  async function removeStudents(studentData) {
    try {
      const body = { ...studentData, status: "inactive" };

      const response = await fetch(`/api/students/${studentData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();

      if (result.body["is_success"]) {
        setStudents(() => students.filter((s) => s.id !== studentData.id));
        messageApi.success(`Successfully removed student. ID: ${studentData.id}`);
        loadStudents();
      }
    } catch (err) {
      messageApi.error("Failed to remove student.");
      console.log(err);
    }
  }

  return (
    <div>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={filterInactiveStudents}
        rowKey="id"
        loading={{ indicator: <Spin />, spinning: loading }}
        pagination={{ pageSize: 5 }}
        className="rounded-lg shadow-inner overflow-hidden"
      />
    </div>
  );
}

export default TableComponents;

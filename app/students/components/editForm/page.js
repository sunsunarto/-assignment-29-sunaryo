"use client";
import { Modal, Button, Form, Input, message } from "antd";
import { useEffect } from "react";

function EditStudentForm({ 
  setStudents, 
  isEditModalVisible, 
  setIsEditModalVisible, 
  isSubmitting, 
  setIsSubmitting, 
  currentStudent 
}) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isEditModalVisible && currentStudent) {
      form.setFieldsValue({
        name: currentStudent.name,
        nis: currentStudent.nis,
        class_name: currentStudent.class_name,
        major: currentStudent.major,
      });
    }
  }, [isEditModalVisible, currentStudent, form]);

  async function updateStudents(studentData) {
    try {
      const response = await fetch(`/api/students/${studentData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });
      const result = await response.json();

      console.log(result);

      if (result.body["is_success"]) {
        messageApi.success("Student updated.");
        setStudents((prevStudents) =>
          prevStudents.map((s) =>
            s.id === studentData.id ? studentData : s
          )
        );
      } else {
        throw new Error(result.body.message || "Update was not successful.");
      }
    } catch (err) {
      messageApi.error("Failed to update student.");
      throw err;
    }
  }

  async function onFinish(values) {
    setIsSubmitting(true);

    try {
      const studentDataWithId = {
        ...values,
        id: currentStudent.id,
      };

      await updateStudents(studentDataWithId);

      setIsEditModalVisible(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      messageApi.error(`Submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCancel = () => {
    if (!isSubmitting) {
      setIsEditModalVisible(false);
      form.resetFields();
    }
  };

  return (
    <Modal
      title={<div className="text-xl font-semibold text-indigo-700">Edit Student</div>}
      open={isEditModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button
          key="back"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="rounded-lg"
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isSubmitting}
          onClick={() => form.submit()}
          className="bg-indigo-600 hover:bg-indigo-700 rounded-lg"
        >
          Submit Student
        </Button>,
      ]}
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        name="edit_student_form"
        onFinish={onFinish}
        className="pt-4"
      >
        <Form.Item
          name="name"
          label="Student Name"
          rules={[{ required: true, message: "Please input the student name!" }]}
        >
          <Input placeholder="Input student name" className="rounded-lg p-2" />
        </Form.Item>

        <Form.Item
          name="class_name"
          label="Class"
          rules={[{ required: true, message: "Please input the class!" }]}
        >
          <Input placeholder="Input your class" className="rounded-lg p-2" />
        </Form.Item>

        <Form.Item
          name="major"
          label="Major"
          rules={[{ required: true, message: "Please input the major!" }]}
        >
          <Input placeholder="Input your major" className="rounded-lg p-2" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditStudentForm;

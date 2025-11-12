"use client"
import { Button, Table } from "antd"
import { useRouter } from "next/navigation";
import students from "@/data"

function TableComponent() {
    const router = useRouter()

    const StudentColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'action',
            width: "20%",
            render: (_, record) => (
                <>
                    <Button 
                        type="primary" 
                        onClick={() => {
                            router.push(`/students/${record.id}`)
                        }}
                    >
                        View Details
                    </Button>
                </>
            )
        },
    ];

    return (
        <div >
            <Table
                columns={StudentColumns}
                dataSource={ students.map(s => ({ ...s, key: s.id }))}
                pagination={{ pageSize: 5 }}
                bordered
                className="ant-table-striped"
            />
        </div>
    )
}

export default TableComponent

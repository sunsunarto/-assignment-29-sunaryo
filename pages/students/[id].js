"use client"
import { useParams, useRouter } from "next/navigation"
import { Button, Card } from "antd"
import students from "@/data"

function Page() {
    const router = useRouter()
    const { id } = useParams()

    const currentStudent = students.find(s => s.id === parseInt(id))

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            {
                currentStudent ?
                <>
                    <p className="font-bold text-4xl">Student Details</p>
                    <Card 
                        title={`${ currentStudent.name } - Student ID ${ currentStudent.id }`} 
                        extra={
                            <span 
                                onClick={() => router.back()}
                                className="text-blue-600 cursor-pointer underline"
                            >
                                Back
                            </span>
                        } 
                        className="w-1/3"
                    >
                        <p>Name: { currentStudent.name }</p>
                        <p>Age: { currentStudent.age }</p>
                        <p>Average Grade: { currentStudent.grade }</p>
                    </Card>
                </>
                :
                <>
                    <p className="font-bold text-4xl">Student with ID { id } not found</p>
                    <Button
                        type="primary"
                        onClick={() => router.back()}
                    >
                        Go Back
                    </Button>
                </>
            }
        </div>
    )
}

export default Page

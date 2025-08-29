"use client"

import { ReportingLayout } from "@/components/reporting"
import AppointmentTable from "@/components/reporting/AppointmentTable"
import AppointmentFilter from "@/components/reporting/AppointmentFilter"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"

const page = () => {


    return (
        <ReportingLayout>
            <div className="flex items-center flex-col sm:flex-row gap-2 sm:justify-between justify-center mb-6 ">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments Report</h1>
                <div className="flex items-center gap-2">
                    <Button type="primary" icon={<PlusOutlined />}>Add Appointment</Button>
                    <AppointmentFilter />
                </div>
            </div>

            <AppointmentTable />
        </ReportingLayout>
    )
}

export default page
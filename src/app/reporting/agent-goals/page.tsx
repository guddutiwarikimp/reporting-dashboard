"use client"
import { ReportingLayout } from '@/components'
import { Button, Dropdown, MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import React from 'react'
import { TEXTS_DROPDOWN_ITEMS } from '@/constants/texts'
import AgentGoalTable from '@/components/reporting/AgentGoalTable'

const page = () => {
    const items: MenuProps['items'] = TEXTS_DROPDOWN_ITEMS as any;

    return (
        <ReportingLayout>
            <div className="flex items-center flex-col sm:flex-row gap-2 sm:justify-between justify-center mb-6 ">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Goals</h1>
                <Dropdown menu={{ items }} className="">
                    <Button className=" !font-medium flex items-center gap-1">2025 <DownOutlined /></Button>
                </Dropdown>
            </div>

            <AgentGoalTable />
        </ReportingLayout>
    )
}

export default page
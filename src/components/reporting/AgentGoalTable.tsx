import { Avatar, Button, Modal, Select, Table } from 'antd';
import React, { useState } from 'react'
import { AGENT_GOALS_DATA, AGENT_GOAL_SELECT_OPTIONS } from '@/constants/agentGoals';
import { APPOINTMENT_AVATAR_COLORS } from '@/constants';

const AgentGoalTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const colors = APPOINTMENT_AVATAR_COLORS as unknown as string[];
    const dataSource = AGENT_GOALS_DATA as unknown as any[];

    const columns = [
        {
            title: 'Agents',
            dataIndex: 'agents',
            key: 'agents',
            render: (agents: string) => {
                return <div className="flex items-center gap-2">
                    <Avatar size={30} style={{ backgroundColor: colors[agents.split(' ').map(word => word[0]).join('').charCodeAt(0) % colors.length], }} className="!text-white !text-xs !font-medium">{agents.split(' ').map(word => word[0]).join('')}</Avatar>
                    <span className="text-sm font-medium dark:text-white">{agents}</span>
                </div>
            }
        },
        {
            title: 'Closed Deals',
            dataIndex: 'closed_deals',
            key: 'closed_deals',
            width: 150,
        },
        {
            title: 'Upcoming Deals',
            dataIndex: 'upcoming_deals',
            key: 'upcoming_deals',
            width: 150,
        },
        {
            title: 'Commission Earned',
            dataIndex: 'commission_earned',
            key: 'commission_earned',
            render: (commission_earned: number) => {
                return <span className="text-sm font-medium dark:text-white">${commission_earned}</span>
            },
            width: 150,
        },
        {
            title: 'Commission Goal',
            dataIndex: 'commission_goal',
            key: 'commission_goal',
            width: 150,
            render: (commission_goal: string) => {
                return <Button className="text-sm font-medium dark:text-white" onClick={() => setIsModalOpen(true)}>{commission_goal}</Button>
            }
        },
        {
            title: 'Goal Progress',
            dataIndex: 'goal_progress',
            key: 'goal_progress',
            width: 150,
        },
    ];


    return (
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size="middle"
                className="agent-table"
                scroll={{ x: 'max-content', y: 600 }}
            />
            <Modal
                title="Agent Commission Goal for 2025"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                okText="Save"
            >
                <div className="my-8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium dark:text-white">Commission Goal</span>
                    </div>
                    <Select
                        className="w-full"
                        showSearch
                        placeholder="Agent Commission Goal for 2025"
                        filterOption={(input: string, option: any) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={AGENT_GOAL_SELECT_OPTIONS as unknown as any[]}
                    />
                </div>
            </Modal>
        </>
    )
}


export default AgentGoalTable
"use client"
import { Avatar, Table, Tooltip } from "antd";
import Link from "next/link";
import { APPOINTMENTS_DATA, APPOINTMENT_AVATAR_COLORS } from "@/constants/appointments";

const AppointmentTable = () => {
    const colors = APPOINTMENT_AVATAR_COLORS as unknown as string[];

    const dataSource = APPOINTMENTS_DATA;

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            render: (title: string) => {
                return <div className="text-sm font-medium dark:text-white truncate max-w-[160px] sm:max-w-[240px] md:max-w-none"><Link className="!text-gray-800 !underline block truncate" href={`/reporting/appointments/${title}`}>{title}</Link></div>
            }
        },
        {
            title: 'People',
            dataIndex: 'people',
            key: 'people',
            width: 100,
            render: (people: string) => {
                return <Tooltip title={people} placement="bottom">
                    <Avatar size={30} className="!text-white !text-xs !font-medium !bg-amber-600">{people.split(' ').map(word => word[0]).join('')}</Avatar>
                </Tooltip>
            }
        },
        {
            title: 'Teams',
            dataIndex: 'teams',
            key: 'teams',

            render: (teams: string[]) => {
                return <div className="flex items-center gap-2">
                    <Avatar.Group>
                        {teams.map((team) => (
                            <Tooltip key={team} title={team} placement="bottom">
                                <Avatar size={30} style={{ backgroundColor: colors[team.split(' ').map(word => word[0]).join('').charCodeAt(0) % colors.length], }} className="!text-white !text-xs !font-medium">{team.split(' ').map(word => word[0]).join('')}</Avatar>
                            </Tooltip>
                        ))}
                    </Avatar.Group>
                </div>
            }
        },
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: 100,
            render: (createdBy: string) => {
                return <Tooltip title={createdBy} placement="bottom">
                    <Avatar size={30} className="!text-white !text-xs !font-medium !bg-teal-600">{createdBy.split(' ').map(word => word[0]).join('')}</Avatar>
                </Tooltip>
            }
        },

        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            ellipsis: true,
        },

        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 100,
        },

        {
            title: 'Outcome',
            dataIndex: 'outcome',
            key: 'outcome',
            width: 100,
        },

        {
            title: 'Contact Lead Source',
            dataIndex: 'contact_lead_source',
            key: 'contact_lead_source',
            width: 150,
        },

        {
            title: 'Marketing Source',
            dataIndex: 'marketing_source',
            key: 'marketing_source',
            width: 150,
        },
    ];


    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            size="middle"
            className="agent-table"
            scroll={{ x: 'max-content', y: 600 }}

        />
    )
}

export default AppointmentTable
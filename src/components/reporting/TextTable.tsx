'use client'
import { InfoCircleOutlined, QuestionCircleFilled, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Table, Tooltip } from 'antd';
import React from 'react'
import Man from '@/assets/img/man.webp'
import Woman from '@/assets/img/woman.webp'
import { TextTableTitleCell } from './TextTableTitleCell'
import { TextTableAvatarCell } from './TextTableAvatarCell'
import { TextTableCell } from './TextTableCell'

const TextTable = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike Smith',
            phone: '(123) 456-7890',
            image: Man,
            textSents: 3675,
            textSentsPeople: 1477,
            textReceived: 1515,
            textReceivedPeople: 636,
            deliveryRate: "Excellent",
            optOuts: 10,
            optOutsPeople: 10,
            carrierFiltered: 10,
            carrierFilteredPeople: 10,
            otherErrors: 100,
            otherErrorsPeople: 10,
        },
        {
            key: '2',
            name: 'John Doe',
            phone: '1234567890',
            textSents: 3675,
            textReceived: 1515,
            deliveryRate: "Excellent",
            optOuts: 10,
            optOutsPeople: 10,
            carrierFiltered: 10,
            carrierFilteredPeople: 10,
            otherErrors: 100,
            otherErrorsPeople: 10,
        },
        {
            key: '3',
            name: 'Arthur Morgan',
            phone: '1234567890',
            textSents: 1000,
            textReceived: 500,
            deliveryRate: "Very Good",
            optOuts: 4,
            optOutsPeople: 4,
            carrierFiltered: 10,
            carrierFilteredPeople: 10,
            otherErrors: 10,
            otherErrorsPeople: 10,
        },
        {
            key: '4',
            name: 'Aniya Wilson',
            phone: '1234567890',
            image: Woman,
            textSents: 3675,
            textReceived: 1515,
            deliveryRate: "Good",
            optOuts: 10,
            optOutsPeople: 10,
            carrierFiltered: 10,
            carrierFilteredPeople: 10,
            otherErrors: 100,
            otherErrorsPeople: 10,
        },
        {
            key: '5',
            name: 'Elone Lothe',
            phone: '1234567890',
            textSents: 3675,
            textReceived: 1515,
            deliveryRate: "Good",
            optOuts: 10,
            optOutsPeople: 10,
            carrierFiltered: 10,
            carrierFilteredPeople: 10,
            otherErrors: 100,
            otherErrorsPeople: 10,
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: any) => {
                return <TextTableAvatarCell name={name} image={record.image} phone={record.phone} />
            }
        },
        {
            title: <TextTableTitleCell title="Text sents" tooltip="Text sents" />,
            dataIndex: 'textSents',
            key: 'textSents',
            render: (text: string, record: any) => {
                return <TextTableCell text={text} people={record.textSentsPeople} />
            }
        },
        {
            title: <TextTableTitleCell title="Text received" tooltip="Text received" />,
            dataIndex: 'textReceived',
            key: 'textReceived',
            render: (text: string, record: any) => {
                return <TextTableCell text={text} people={record.textReceivedPeople} />
            }
        },

        {
            title: <TextTableTitleCell title="Delivery rate" tooltip="Delivery rate" />,
            dataIndex: 'deliveryRate',
            key: 'deliveryRate',
            render: (text: string, record: any) => {
                return <TextTableCell text={text} people={record.deliveryRatePeople} />
            }
        },

        {
            title: <TextTableTitleCell title="Opt-outs" tooltip="Opt-outs" />,
            dataIndex: 'optOuts',
            key: 'optOuts',
            render: (text: string, record: any) => {
                return <TextTableCell text={text} people={record.optOutsPeople} />
            }
        },

        {
            title: <TextTableTitleCell title="Carrier filtered" tooltip="Carrier filtered" />,
            dataIndex: 'carrierFiltered',
            key: 'carrierFiltered',
            render: (text: string, record: any) => {
                return <TextTableCell text={text} people={record.carrierFilteredPeople} />
            }
        },

        {
            title: <TextTableTitleCell title="Other errors" tooltip="Other errors" />,
            dataIndex: 'otherErrors',
            key: 'otherErrors',
            render: (text: string, record: any) => {
                return <TextTableCell text={text} people={record.otherErrorsPeople} />
            }
        },
    ];

    return (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    size="middle"
                    className="agent-table"
                    scroll={{ x: 'max-content' }}
                    rowClassName="bg-white dark:bg-gray-800"
                />
            </div>
        </div>
    )
}



export default TextTable
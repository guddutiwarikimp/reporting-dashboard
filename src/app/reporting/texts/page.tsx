import { ReportingLayout } from '@/components';
import TextTable from '@/components/reporting/TextTable';
import TextStats from '@/components/reporting/TextStats';
import { Button, MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default function TextsPage() {
    const TextStatsData = [
        {
            title: "Text Sents",
            value: 1847,
            people: 1477
        },
        {
            title: "Text Received",
            value: 1234,
            people: 636
        },

        {
            title: "Delivery Rate",
            value: 100,
        },

        {
            title: "Opt-Outs",
            value: 3,
            people: 3
        },

        {
            title: "Carrier Filtered",
            value: 8,
            people: 5
        },

        {
            title: "Other Errors",
            value: 16,
            people: 15
        },
    ]

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    All Time
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Last 30 Days
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    Last 7 Days
                </a>
            ),
        },
    ];

    return (
        <ReportingLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Texts Report</h1>
                <Dropdown menu={{ items }} placement="bottomCenter" className="">
                    <Button className=" !font-medium flex items-center gap-1">All Time <DownOutlined /></Button>
                </Dropdown>
            </div>

            <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-6">
                {TextStatsData.map((stats, index) => (
                    <TextStats key={stats.title} stats={stats} />
                ))}
            </div>

            <TextTable />
        </ReportingLayout>
    )
}
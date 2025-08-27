import { ReportingLayout } from '@/components';
import { TextTable } from '@/components/reporting';
import { Button, MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TEXTS_STATS, TEXTS_DROPDOWN_ITEMS } from '@/constants/texts';
import TextStats from '@/components/reporting/TextStats';

export default function TextsPage() {
    const TextStatsData = TEXTS_STATS as any;
    const items: MenuProps['items'] = TEXTS_DROPDOWN_ITEMS as any;

    return (
        <ReportingLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Texts Report</h1>
                <Dropdown menu={{ items }} className="">
                    <Button className=" !font-medium flex items-center gap-1">All Time <DownOutlined /></Button>
                </Dropdown>
            </div>

            <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-6">
                {TextStatsData.map((stats: any) => (
                    <TextStats key={stats.title} stats={stats} />
                ))}
            </div>

            <TextTable />
        </ReportingLayout>
    )
}
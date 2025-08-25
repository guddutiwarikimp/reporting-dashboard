import { Card } from 'antd'
import { formatNumber } from '@/utils'

const TextStats = ({ stats }: { stats: any }) => {
    return (
        <Card className="[&_.ant-card-body]:!p-3 relative shadow">
            <div className="flex flex-col gap-2">
                <div>
                    <div className="text-sm text-gray-500 font-semibold dark:text-gray-300">{stats.title}</div>
                    <div className={`text-2xl font-bold text-gray-800`}>{formatNumber(stats.value)}{stats.title === "Delivery Rate" ? "%" : ""}</div>

                    {stats.people && <div className="text-xs text-gray-500 absolute top-[14px] right-[18px]">{formatNumber(stats.people)} people</div>}
                </div>
            </div>
        </Card>
    )
}

export default TextStats
import { Card } from "antd"
import { formatNumber } from "@/utils"

const StatsBox = ({ title = "", value, icon }: { title?: string, value: React.ReactNode, icon: React.ReactNode }) => {
    return (
        <Card className="!p-0 shadow">
            <div className="flex xl:flex-row flex-col xl:justify-start justify-center xl:items-start items-center gap-2">
                <span className={`text-2xl`}>{icon}</span>
                <div className="flex flex-col gap-1">
                    <p className="text-2xl xl:text-left text-center">{typeof value === 'number' ? formatNumber(value) : value}</p>
                    <p className="text-sm text-stone-500 xl:text-left text-center font-semibold tracking-wide">{title}</p>
                </div>
            </div>
        </Card>
    )
}

export default StatsBox;
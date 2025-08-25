import { Card } from "antd"

const StatsBox = ({ title = "", value, icon }: { title?: string, value: React.ReactNode, icon: React.ReactNode }) => {
    return (
        <Card className="!p-0 shadow">
            <div className="flex items-start gap-2">
                <span className={`text-2xl`}>{icon}</span>
                <div className="flex flex-col gap-1">
                    <p className="text-2xl">{value}</p>
                    <p className="text-sm text-stone-500 font-semibold tracking-wide">{title}</p>
                </div>
            </div>
        </Card>
    )
}

export default StatsBox;
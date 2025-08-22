import { Space } from "antd"

const StatsBadge = ({ title = "", value, icon }: { title?: string, value: React.ReactNode, icon: React.ReactNode }) => {
    return (
        <Space align="start" size={8}>
            {icon}
            <div>
                <p className="font-medium">{value}</p>
                <div style={{ lineHeight: 1 }}>
                    <p className="text-sm text-gray-500">{title}</p>
                </div>
            </div>
        </Space>
    )
}

export default StatsBadge;
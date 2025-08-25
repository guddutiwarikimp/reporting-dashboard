import { QuestionCircleFilled } from "@ant-design/icons"
import { Tooltip } from "antd"

export const TextTableTitleCell = ({ title, tooltip }: { title: string, tooltip: string }) => {
    return <div className='flex items-center gap-2'>
        <span className="cursor-help hover:underline">{title}</span>
        <Tooltip title={tooltip} placement="top">
            <QuestionCircleFilled className='text-gray-500' />
        </Tooltip>
    </div>
}
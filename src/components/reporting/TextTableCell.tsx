import { UserOutlined } from "@ant-design/icons"
import { formatNumber } from "@/utils"

export const TextTableCell = ({ text, people }: { text: string, people: number }) => {
    return <div className='text-gray-800 font-medium'>{formatNumber(text)} {people > 0 && <span className='ml-2 text-[10px] font-medium bg-cyan-100 border border-cyan-200 text-cyan-800 rounded-full px-2 py-1'><UserOutlined /> {formatNumber(people)} people</span>}</div>
}
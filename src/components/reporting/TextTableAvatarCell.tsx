import { Avatar } from "antd"

export const TextTableAvatarCell = ({ name, image, phone }: { name: string, image: string, phone: string }) => {
    const colors = [
        '#f97316', '#10b981', '#8b5cf6', '#ef4444',
        '#06b6d4', '#f59e0b', '#84cc16', '#3b82f6'
    ];


    return <div className="flex items-center gap-3">
        <Avatar
            size={40}
            style={{
                backgroundColor: image ? 'transparent' : colors[name.split(' ').map(word => word[0]).join('').charCodeAt(0) % colors.length],
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '16px'
            }}
            src={image?.src}
        >
            {name.split(' ').map(word => word[0]).join('')}
        </Avatar>
        <div className="font-medium text-gray-900 dark:text-gray-100">
            {name}
            <div className="text-xs text-gray-500">{phone}</div>
        </div>
    </div>
}
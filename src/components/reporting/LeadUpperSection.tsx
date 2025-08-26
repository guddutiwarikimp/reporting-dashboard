import { Button, Dropdown, MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { UserDeleteOutlined } from "@ant-design/icons";
import { FullscreenOutlined } from "@ant-design/icons";

const LeadUpperSection = () => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            ),
        },
    ];

    return (
        <div className="flex flex-col md:flex-row items-center justify-between pt-3 pb-12 gap-4">
            <div className="flex items-center gap-0">
                <p className="text-gray-700 font-medium">Show me</p>
                <Dropdown menu={{ items }} className="!bg-transparent !border-0 !font-medium !text-sky-500 !shadow-none !hover:shadow-none">
                    <Button className="!bg-transparent !border-0 !font-medium !text-sky-500 flex items-center gap-1">Activity Leadboard <DownOutlined /></Button>
                </Dropdown>
            </div>

            <div className="flex flex-nowrap space-x-2">
                <Dropdown menu={{ items }} className="">
                    <Button className=" !font-medium flex items-center gap-1">Everyone <DownOutlined /></Button>
                </Dropdown>

                <Button type="default" icon={<UserDeleteOutlined />} />

                <Dropdown menu={{ items }} className="">
                    <Button className=" !font-medium flex items-center gap-1">This Year <DownOutlined /></Button>
                </Dropdown>
                <Button type="default" icon={<FullscreenOutlined />} />
            </div>
        </div>
    )
}

export default LeadUpperSection
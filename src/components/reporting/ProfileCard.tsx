import { Col, Row, Space, Card, Avatar } from "antd"
import { CalendarOutlined } from "@ant-design/icons"
import { PhoneOutlined } from "@ant-design/icons"
import { MessageOutlined } from "@ant-design/icons"
import { MailOutlined } from "@ant-design/icons"
import StatsBadge from "@/components/reporting/StateBadge"
import { formatNumber } from "@/utils"

const ProfileCard = ({ name = "Monisha Satkunarajah", bgColor = "#FFF", avatarBgColor = "#E67E3F", rank = 1, score = 67113 }) => {
    return (
        <Card
            styles={{
                body: {
                    marginTop: -60,
                }
            }}
            className={`${bgColor} rounded-xl !px-0 mt-[-60px] shadow`}
        >
            <Space direction="vertical" size={12} style={{ width: "100%" }} align="center">
                <div className="relative inline-block" >
                    <Avatar className={`text-white ${avatarBgColor} !text-3xl`} size={88}>{name.slice(0, 2).toUpperCase()}</Avatar>
                    <div className="absolute left-[33%] bottom-[-10px] bg-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">{rank}</div>
                </div>

                <h3 className="text-lg font-bold">{name}</h3>

                <h2 className="text-6xl font-semibold text-blue-600 leading-none">
                    {formatNumber(score)}
                </h2>

                <Row gutter={[16, 16]} justify="center" className="mt-2">
                    <Col>
                        <StatsBadge value={5} icon={<CalendarOutlined style={{ color: "#0ea5e9" }} />} />
                    </Col>
                    <Col>
                        <StatsBadge value={<>
                            322 <span className="text- text-gray-500">(2 days 8 hrs)</span>
                        </>} icon={<PhoneOutlined style={{ color: "#22c55e" }} />} />
                    </Col>
                    <Col>
                        <StatsBadge value={"1,532"} icon={<PhoneOutlined style={{ color: "#f59e0b" }} />} />
                    </Col>
                    <Col>
                        <StatsBadge value={"3,365"} icon={<MessageOutlined style={{ color: "#a855f7" }} />} />
                    </Col>
                    <Col>
                        <StatsBadge value={"10,363"} icon={<MailOutlined style={{ color: "#60a5fa" }} />} />
                    </Col>
                </Row>
            </Space>
        </Card>
    )
}

export default ProfileCard;
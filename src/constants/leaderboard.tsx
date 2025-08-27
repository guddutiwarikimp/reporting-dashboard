import { CalendarOutlined, PhoneOutlined, MessageOutlined, MailOutlined } from "@ant-design/icons";
import man from "@/assets/img/man.webp";
import woman from "@/assets/img/woman.webp";

export const PROFILE_CARDS = [
    { name: "Monisha Satkunarajah", bgColor: "!bg-white", avatarBgColor: "!bg-[#E67E3F]", rank: 1, score: 67113 },
    { name: "Albi Leka", bgColor: "!bg-white", avatarBgColor: "!bg-gray-400", rank: 2, score: 20021 },
    { name: "Ben Lotha", bgColor: "!bg-white", avatarBgColor: "!bg-green-300", rank: 3, score: 16193 },
] as const;

export const LEADERBOARD_STAT_BOXES = [
    { title: "APPOINTMENTS", value: 10, icon: <CalendarOutlined className="!text-cyan-400" /> },
    { title: "CONVERSATIONS", value: 649, icon: <PhoneOutlined className="!text-green-400" /> },
    { title: "CALL ATTEMPTS", value: "2,895", icon: <PhoneOutlined className="!text-yellow-400" /> },
    { title: "TEXT MESSAGES", value: "6,853", icon: <MessageOutlined className="!text-purple-400" /> },
    { title: "EMAILS", value: "19,495", icon: <MailOutlined className="!text-blue-400" /> },
] as const;

export const LEAD_ITEMS = [
    { name: "Monisha Satkunarajah", avatarColor: "!bg-gray-400", rank: 1, score: 89455 },
    { name: "Albi Leka", avatarColor: "!bg-amber-300", rank: 2, score: 90000 },
    { name: "Ben Lotha", avatarColor: "!bg-gray-300", rank: 3, score: 80000, avatarImg: man.src },
    { name: "Ida Sern", avatarColor: "!bg-red-300", rank: 4, score: 70000 },
    { name: "Kavindu Perera", avatarColor: "!bg-green-300", rank: 5, score: 60000 },
    { name: "Jeenvan Theivadan", avatarColor: "!bg-blue-300", rank: 6, score: 50000 },
    { name: "Aniya Wilson", avatarColor: "!bg-purple-300", rank: 7, score: 40000, avatarImg: woman.src },
    { name: "MJ Subenthian", avatarColor: "!bg-orange-300", rank: 8, score: 30000 },
    { name: "William Kandasamy", avatarColor: "!bg-pink-300", rank: 9, score: 20000 },
    { name: "James Kandasamy", avatarColor: "!bg-gray-700", rank: 10, score: 10000 },
] as const;



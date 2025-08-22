'use client'
import { ReportingLayout } from "@/components";
import LeadListItem from "@/components/reporting/LeadListItem";
import ProfileCard from "@/components/reporting/ProfileCard";
import StatsBox from "@/components/reporting/StatsBox";
import { CalendarOutlined, PhoneOutlined, MessageOutlined, MailOutlined } from "@ant-design/icons";
import LeadUpperSection from "@/components/reporting/LeadUpperSection";
import man from "@/assets/img/man.webp";
import woman from "@/assets/img/woman.webp";

export default function LeaderboardPage() {
    return (
        <ReportingLayout>
            <LeadUpperSection />

            <div className="space-y-6 mt-10">
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-4 gap-16">
                    <ProfileCard name="Monisha Satkunarajah" bgColor="!bg-white" avatarBgColor="!bg-[#E67E3F]" rank={1} score={67113} />
                    <ProfileCard name="Albi Leka" bgColor="!bg-white" avatarBgColor="!bg-gray-400" rank={2} score={20021} />
                    <ProfileCard name="Ben Lotha" bgColor="!bg-white" avatarBgColor="!bg-green-300" rank={3} score={16193} />
                </div>

                <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
                    <StatsBox title="APPOINTMENTS" value={10} icon={<CalendarOutlined className="!text-cyan-400" />} />
                    <StatsBox title="CONVERSATIONS" value={649} icon={<PhoneOutlined className="!text-green-400" />} />
                    <StatsBox title="CALL ATTEMPTS" value={'2,895'} icon={<PhoneOutlined className="!text-yellow-400" />} />
                    <StatsBox title="TEXT MESSAGES" value={'6,853'} icon={<MessageOutlined className="!text-purple-400" />} />
                    <StatsBox title="EMAILS" value={'19,495'} icon={<MailOutlined className="!text-blue-400" />} />
                </div>

                <div className="grid md:grid-cols-1 grid-cols-2 gap-x-4">
                    <LeadListItem name="Monisha Satkunarajah" avatarColor="!bg-gray-400" rank={1} score={89455} />
                    <LeadListItem name="Albi Leka" avatarColor="!bg-amber-300" rank={2} score={90000} />
                    <LeadListItem name="Ben Lotha" avatarColor="!bg-gray-300" rank={3} score={80000} avatarImg={man.src} />
                    <LeadListItem name="Ida Sern" avatarColor="!bg-red-300" rank={4} score={70000} />
                    <LeadListItem name="Kavindu Perera" avatarColor="!bg-green-300" rank={5} score={60000} />
                    <LeadListItem name="Jeenvan Theivadan" avatarColor="!bg-blue-300" rank={6} score={50000} />
                    <LeadListItem name="Aniya Wilson" avatarColor="!bg-purple-300" rank={7} score={40000} avatarImg={woman.src} />
                    <LeadListItem name="MJ Subenthian" avatarColor="!bg-orange-300" rank={8} score={30000} />
                    <LeadListItem name="William Kandasamy" avatarColor="!bg-pink-300" rank={9} score={20000} />
                    <LeadListItem name="James Kandasamy" avatarColor="!bg-gray-700" rank={10} score={10000} />
                </div>
            </div>
        </ReportingLayout>
    );
}




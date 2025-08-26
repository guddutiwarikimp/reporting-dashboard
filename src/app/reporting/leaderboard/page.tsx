'use client'
import { ReportingLayout } from "@/components";
import LeadListItem from "@/components/reporting/LeadListItem";
import ProfileCard from "@/components/reporting/ProfileCard";
import StatsBox from "@/components/reporting/StatsBox";
import LeadUpperSection from "@/components/reporting/LeadUpperSection";
import { PROFILE_CARDS, LEADERBOARD_STAT_BOXES, LEAD_ITEMS } from "@/constants/leaderboard";

export default function LeaderboardPage() {
    const profileCards = PROFILE_CARDS;
    const statBoxes = LEADERBOARD_STAT_BOXES;
    const leadItems = LEAD_ITEMS;

    return (
        <ReportingLayout>
            <LeadUpperSection />

            <div className="space-y-6 mt-10">
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-4 gap-16">
                    {profileCards.map((p) => (
                        <ProfileCard key={p.rank} name={p.name} bgColor={p.bgColor} avatarBgColor={p.avatarBgColor} rank={p.rank} score={p.score} />
                    ))}
                </div>

                <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
                    {statBoxes.map((s) => (
                        <StatsBox key={s.title} title={s.title} value={s.value as any} icon={s.icon} />
                    ))}
                </div>

                <div className="grid md:grid-cols-1 grid-cols-2 gap-x-4">
                    {leadItems.map((l) => (
                        <LeadListItem key={l.rank} name={l.name} avatarColor={l.avatarColor} rank={l.rank} score={l.score} avatarImg={(l as any).avatarImg} />
                    ))}
                </div>
            </div>
        </ReportingLayout>
    );
}




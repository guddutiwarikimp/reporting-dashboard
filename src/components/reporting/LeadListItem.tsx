import { useState } from "react";
import { useEffect } from "react";
import { Card, Slider } from "antd";
import { Avatar } from "antd";
import { CalendarOutlined, MailOutlined } from "@ant-design/icons";
import { PhoneOutlined } from "@ant-design/icons";
import { MessageOutlined } from "@ant-design/icons";
import { formatNumber } from "@/utils";
import LeadState from "./LeadState";
import StatsBadge from "./StateBadge";

const LeadListItem = ({
    name = "",
    rank = 4,
    avatarColor = "#FFF",
    score = 0,
    avatarImg = "",
}: {
    name?: string;
    initials?: string;
    rank?: number;
    score?: number;
    progressPercent?: number;
    avatarColor?: string;
    avatarImg?: string;
}) => {
    const [sliderValue, setSliderValue] = useState(score);

    useEffect(() => {
        const slider = document.querySelector(`#slider-${rank} .ant-slider-handle`);
        if (slider) {
            slider.innerHTML = "";
            const span = document.createElement("p")
            span.className = "absolute !text-white top-[20%] -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs font-medium z-50 w-full text-center";
            span.textContent = formatNumber(sliderValue);
            slider?.appendChild(span);
        }
    }, [rank, sliderValue]);


    return (
        <Card className="!p-0 !mb-3 shadow [&_.ant-card-body]:sm:!p-5 [&_.ant-card-body]:!p-3">
            <div className="flex md:flex-row flex-col md:items-start items-center md:justify-start justify-center gap-5">
                <div className="relative">
                    {avatarImg ? (<Avatar src={avatarImg} className={`!text-white !font-semibold !overflow-hidden ${avatarColor}`} size={56} />)
                        : (
                            <Avatar className={`!text-white !font-semibold !overflow-hidden ${avatarColor}`} size={56}>
                                {name.slice(0, 2).toUpperCase()}
                            </Avatar>
                        )
                    }

                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow">
                        {rank}
                    </div>
                </div>

                <div className="flex-1">
                    <p className="md:text-base text-sm font-semibold mb-2 md:text-left text-center">{name}</p>

                    <div className="relative">
                        <Slider
                            id={`slider-${rank}`}
                            max={100000}
                            className="!m-0 [&_.ant-slider-handle]:after:!shadow-none [&_.ant-slider-handle]:after:!w-[50px] [&_.ant-slider-handle]:after:!h-[20px] [&_.ant-slider-handle]:after:!top-[20%] [&_.ant-slider-handle]:after:!-translate-y-1/2 [&_.ant-slider-handle]:after:!rounded-xl [&_.ant-slider-track]:!bg-sky-500 [&_.ant-slider-track]:!h-2 [&_.ant-slider-track]:!rounded-xl [&_.ant-slider-rail]:!bg-sky-500/20 [&_.ant-slider-rail]:!h-2 [&_.ant-slider-rail]:!rounded-xl [&_.ant-slider-handle]:!relative [&_.ant-slider-handle]:!w-[50px] [&_.ant-slider-handle]:after:!bg-blue-500 [&_.ant-slider-handle]:after:!border-0 [&_.ant-slider-handle]:after:!text-white"
                            tooltip={{ open: false }}
                            value={sliderValue}
                            onChange={(value: number) => setSliderValue(value)}

                        />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                        <StatsBadge value={0} icon={<CalendarOutlined className="!text-cyan-400" />} />
                        <StatsBadge value={<><span>76</span> <span className="text-gray-500">(14 hrs 2m)</span></>} icon={<PhoneOutlined className="!text-green-500" />} />
                        <StatsBadge value={52} icon={<PhoneOutlined className="!text-orange-400" />} />
                        <StatsBadge value={10} icon={<MailOutlined className="!text-blue-400" />} />
                    </div>
                </div>
            </div>
        </Card >
    )
}

export default LeadListItem;
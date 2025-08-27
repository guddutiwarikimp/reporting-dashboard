import { Button, Drawer, Dropdown, MenuProps } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import { CheckCircleOutlined, ClockCircleFilled, DownOutlined, FilterOutlined, QuestionCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { APPOINTMENT_DROPDOWN_FILTERS, APPOINTMENT_MOBILE_FILTERS, APPOINTMENT_FILTER_DRAWER_OPTIONS } from '@/constants/appointments'

const AppointmentFilter = () => {
    const [activeFilter, setActiveFilter] = useState<number>(-1);

    const handleToggleFilter = useCallback((key: number) => {
        setActiveFilter(prev => (prev === key ? -1 : key))
    }, [])

    const handleCloseDrawer = useCallback(() => {
        setActiveFilter(-1)
    }, [])

    const filterIconByKey: Record<number, React.ReactNode> = useMemo(() => ({
        1: <ClockCircleFilled />,
        2: <UsergroupAddOutlined />,
        3: <QuestionCircleOutlined />,
        4: <CheckCircleOutlined />,
    }), [])

    const desktopMenuItems: MenuProps['items'] = useMemo(() => (
        APPOINTMENT_FILTER_DRAWER_OPTIONS.map((option, idx) => ({ key: idx + 1, label: option }))
    ), [])

    const mobileMenuItems: MenuProps['items'] = useMemo(() => (
        APPOINTMENT_MOBILE_FILTERS.map((item) => ({
            key: item.key,
            label: (
                <span className="!font-medium flex items-center gap-1">
                    {filterIconByKey[item.key]}{item.name}
                </span>
            ),
            onClick: () => handleToggleFilter(item.key)
        }))
    ), [filterIconByKey, handleToggleFilter])

    const activeFilterTitle = useMemo(() => (
        APPOINTMENT_MOBILE_FILTERS.find(item => item.key === activeFilter)?.name
    ), [activeFilter])

    const DrawerOptionButton = ({ label, onClick }: { label: string, onClick: () => void }) => (
        <Button className="!border-0 !shadow-none !font-medium !text-left hover:!bg-gray-100 active:!bg-gray-200/50 !text-gray-900" onClick={onClick}>{label}</Button>
    )

    return (
        <>
            {APPOINTMENT_DROPDOWN_FILTERS.map((dropdown) => (
                <Dropdown menu={{ items: desktopMenuItems }} className="md:!block !hidden" key={dropdown.label}>
                    <Button className=" !font-medium flex items-center gap-1">
                        {dropdown.label} <DownOutlined />
                    </Button>
                </Dropdown>
            ))}

            {/* Mobile filter */}
            <div className="md:!hidden">
                <Dropdown
                    menu={{ items: mobileMenuItems }}
                    className="md:!hidden" key={"filter"}>
                    <Button type="primary" shape="circle" icon={<FilterOutlined />} />
                </Dropdown>
            </div>

            <Drawer
                title={activeFilterTitle}
                placement={"bottom"}
                closable={true}
                onClose={handleCloseDrawer}
                open={activeFilter !== -1}
                key={"bottom"}
            >
                {activeFilter !== -1 && (
                    <div className="flex flex-col gap-2">
                        {APPOINTMENT_FILTER_DRAWER_OPTIONS.map((label, idx) => (
                            <DrawerOptionButton key={idx} label={label} onClick={handleCloseDrawer} />
                        ))}
                    </div>
                )}
            </Drawer>
        </>
    )
}

export default AppointmentFilter
export * from "./theme";
export * from "./chartDataGenerator";
export * from "./chartOptionsGenerator";
export * from "./dealsChartDataGenerator";

export const formatNumber = (value: number | string, locale: string = "en-US"): string => {
    const num = typeof value === "string" ? Number(value) : value;
    if (!isFinite(num as number)) return String(value);
    return (num as number).toLocaleString(locale);
};
export * from "./theme";
export * from "./chartDataGenerator";
export * from "./chartOptionsGenerator";

export const formatNumber = (value: number | string, locale: string = "en-US"): string => {
    const num = typeof value === "string" ? Number(value) : value;
    if (!isFinite(num as number)) return String(value);
    return (num as number).toLocaleString(locale);
};

export const formatCurrency = (
    value: number | string,
    currency: string = "USD",
    locale: string = "en-US"
): string => {
    const num = typeof value === "string" ? Number(value) : value;
    if (!isFinite(num as number)) return String(value);
    return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(
        num as number
    );
};
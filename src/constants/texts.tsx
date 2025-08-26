export const TEXTS_STATS = [
    { title: "Text Sents", value: 1847, people: 1477 },
    { title: "Text Received", value: 1234, people: 636 },
    { title: "Delivery Rate", value: 100 },
    { title: "Opt-Outs", value: 3, people: 3 },
    { title: "Carrier Filtered", value: 8, people: 5 },
    { title: "Other Errors", value: 16, people: 15 },
] as const;

export const TEXTS_DROPDOWN_ITEMS = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                All Time
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                Last 30 Days
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                Last 7 Days
            </a>
        ),
    },
] as const;



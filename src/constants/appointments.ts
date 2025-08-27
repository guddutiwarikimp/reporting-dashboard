export const APPOINTMENTS_DATA = [
    {
        key: '1',
        title: 'Showing for leave of 2470 people',
        people: "Dimple Patel",
        teams: ["Kobu Shawat", "Arthur Morgan", "John Marston"],
        createdBy: "Koshik Patel",
        date: "Dec, 8th 2024, 2:00 PM - 3:00 PM",
        type: "",
        outcome: "",
        contact_lead_source: "buy.ca",
        marketing_source: "Facebook Ads",
    },
    {
        key: '2',
        title: 'Buyer consultation',
        people: "Alex Johnson",
        teams: ["Leslie Knope", "Ron Swanson", "April Ludgate"],
        createdBy: "Chris Traeger",
        date: "Dec, 9th 2024, 11:00 AM - 12:00 PM",
        type: "",
        outcome: "",
        contact_lead_source: "zillow.com",
        marketing_source: "Google Ads",
    },
    {
        key: '3',
        title: 'Listing presentation',
        people: "Priya Sharma",
        teams: ["Michael Scott", "Jim Halpert", "Pam Beesly"],
        createdBy: "Dwight Schrute",
        date: "Dec, 10th 2024, 3:30 PM - 4:30 PM",
        type: "",
        outcome: "",
        contact_lead_source: "realtor.ca",
        marketing_source: "Instagram",
    },
    {
        key: '4',
        title: 'Home inspection walkthrough',
        people: "Ethan Chen",
        teams: ["Stanley Hudson", "Phyllis Vance", "Kevin Malone"],
        createdBy: "Angela Martin",
        date: "Dec, 11th 2024, 9:00 AM - 10:00 AM",
        type: "",
        outcome: "",
        contact_lead_source: "referral",
        marketing_source: "Referral",
    },
    {
        key: '5',
        title: 'Open house prep',
        people: "Maria Garcia",
        teams: ["Rachel Green", "Monica Geller", "Chandler Bing"],
        createdBy: "Ross Geller",
        date: "Dec, 12th 2024, 1:00 PM - 2:00 PM",
        type: "",
        outcome: "",
        contact_lead_source: "trulia.com",
        marketing_source: "Facebook Organic",
    },
    {
        key: '6',
        title: 'Offer review meeting',
        people: "Liam O'Connor",
        teams: ["Phoebe Buffay", "Joey Tribbiani", "Gunther"],
        createdBy: "Chandler Bing",
        date: "Dec, 13th 2024, 4:00 PM - 5:00 PM",
        type: "",
        outcome: "",
        contact_lead_source: "buy.ca",
        marketing_source: "Email Campaign",
    },
    {
        key: '7',
        title: 'Showing tour: downtown condos',
        people: "Sofia Rossi",
        teams: ["Harvey Specter", "Mike Ross", "Donna Paulsen"],
        createdBy: "Louis Litt",
        date: "Dec, 14th 2024, 10:00 AM - 12:00 PM",
        type: "",
        outcome: "",
        contact_lead_source: "homes.com",
        marketing_source: "LinkedIn",
    },
    {
        key: '8',
        title: 'Closing day walkthrough',
        people: "Noah Williams",
        teams: ["Ted Lasso", "Coach Beard", "Sam Obisanya"],
        createdBy: "Rebecca Welton",
        date: "Dec, 15th 2024, 8:30 AM - 9:30 AM",
        type: "",
        outcome: "",
        contact_lead_source: "remax.com",
        marketing_source: "YouTube",
    },
    {
        key: '9',
        title: 'New lead intro call',
        people: "Aisha Khan",
        teams: ["Jon Snow", "Arya Stark", "Sansa Stark"],
        createdBy: "Tyrion Lannister",
        date: "Dec, 16th 2024, 2:15 PM - 2:45 PM",
        type: "",
        outcome: "",
        contact_lead_source: "craigslist",
        marketing_source: "Twitter",
    },
    {
        key: '10',
        title: 'Seller follow-up',
        people: "Gabriel Silva",
        teams: ["Naruto Uzumaki", "Sasuke Uchiha", "Sakura Haruno"],
        createdBy: "Kakashi Hatake",
        date: "Dec, 17th 2024, 5:00 PM - 5:30 PM",
        type: "",
        outcome: "",
        contact_lead_source: "cold-calling",
        marketing_source: "Direct Mail",
    },
] as const;

export const APPOINTMENT_AVATAR_COLORS = [
    '#f97316', '#10b981', '#8b5cf6', '#ef4444',
    '#06b6d4', '#f59e0b', '#84cc16', '#3b82f6'
] as const;


export const APPOINTMENT_DROPDOWN_FILTERS = [
    { label: "All Time" },
    { label: "Everyone" },
    { label: "All Types" },
    { label: "All Outcomes" }
] as const;


export const APPOINTMENT_MOBILE_FILTERS = [
    { key: 1, name: "All Time" },
    { key: 2, name: "Everyone" },
    { key: 3, name: "All Types" },
    { key: 4, name: "All Outcomes" }
] as const;

export const APPOINTMENT_FILTER_DRAWER_OPTIONS = [
    "1 Week",
    "2 Weeks",
    "2 Months"
] as const;
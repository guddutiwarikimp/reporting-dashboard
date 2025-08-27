// Batch Emails Data Structure
export interface BatchEmailData {
  key: string;
  templateName: string;
  createdBy: string;
  created: string;
  status: 'finished' | 'failure';
  recipients: number;
  sent: number;
  opens: number;
  clicks: number;
  unsubscribes: number;
  bounces: number;
}

export interface RecipientData {
  key: string;
  name: string;
  initials: string;
  email: string;
  status: 'delivered' | 'bounced';
  deliveredAt?: string;
  opens: number;
  lastOpen?: string;
  clicks: number;
}

// Mock data for batch emails
export const BATCH_EMAILS_DATA: BatchEmailData[] = [
  {
    key: '1',
    templateName: "Don't miss out Book your Kimp.io demo call to learn more about the Down Payment Boost Program",
    createdBy: "Ven Velnayagam",
    created: "4 hours ago",
    status: "finished",
    recipients: 3,
    sent: 3,
    opens: 2,
    clicks: 0,
    unsubscribes: 0,
    bounces: 1
  },
  {
    key: '2',
    templateName: "Don't miss out Book your Kimp.io demo call to learn more about the Down Payment Boost Program",
    createdBy: "Ven Velnayagam",
    created: "1 day ago",
    status: "finished",
    recipients: 15,
    sent: 15,
    opens: 8,
    clicks: 2,
    unsubscribes: 3,
    bounces: 0
  },
  {
    key: '3',
    templateName: "Don't miss out Book your Kimp.io demo call to learn more about the Down Payment Boost Program",
    createdBy: "Ven Velnayagam",
    created: "2 days ago",
    status: "finished",
    recipients: 12,
    sent: 12,
    opens: 6,
    clicks: 1,
    unsubscribes: 0,
    bounces: 0
  },
  {
    key: '4',
    templateName: "Kimp.io - Down Payment Boost Program",
    createdBy: "Ven Velnayagam",
    created: "5 days ago",
    status: "finished",
    recipients: 95,
    sent: 95,
    opens: 55,
    clicks: 2,
    unsubscribes: 1,
    bounces: 0
  },
  {
    key: '5',
    templateName: "Don't miss out Book your Kimp.io demo call to learn more about the Down Payment Boost Program",
    createdBy: "Ven Velnayagam",
    created: "6 days ago",
    status: "finished",
    recipients: 8,
    sent: 8,
    opens: 4,
    clicks: 0,
    unsubscribes: 0,
    bounces: 0
  },
  {
    key: '6',
    templateName: "Don't miss out Book your Kimp.io demo call to learn more about the Down Payment Boost Program",
    createdBy: "Ven Velnayagam",
    created: "8 days ago",
    status: "finished",
    recipients: 10,
    sent: 10,
    opens: 7,
    clicks: 1,
    unsubscribes: 0,
    bounces: 0
  },
  {
    key: '7',
    templateName: "Don't miss out Book your Kimp.io demo call to learn more about the Down Payment Boost Program",
    createdBy: "Ven Velnayagam",
    created: "10 days ago",
    status: "finished",
    recipients: 6,
    sent: 6,
    opens: 4,
    clicks: 0,
    unsubscribes: 0,
    bounces: 0
  },
  {
    key: '8',
    templateName: "Take Your Next Step Towards Home Ownership with Kimp.io",
    createdBy: "Albi Leka",
    created: "12 days ago",
    status: "failure",
    recipients: 1,
    sent: 0,
    opens: 0,
    clicks: 0,
    unsubscribes: 0,
    bounces: 0
  },
  {
    key: '9',
    templateName: "Don't miss out Book your Kimp.io demo call to learn more about the Down Payment Boost Program",
    createdBy: "Ven Velnayagam",
    created: "14 days ago",
    status: "finished",
    recipients: 5,
    sent: 5,
    opens: 4,
    clicks: 1,
    unsubscribes: 0,
    bounces: 0
  }
];

// Mock data for recipients - in real app this would come from API based on templateId
export const RECIPIENTS_DATA: RecipientData[] = [
  {
    key: '1',
    name: 'Natalie Zoebelein',
    initials: 'NZ',
    email: 'jaljira@yandex.com',
    status: 'delivered',
    deliveredAt: 'yesterday at 11:17 pm',
    opens: 0,
    clicks: 0
  },
  {
    key: '2',
    name: 'Tes Wng',
    initials: 'TW',
    email: 'uj_001@yahoo.com',
    status: 'bounced',
    opens: 0,
    clicks: 0
  },
  {
    key: '3',
    name: 'Ana Roldan',
    initials: 'AR',
    email: 'amroldan94@gmail.com',
    status: 'delivered',
    deliveredAt: 'yesterday at 11:17 pm',
    opens: 1,
    lastOpen: '4 hours ago',
    clicks: 0
  },
  {
    key: '4',
    name: 'Kenna Ross',
    initials: 'KR',
    email: 'rossmakenna19@gmail.com',
    status: 'delivered',
    deliveredAt: 'yesterday at 11:17 pm',
    opens: 0,
    clicks: 0
  },
  {
    key: '5',
    name: 'Tony Lapointe',
    initials: 'TL',
    email: 'tony@tonylapointe.com',
    status: 'delivered',
    deliveredAt: 'yesterday at 11:17 pm',
    opens: 0,
    clicks: 0
  },
  {
    key: '6',
    name: 'Saravanan Kannaiyan',
    initials: 'SK',
    email: 'saranktest@gmail.com',
    status: 'delivered',
    deliveredAt: 'yesterday at 11:17 pm',
    opens: 0,
    clicks: 0
  }
];

// Helper function to get recipients data for a specific template
export const getRecipientsData = (templateId: string): RecipientData[] => {
  // In real app, this would fetch from API based on templateId
  return RECIPIENTS_DATA;
};

// Helper function to get batch email data by ID
export const getBatchEmailData = (templateId: string): BatchEmailData | undefined => {
  return BATCH_EMAILS_DATA.find(email => email.key === templateId);
};

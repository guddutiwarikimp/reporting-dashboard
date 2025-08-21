# Reporting Components

This directory contains the reporting components for the application, including charts, controls, and data visualization tools.

## Dynamic Data Generation

The reporting system now supports dynamic data generation based on the selected query. When a user changes the query in the QuerySelector, the chart data automatically updates to reflect the new query context.

### How It Works

1. **Query Selection**: Users can select from predefined queries in the QuerySelector component
2. **Dynamic Metrics**: Based on the selected query, the system automatically selects appropriate metrics
3. **Query-Specific Data**: Each query generates different data patterns that make sense for that specific business question

### Available Queries and Their Data Patterns

#### 1. "what team member is getting the most leads to respond"
- **Primary Metric**: New Leads
- **Secondary Metric**: % of Leads Responding
- **Data Pattern**: Team member comparison showing individual performance
- **Chart Type**: Bar chart comparing team members

#### 2. "How quickly we follow up on leads"
- **Primary Metric**: New Leads
- **Secondary Metric**: Calls
- **Data Pattern**: Improving follow-up speed over time
- **Chart Type**: Line chart showing improvement trend

#### 3. "How many times we try to contact each lead"
- **Primary Metric**: Initially Assigned Leads
- **Secondary Metric**: Calls
- **Data Pattern**: Decreasing contact attempts as efficiency improves
- **Chart Type**: Line chart showing efficiency improvement

#### 4. "which team member has the best response time"
- **Primary Metric**: New Leads
- **Secondary Metric**: Emails
- **Data Pattern**: Response time improvements over time
- **Chart Type**: Line chart showing response time trends

#### 5. "Total lead count and total agent activity"
- **Primary Metric**: New Leads
- **Secondary Metric**: Tasks Completed
- **Data Pattern**: Steady growth in both metrics
- **Chart Type**: Dual-axis line chart showing growth

#### 6. "How many leads have we not acted on"
- **Primary Metric**: New Leads
- **Secondary Metric**: Initially Assigned Leads
- **Data Pattern**: Decreasing unacted leads as efficiency improves
- **Chart Type**: Line chart showing improvement

### Data Generation Functions

The system includes specialized data generators for each query type:

- `generateTeamMemberData()`: Creates realistic team performance variations
- `generateFollowUpData()`: Shows improvement in follow-up speed
- `generateContactAttemptsData()`: Demonstrates efficiency improvements
- `generateResponseTimeData()`: Shows response time improvements
- `generateTotalActivityData()`: Shows steady growth patterns
- `generateUnactedLeadsData()`: Shows decreasing unacted leads

### Future API Integration

The current hardcoded data structure is designed to be easily replaceable with API calls:

1. **Query Parameter**: The `selectedQuery` parameter is already passed through the system
2. **Data Structure**: The data structure remains consistent regardless of data source
3. **API Endpoints**: Future API calls can use the same query parameter to fetch relevant data
4. **Seamless Transition**: Switching from hardcoded to API data requires minimal code changes

### Usage Example

```tsx
// The useChartState hook automatically selects metrics based on the query
const { selectedMetric, selectedSecondMetric } = useChartState(selectedQuery);

// The chart data generator creates query-specific data
const chartData = generateChartData(
  selectedMetric,
  selectedSecondMetric,
  timePeriod,
  compareToPrevious,
  selectedQuery // This drives the data generation
);
```

### Benefits

1. **Contextual Data**: Each query shows relevant metrics and data patterns
2. **User Experience**: Users see data that directly answers their question
3. **Maintainability**: Easy to add new queries and data patterns
4. **API Ready**: Structure prepared for future API integration
5. **Realistic Patterns**: Data shows realistic business scenarios and trends

## Components

### Core Layout Components
- **ReportingLayout**: Main layout wrapper for reporting pages
- **ReportingTabs**: Navigation tabs for different reporting sections
- **QuerySelector**: Dropdown for selecting different query types
- **RefreshSection**: Refresh button and last refreshed timestamp

### Chart Components
- **ChartControls**: Controls for chart configuration including:
  - Metric selection (primary and secondary)
  - Time period selection (daily, weekly, monthly, yearly)
  - Comparison toggle for previous period data
- **AgentActivityChart**: ECharts component for displaying agent activity data

## Usage

### ChartControls
```tsx
import { ChartControls } from "@/components/reporting";

<ChartControls
  selectedMetric="New Leads"
  selectedSecondMetric="Calls"
  timePeriod="monthly"
  compareToPrevious={false}
  onMetricChange={setSelectedMetric}
  onSecondMetricChange={setSecondMetric}
  onTimePeriodChange={setTimePeriod}
  onComparisonToggle={setComparison}
/>
```

### AgentActivityChart
```tsx
import { AgentActivityChart } from "@/components/reporting";

<AgentActivityChart
  selectedMetric="New Leads"
  selectedSecondMetric="Calls"
  timePeriod="monthly"
  compareToPrevious={false}
  theme="light"
/>
```

## State Management

The chart state is managed through the `useChartState` hook:

```tsx
import { useChartState } from "@/hooks";

const {
  timePeriod,
  setTimePeriod,
  compareToPrevious,
  setCompareToPrevious,
  selectedMetric,
  setSelectedMetric,
  selectedSecondMetric,
  setSelectedSecondMetric,
} = useChartState();
```

## Constants

Chart configuration constants are defined in `@/constants/agentActivity`:

- `AGENT_ACTIVITY_METRICS`: Available primary metrics
- `AGENT_ACTIVITY_SECOND_METRICS`: Available secondary metrics
- `TIME_PERIODS`: Available time periods
- `METRIC_BASE_VALUES`: Base values for data generation
- `CHART_COLORS`: Chart color scheme
- `COMPARISON_PERIOD_LABELS`: Labels for comparison periods

## Utilities

Chart data generation and options are handled by utility functions in `@/utils`:

- `generateChartData`: Creates chart data based on selected parameters
- `generateChartOptions`: Generates ECharts configuration options

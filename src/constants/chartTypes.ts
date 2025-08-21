import { ChartType } from "../types/chart";

export const CHART_TYPES: ChartType[] = [
  { key: "basicLine", label: "Basic Line Chart" },
  { key: "basicBar", label: "Basic Bar Chart" },
  { key: "stackedLine", label: "Stacked Line Chart" },
  { key: "stackedBar", label: "Stacked Bar Chart" },
  { key: "stackedArea", label: "Stacked Area Chart" },
  { key: "mixedLineBar", label: "Mixed Line and Bar Chart" },
];

export const DEFAULT_CHART_TYPE = CHART_TYPES[0].key;

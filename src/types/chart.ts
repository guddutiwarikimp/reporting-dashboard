export interface ChartType {
  key: string;
  label: string;
}

export interface ChartData {
  [key: string]: any;
}

export interface ChartOption {
  backgroundColor?: string;
  textStyle?: {
    color?: string;
    [key: string]: any;
  };
  xAxis?: any;
  yAxis?: any;
  legend?: any;
  [key: string]: any;
}

export type Theme = "dark" | "light";

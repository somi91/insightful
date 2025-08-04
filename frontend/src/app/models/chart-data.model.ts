export interface ChartData {
  labels: string[];
  datasets: ChartDatasets[];
}
export interface ChartDatasets {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderWidth: number;
}
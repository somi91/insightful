import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { Chart } from "chart.js/auto";
import { SearchItem } from 'src/app/models/search.model';
import { ChartData } from 'src/app/models/chart-data.model';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public chart: Chart | undefined;
  constructor(private api: ApiService) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.getData();
  }

  async getData() {
    const data = await this.api.getAll();
    console.log("getData", data);
    const mapData = this.mapChartData(data);
    this.initChart(mapData);
  }

  private initChart(data: ChartData) {
    this.chart = new Chart("canvas", {
      type: "bar",
      data: data,
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right'
          }
        }
      }
    });
  }

  private mapChartData(data: SearchItem[]): ChartData {
    const browserCounts: { [key: string]: number } = {};

    data.forEach(item => {
      browserCounts[item.browser] = (browserCounts[item.browser] || 0) + 1;
    });

    return {
      labels: Object.keys(browserCounts),
      datasets: [
        {
          label: 'Browser Error Count',
          data: Object.values(browserCounts),
          backgroundColor: ['#407ab3', '#62a87c', '#e66e6e', '#f2c14e', '#6c5ce7'],
          borderWidth: 1
        }
      ]
    };
  }

}

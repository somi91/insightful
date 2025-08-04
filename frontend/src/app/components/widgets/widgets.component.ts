import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  standalone: true,
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  imports: [NgIf],
})
export class WidgetsComponent {
  @Input() events: any[] = [];

  public chart: Chart | undefined;
  private chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  ngOnChanges(): void {
    const count: Record<string, number> = {};
    this.events.forEach(e => {
      count[e.errorMessage] = (count[e.errorMessage] || 0) + 1;
    });

    const sorted = Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    this.chartData.labels = sorted.map(([msg]) => msg);
    this.chartData.datasets = [
      {
        label: 'Top Error Messages',
        data: sorted.map(([_, val]) => val),
        backgroundColor: sorted.map(() => this.getRandomColor())
      }
    ];
    this.createChart()

    console.log(this.chartData);
  }

  private createChart() {
    if(this.chartData) {
      this.chart?.destroy();
      this.chart = new Chart("canvas", {
        type: "bar",
        data: this.chartData,
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'right'
            }
          }
        }
      });
    } else {
      this.chart = undefined;
    }
  }

  // private mapChartData(data: SearchItem[]): ChartData {
  //   const browserCounts: { [key: string]: number } = {};

  //   data.forEach(item => {
  //     browserCounts[item.browser] = (browserCounts[item.browser] || 0) + 1;
  //   });

  //   return {
  //     labels: Object.keys(browserCounts),
  //     datasets: [
  //       {
  //         label: 'Browser Error Count',
  //         data: Object.values(browserCounts),
  //         backgroundColor: ['#407ab3', '#62a87c', '#e66e6e', '#f2c14e', '#6c5ce7'],
  //         borderWidth: 1
  //       }
  //     ]
  //   };
  // }
  private getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}

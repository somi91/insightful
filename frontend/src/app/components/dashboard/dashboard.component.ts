import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Chart } from "chart.js/auto";
import { SearchItem } from 'src/app/models/search.model';
import { ChartData } from 'src/app/models/chart-data.model';
import { MatInputModule } from '@angular/material/input';
import { FiltersComponent } from '../filters/filters.component';
import { ErrorsTableComponent } from '../errors-table/errors-table.component';
import { WidgetsComponent } from '../widgets/widgets.component';
import { JsonPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    MatInputModule, FiltersComponent, ErrorsTableComponent, WidgetsComponent,
    JsonPipe
  ]
})
export class DashboardComponent {

  // public chart: Chart | undefined;
  // constructor(private api: ApiService) {}

  // ngOnInit() {
  //   console.log('ngOnInit');
  //   this.getData();
  // }

  // async getData() {
  //   const data = await this.api.getAll();
  //   console.log("getData", data);
  //   const mapData = this.mapChartData(data);
  //   this.initChart(mapData);
  // }

  // private initChart(data: ChartData) {
  //   this.chart = new Chart("canvas", {
  //     type: "bar",
  //     data: data,
  //     options: {
  //       plugins: {
  //         legend: {
  //           display: true,
  //           position: 'right'
  //         }
  //       }
  //     }
  //   });
  // }

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
  filters: any = {};
  events: any[] = [];
  stats: any;

  constructor(private dataService: ApiService) {}

  ngOnInit(): void {
    this.fetchAll();
  }

  applyFilters(filters: any) {
    this.filters = this.cleanObject(filters);
    console.log("applyFilters", this.filters);
    this.fetchAll();
  }
  private cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
    const result: Partial<T> = {};

    for (const key in obj) {
      const value = obj[key];
      if (value !== '' && value !== null && value !== undefined) {
        result[key] = value;
      }
    }

    return result;
  }

  private fetchAll() {
    this.dataService.getEvents(this.filters).pipe(
      map(data => {
        return data.map(res => {
          const mapData = {
            ...res._source,
            id: res._id,
            timestamp: (new Date(res._source.timestamp)).getTime()
          };
          return mapData;
          // return {...res, timestamp: (new Date(res._source.timestamp)).getTime()}
        }) 
      })
    )
    .subscribe(res => this.events = res);
    this.dataService.getStats().subscribe(res => this.stats = res);
  }

}

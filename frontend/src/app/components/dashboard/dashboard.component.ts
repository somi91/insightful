import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private api: ApiService) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.getData();
  }

  async getData() {
    const data = await this.api.getAll();
    console.log("getData", data);
  }
}

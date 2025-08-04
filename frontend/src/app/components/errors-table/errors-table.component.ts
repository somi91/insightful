import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';

@Component({
  standalone: true,
  selector: 'app-errors-table',
  templateUrl: './errors-table.component.html',
  styleUrls: ['./errors-table.component.scss'],
  imports: [OrderByPipe, NgFor]
})
export class ErrorsTableComponent {

  @Input() events: any[] = [];
}

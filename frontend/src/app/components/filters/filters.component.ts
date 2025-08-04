import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  imports: [ReactiveFormsModule]
})
export class FiltersComponent {
  @Output() filterChange = new EventEmitter<any>();

  form = this.fb.group({
    dateFrom: [''],
    dateTo: [''],
    userId: [''],
    browser: [''],
    keyword: ['']
  });

  constructor(private fb: FormBuilder) {}

  apply() {
    console.log(this.form)
    this.filterChange.emit(this.form.value);
  }

}

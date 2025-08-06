import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SearchItem } from 'src/app/models/filter-search.model';

@Component({
  standalone: true,
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'rs'}, 
  ],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, 
    NgIf, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
})
export class FiltersComponent {
  @Output() filterChange = new EventEmitter<SearchItem>();

  form = this.fb.group({
    timestamp: [''],
    url: [''],
    userId: [''],
    browser: [''],
    errorMessage: ['']
  });

  constructor(private fb: FormBuilder) {}

  apply() {
    console.log(this.form)
    let { timestamp, ...withoutTimestamp } = this.form.value;
    console.log('timestampStr', timestamp);
    let timestampNum;
    if(timestamp) {
      timestampNum = (new Date(timestamp)).getTime();
    }
    let res: SearchItem = timestamp ? {...withoutTimestamp, timestamp: timestampNum} : withoutTimestamp;

    this.filterChange.emit(res);
  }
  resetValue(field: string) {
    this.form.get(field)?.setValue('');
  }

}

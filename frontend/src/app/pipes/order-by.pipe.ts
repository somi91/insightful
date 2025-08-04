import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  standalone: true
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], field: string, descending: boolean = false): any[] {
    if (!Array.isArray(array) || !field) return array;

    const sorted = [...array].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (aValue < bValue) return descending ? 1 : -1;
      if (aValue > bValue) return descending ? -1 : 1;
      return 0;
    });

    return sorted;
  }
}

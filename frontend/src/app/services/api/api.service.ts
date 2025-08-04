import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, take } from 'rxjs';
import { SearchItem } from 'src/app/models/search.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getAll(): Promise<SearchItem[]> {
    return lastValueFrom(this.http.get<SearchItem[]>(`${this.apiUrl}/events/getAll`, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
      }
    }));
  }
}

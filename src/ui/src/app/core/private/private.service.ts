import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Device } from '../../../../../../libs/data-model/src/models';
import { IResponse } from '../../../../../../libs/api-interfaces/src';

@Injectable({
  providedIn: 'root',
})
export class PrivateService {
  private apiUrl = '/api/devices';

  constructor(private http: HttpClient) {}

  getDevices(accountId: string): Observable<Device[]> {
    const url = `${this.apiUrl}/${accountId}`;
    return this.http.get<IResponse<Device[]>>(url).pipe(
      map(({ data }: { data: Device[] }) => {
        return data;
      }),
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Device } from '../../../../../../libs/data-model/src/models';
import { IResponse } from '../../../../../../libs/api-interfaces/src';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class PrivateService {
  devices$: BehaviorSubject<Device[]> = new BehaviorSubject<Device[]>([]);

  private apiUrl = `${environment.baseUrl}/devices`;

  constructor(private http: HttpClient) {}

  getDevices(accountId: string): Observable<Device[]> {
    const url = `${this.apiUrl}/${accountId}`;
    return this.http.get<IResponse<Device[]>>(url).pipe(
      map(({ data }: { data: Device[] }) => {
        this.devices$.next(data);
        return data;
      }),
    );
  }

  deleteDevice(accountId: string, id: string): Observable<void> {
    const url = `${this.apiUrl}/${accountId}/${id}`;
    return this.http.delete<void>(url).pipe(
      map(() => {
        const updatedDevices = this.devices$.value.filter((device) => device.id !== id);
        this.devices$.next(updatedDevices);
      }),
    );
  }
}

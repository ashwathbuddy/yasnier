import { Component, OnInit } from '@angular/core';
import { Device } from '../../../../../../libs/data-model/src/models';
import { PrivateService } from 'src/app/core/private/private.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './private.component.html',
})
export class PrivateComponent implements OnInit {
  devices: Device[] = [];
  accountId = '';

  constructor(private privateService: PrivateService, private authService: AuthService) {
    this.authService['userSubject'].subscribe((data) => {
      this.accountId = data?.id as string;
    });
  }

  ngOnInit(): void {
    this.privateService.devices$.subscribe((devices) => {
      this.devices = devices;
      console.log('Devices:', this.devices);
    });

    this.privateService.getDevices(this.accountId).subscribe();
  }

  deleteDevice(accountId: string, id: string): void {
    this.privateService.deleteDevice(accountId, id).subscribe();
  }
}

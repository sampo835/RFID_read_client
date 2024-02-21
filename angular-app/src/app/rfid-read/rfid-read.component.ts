import { Component, OnInit, OnDestroy } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-rfid-read',
  templateUrl: './rfid-read.component.html',
  styleUrls: ['./rfid-read.component.scss'],
})
export class RfidReadComponent implements OnInit, OnDestroy {
  rfidData: string = '';

  constructor() {}

  ngOnInit(): void {
    // Listen for RFID data from the main process
    ipcRenderer.on('rfid-data', (event, data) => {
      this.rfidData = data;
    });

    // Request RFID data from the main process (optional)
    ipcRenderer.send('request-rfid-data');
  }

  ngOnDestroy(): void {
    // Cleanup on component destroy
    ipcRenderer.removeAllListeners('rfid-data');
  }
}

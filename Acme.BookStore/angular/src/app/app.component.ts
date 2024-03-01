import { Component } from '@angular/core';
import { SignalrService } from '@proxy/signalr.service';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent {
  constructor(
    private signalrService: SignalrService,
  ) {
    window.addEventListener("beforeunload", async (e) => {
      if (this.signalrService.isConnected()) {
        await this.signalrService.stopAsync();
      }
    });
  }
}

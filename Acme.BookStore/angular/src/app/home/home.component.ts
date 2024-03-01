import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { SignalrService } from '@proxy/signalr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  private getPushUserSub: Subscription;

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(
    private authService: AuthService,
    private signalrService: SignalrService,
    ) {}

  ngOnInit() {
    this.signalrService.startAsync().then(() => {
      this.signalrService.getCustomerAccess();
    });
    this.signalRSubscriber();
  }

  signalRSubscriber() {
    this.getPushUserSub = this.signalrService.onGetBravoPushUsers
    .subscribe(bravoPushUsers => {
      let a =1;
    });
  }

  ngOnDestroy() {
    this.getPushUserSub.unsubscribe();
  }

  login() {
    this.authService.navigateToLogin();
  }
}

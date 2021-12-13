import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthentificated : boolean;
  private authListenerSubs: Subscription;

  constructor(private authService : UserService) { }
//sa3at yod5el ba3do 3malt ana console.log fhem ro7o .. hhhh 
  ngOnInit(): void {
    this.userIsAuthentificated = this.authService.getIsAuth();
    console.log("user",this.userIsAuthentificated);
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthentificated => {
      this.userIsAuthentificated = isAuthentificated;
    });
  }

  onLogout() {
    this.authService.logout();
    this.userIsAuthentificated = false;
  }

  ngOnDestroy(): void {

  }

}

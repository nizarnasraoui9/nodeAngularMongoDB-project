import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (private authService: UserService) {}
  ngOnInit() {
    this.authService.autoAuthUser();
  }
  title = 'Prox-project';
}

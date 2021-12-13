import { Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from '../components/login/login.component';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticated = false;
  private token: string ;
  private tokenTimer: any;
  private userId: string;
  private userfName: string;
  private userlName: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService ) { }
  httpOption = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json',
      'Access-Control-Allow-Methods':'POST'
    })
  }
  getToken() {
    return this.token;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }
  getUserlName() {
    return localStorage.getItem('userlName');
  }
  getUserfName() {
    return localStorage.getItem('userfName');
  }

  Login(email: string, password: string){
    var postData = { email:email, password:password };
    console.log(email);
    var posted =   this.http
        .post<{token: string, expiresIn: number, userId: string, userfName: string , userlName: string}>(
          'http://localhost:3300/login',
          postData,
        this.httpOption
      );
        posted.subscribe(response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.userfName = response.userfName;
            this.userlName = response.userlName;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId, this.userfName, this.userlName);
            this.toastr.success('Logged in!');
            this.router.navigate(["/"]);
            } 
        },error=> {
          this.toastr.error('email or password are wrong retry please!');
      });         
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(["/"]);
    
  }
  private setAuthTimer (duration: number) {
    console.log("setting timer:" + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    } , duration * 1000);
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string, userfName: string, userlName:string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId' , userId)
    localStorage.setItem('userfName' , userfName)
    localStorage.setItem('userlName' , userlName)
  }
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId")
    localStorage.removeItem("userfName")
    localStorage.removeItem("userlName")
  }
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    this.userfName = localStorage.getItem("userfName");
    this.userlName = localStorage.getItem("userlName");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userfName: this.userfName,
      userlName: this.userlName
    }
  }
}

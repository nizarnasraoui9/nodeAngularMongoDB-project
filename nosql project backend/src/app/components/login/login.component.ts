import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userEmails:any ;
password:any ;
primaryEmail:any ;
success:any ;

  constructor(
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router,
              public userService: UserService) { }

  ngOnInit(){ this.emailValidation() }
  
  emailValidation(){
  this.userEmails = new FormGroup({
      primaryEmail: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl('',[
          Validators.required ])
      });
   }


  get primEmail(){
    return this.userEmails.get('primaryEmail');
  };
  get passwords(){
     return this.userEmails.get('password');
 };

  onlogin(email: string, password: string){
    this.userService.Login(email, password);

  // var postData = { email:email, password:password }
  // console.log(postData);
  // var posted =   this.http
  //     .post<any>(
  //       'http://localhost:3300/login',
  //       postData,
  //     this.httpOption
  //   );
  //   // posted.subscribe(
  //     // responceData => {
  //     //   this.router.navigate(['/home']);
  //     //
  //     //  },error=>console.log(error)

  //     posted.subscribe(
  //           result => {
  //             // Handle result
  //       this.router.navigate(['/home']);
  //           },
  //           error => {
  //              if(error.status==404){
  //               alert("User not found")

  //             }
  //           }

  //    );
  }

}

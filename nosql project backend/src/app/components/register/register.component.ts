import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../../confirmed.validator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regValidation: FormGroup;
  firstName: any ;
  lastName: any ;
  email: any ;
  userName: any ;
  password: any ;
  confirmPassword: any ;

  constructor(
              private http: HttpClient ,
              private FormBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService ) { }

  ngOnInit(): void { this.registerValidation() }
  httpOption = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json',
      'Access-Control-Allow-Methods':'POST'
    })
  }


  registerValidation(){
      this.regValidation = this.FormBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            userName: ['', [Validators.required, Validators.maxLength(8)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            //acceptTerms: [false, Validators.requiredTrue]
        }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    })
   }

   get f() { return this.regValidation.controls ; }



  onRegister(firstname: string, lastname:string, email: string, username: string, password: string, pole:string){
  var postData = { firstname:firstname, lastname:lastname, email:email, username:username, password:password, pole:pole }
  var posted =   this.http
      .post<any>(
        'http://localhost:3300/register',
        postData,
      this.httpOption
    );
    posted.subscribe(responceData => {
        console.log(responceData);
        this.toastr.success('Account successfully created!');
        this.router.navigate(['/login']);

      },error=>console.log(error));
      this.registerValidation();
  }



}

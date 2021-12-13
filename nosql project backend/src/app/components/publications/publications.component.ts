import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { PublicationService } from '../../service/publication.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from "../../service/user.service";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';


@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit, OnDestroy{
  pubValidation: FormGroup;
  pub:any;
  comm:boolean=false;
  comment:any;
  title:any;
  content:any;
  image:any;
  number: number=0;
  imagePreview:string;
  userIsAuthenticated = false;
  userId: string;
  userfName: string;
  userlName: string;
  uploadedFiles: Array < File > ;
  private authStatusSub: Subscription;
  constructor(
              private http: HttpClient, 
              private publicationService: PublicationService,
              private FormBuilder: FormBuilder,
              private toastr: ToastrService,
              private authService: UserService,
              private router: Router) {
   }

  ngOnInit() {
    this.getData();
    this.getComment();
    this.PublicationValidation();
    this.userId = this.authService.getUserId();
    this.userfName = this.authService.getUserfName();
    this.userlName = this.authService.getUserlName();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.userfName = this.authService.getUserfName();
        this.userlName = this.authService.getUserlName();
      });
  }
  
  httpOption = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json',
      'Access-Control-Allow-Methods':'POST'
    })
  }
  PublicationValidation(){
    this.pubValidation = this.FormBuilder.group({
          title: ['', Validators.required],
          content: ['', Validators.required],  
          image: (['',{Validators: [Validators.required],
                      }]) , 
      })
 };
 get f() { return this.pubValidation.controls ; }


 onImagePicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  console.log(file);
  this.pubValidation.patchValue({image: file});
  this.f.image.updateValueAndValidity();
  const reader = new FileReader(); 
  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(file);
 }

  addlike(){
    this.number ++;
  }

  postComment(com, id, fname, lname){
    this.publicationService.CreateAndStoreComments(com, id, fname, lname);
  }

  show(){
    if (this.comm==false) {
        this.comm=true;
    } else {
      this.comm=false;
    }
  } 
  deletePost(p){
    this.publicationService.deletePub(p._id).subscribe(data => {
      console.log(data);
      this.toastr.success('Successfuly deleted!');
      window.location.reload();
      
    })
  }
  fileChange(element) {
    console.log(element)
    this.uploadedFiles = element.target.files;
    const file = (element.target as HTMLInputElement).files[0];
    console.log(file);
    this.pubValidation.patchValue({image: file});
    this.f.image.updateValueAndValidity();
    const reader = new FileReader(); 
    reader.onload = () => {
      this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(file);
};
  upload(tt, cc) {
    console.log(tt);
    console.log(cc);
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
        console.log(formData);
    }
    formData.append("title", tt);
    formData.append("publication", cc);
    this.http.post('http://localhost:3300/api/upload', formData)
    .subscribe((response) => {
        console.log('response received is ', response);
        this.toastr.success('New post!');
    })
    window.location.reload();
    this.getData();
  }

  // getVal(title, publi) {
  //   this.publicationService.CreateAndStorePubs(title, publi,this.pubValidation.value.image);
  //   this.getData()
  //     }

  getData() {
        this.publicationService.getPub().subscribe(data => {
          console.log(data);
          this.pub=data;
        })
      }

  getComment() {
    this.publicationService.getCom().subscribe(data => {
        console.log(data);
        this.comment=data;
      })
    }

    ngOnDestroy(){
      this.authStatusSub.unsubscribe();
    }

  }

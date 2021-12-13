import { Component,OnDestroy, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/service/publication.service';
import { UserService } from 'src/app/service/user.service';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  pub: any;
  userIsAuthenticated = false;
  userId: string;
  userfName: string;
  userlName: string;
  private authStatusSub: Subscription;
  comm:boolean=false;


  constructor(private publicationService: PublicationService,
             private authService: UserService,
             private router: Router) { }

  ngOnInit(): void {
    this.getData();
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
        console.log(this.userfName);

      });
  }
  show(){
    if (this.comm==false) {
        this.comm=true;
    } else {
      this.comm=false;
    }
  } 

  getData() {
    this.publicationService.getPub().subscribe(data => {
      console.log(data);
      this.pub=data;
    })
  }
  postComment(com, id, fname, lname){
    this.publicationService.CreateAndStoreComments(com, id, fname, lname);
  }

  deletePost(p){
    this.publicationService.deletePub(p._id).subscribe(data => {
      console.log(data);
      this.router.navigate(["/publications"]);
    })
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}

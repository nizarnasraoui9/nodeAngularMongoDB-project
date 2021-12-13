import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
aff:any;
hotTun:any;
hotFr:any;
hotMor:any;
hotAlg:any;
hotTurq:any;


  constructor() { }

  ngOnInit(): void {
  }
city(e){
   console.log("eeee",e.currentTarget.value);
    this.aff=e.currentTarget.value

 }
 hotelTun(e){
    console.log("eel",e.currentTarget.value);
     this.hotTun=e.currentTarget.value
  }
hotelFr(e){
     console.log("eel",e.currentTarget.value);
      this.hotFr=e.currentTarget.value
   }
hotelMor(e){
      console.log("eel",e.currentTarget.value);
       this.hotMor=e.currentTarget.value
    }
hotelAlg(e){
       console.log("eel",e.currentTarget.value);
        this.hotAlg=e.currentTarget.value
     }
hotelTurq(e){
        console.log("eel",e.currentTarget.value);
         this.hotTurq=e.currentTarget.value
      }



}

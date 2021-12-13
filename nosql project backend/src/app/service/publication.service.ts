import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  com: any;

  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json',
      'Access-Control-Allow-Methods':'POST'
    })
  }

// CreateAndStorePubs(title:string, publication: string, image: File) {
//   console.log(arguments)
//   var posted =   this.http
//       .post<any>(
//           'http://localhost:3300/publications',
//           {title: title, publication: publication},
       
//       );
//       posted.subscribe(responceData => {
//           console.log(responceData);
//         },error=>console.log(error));
        
// }
deletePub(id: string){
  return this.http.
    delete<any>('http://localhost:3300/publications'+'/'+id)
  }

  getPub(){ 
  return  this.http.
      get<any>('http://localhost:3300/publications')
  }

  getCom(){
  return  this.http.
      get<any>('http://localhost:3300/comments')
  }




  currentCom="";
  CreateAndStoreComments(comment: string, id: string, fname: string, lname: string) {
    console.log(comment)
    this.currentCom=comment
      var postData = { comment:comment, id:id, fname:fname, lname:lname }
      var posted =   this.http
          .post<any>(
            'http://localhost:3300/comments',
              postData,
                this.httpOption
        );
        posted.subscribe(responceData => {
            console.log(responceData);
          },error=>console.log(error));
          window.location.reload();
      }
}

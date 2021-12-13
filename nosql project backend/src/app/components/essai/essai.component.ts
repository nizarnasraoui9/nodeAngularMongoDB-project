import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-essai',
  templateUrl: './essai.component.html',
  styleUrls: ['./essai.component.css']
})
export class EssaiComponent implements OnInit {
  uploadedFiles: Array < File > ;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  fileChange(element) {
    console.log(element)
    this.uploadedFiles = element.target.files;
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
        this.toastr.success('File successfully uploaded!');
    })
  }

}

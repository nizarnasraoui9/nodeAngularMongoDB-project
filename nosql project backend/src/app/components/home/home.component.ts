import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../service/publication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pubs: any;

  constructor(private publicationService: PublicationService,) { }

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    this.publicationService.getPub().subscribe(data => {
      console.log(data);
      this.pubs = data.slice( -3 );
    })
  }

}

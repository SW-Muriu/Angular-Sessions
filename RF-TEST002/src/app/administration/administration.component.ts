import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit{
  router: any;
  ngOnInit(): void {
    
  }

  onHome(): void {
    console.log('../home/home.component');
    /////after successful login
    this.router.navigate(['../home/home.component'], {skipLocationChange: false})
  
  }

}

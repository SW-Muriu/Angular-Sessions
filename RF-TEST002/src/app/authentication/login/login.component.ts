import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy
{
  constructor(
    private router: Router
  ){

  }
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    
  }
  onSubmit() {
    console.log('/profile');
    /////after successful login
    this.router.navigate(['/administration'], {skipLocationChange: false})
  
  }
    title = 'RF-TEST002';
}

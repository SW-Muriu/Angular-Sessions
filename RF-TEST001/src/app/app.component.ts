import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

constructor(
  private router: Router,
  private fb: FormBuilder) { }
ngOnInit(): void {

 
}
loginForm: FormGroup = this.fb.group({
  firstName : [''],
  lastName: ['']

})
onSubmit() {
  console.log('/profile');
  
  // Perform form validation and processing here

  // Navigate to the ResultsComponent
  this.router.navigate(['profile']);
}


}



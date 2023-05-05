import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { HttpParams } from "@angular/common/http";
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      // this.router.navigate(["/dashboard/main"]);
      const params = new HttpParams()
        .set("emailaddress", this.authForm.value);

      this.authService.forgotPassword({ emailaddress: this.authForm.value.email }).subscribe(res => {
        console.log(res)

      }, err => {
        console.log(err)
        //this.error = "Invalid Credentials!" ;
        // this.error = err;
        // console.log(err);
        // this.submitted = false;
        // this.loading = false;
      })
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      console.log(this.authForm.value);
      this.authService.login(this.authForm.value).subscribe(res => {
        this.tokenStorage.saveToken(res.accessToken);
        this.tokenStorage.saveUser(res);

        console.log("Res = ", res)

        const role = res.roles[0];

        if (role == Role.Admin || role == Role.Admin) {
          this.router.navigate(['/admin/dashboard'])
        } else if (role == Role.Admin || role == Role.User) {
          this.router.navigate(['/user/dashboard'])
        } else if (role == Role.Admin || role == Role.Technical) {
          this.router.navigate(['/technical-evaluator/dashboard'])
        } else if (role == Role.Admin || role == Role.Financial) {
          this.router.navigate(['/financial-evaluator/dashboard'])
        } else if (role == Role.Admin || role == Role.Desk) {
          this.router.navigate(['/desk-evaluator/dashboard'])
        } else if (role == Role.Admin || role == Role.HOD) {
          this.router.navigate(['/departmental-users/dashboard'])
        } else if (role == Role.Admin || role == Role.ProcAdmin) {
          this.router.navigate(['/procurement-admin/dashboard'])
        } else {
          this.error = "Invalid Login";
        }



        // this.router.navigate(['/admin/dashboard'])

        // if(role == Role.Admin){
        //   this.router.navigate(['/admin/dashboard'])
        // }else if( role == Role.User){
        //   this.router.navigate(['/user/dashboard'])
        // }
        // else {
        //   this.error = "Invalid Login";
        // }
        // this.loading = false;
        // else if( role == Role.Supervisor){
        //   this.router.navigate(['/supervisor/dashboard'])
        // }else if( role == Role.Executive){
        //   this.router.navigate(['/executive/dashboard'])


      }, err => {
        console.log(err)
        //this.error = "Invalid Credentials!" ;
        this.error = err;
        console.log(err);
        this.submitted = false;
        this.loading = false;
      })
    }
  }
}

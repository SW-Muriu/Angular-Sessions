import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { SupplierAuthService } from "src/app/suppliers/data/services/supplier-auth.service";
import { Role } from "src/app/suppliers/data/models/role";

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
    private suppAuthService: SupplierAuthService,
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
      this.suppAuthService.login(this.authForm.value).subscribe(res => {
        console.log("Res: ", res)
        this.tokenStorage.saveToken(res.accessToken);
        this.tokenStorage.saveUser(res);

        const role = res.roles[0];

        if (role == Role.Supplier || role == Role.Supplier) {
          this.router.navigate(['/suppliers/dashboard'])
        } else {
          this.error = "Invalid Login";
        }


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

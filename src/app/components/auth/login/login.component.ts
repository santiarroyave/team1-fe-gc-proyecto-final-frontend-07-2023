import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] =[];

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService){}

  ngOnInit(): void {
      if(this.tokenStorageService.getToken()){
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
      }
  }

  onSubmit():void {
    const { email, password } = this.form;
    
    this.authService.login(email,password).subscribe(
      data => {
        console.log(data);
        
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data.usuario);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        window.location.reload();
      },
      err => {
        console.log(err);
        
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}

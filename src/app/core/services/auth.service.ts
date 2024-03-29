import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountModel } from 'src/app/core/view-models/account-model';

@Injectable()
export class AuthService {
  private userName: string;
  private ssoRole: string;
  private isRegister_main: string;
  roleLocal;
  onChangeUsername: BehaviorSubject<string> = new BehaviorSubject('');
  onChangeSsoRole: BehaviorSubject<string> = new BehaviorSubject('');
  onChangeRegister: BehaviorSubject<string> = new BehaviorSubject('');

  private tokenKey = 'timesheet_ids4';
  private storageUserKey = 'username';

  constructor(private cookieService: CookieService,
              private oauthService: OAuthService,
              private router: Router,
              private http: HttpClient) {
    this.userName = this.cookieService.get('username');
    this.ssoRole = this.cookieService.get('ssoRole');
    this.isRegister_main = this.cookieService.get('isRegister_main');

    setTimeout(() => {
      this.onChangeUsername.next(this.userName);
      this.onChangeSsoRole.next(this.ssoRole);
      this.onChangeRegister.next(this.isRegister_main);
    });
  }

  isAuthentication(): boolean {
    const token = this.getToken();
    return token && token !== '';
  }

  isAdmin(): boolean {
    return this.cookieService.get('ssoRole') === 'Administrator';
  }

  isStakeholder(): boolean {
    return this.cookieService.get('ssoRole') === 'Stakeholder';
  }

  getAccountInfo(): Observable<AccountModel> {
    return this.http.get<AccountModel>(environment.pop.api + '/api/Account');
  }

  signIn() {
    this.oauthService.initImplicitFlow();
  }

  afterSignin(account: AccountModel) {
    localStorage.setItem('isRegister_main', account.IsRegister.toString());
    localStorage.setItem('username',  account.Username);
    localStorage.setItem('ssoRole', account.User.SsoRole);

    this.cookieService.set('UserProfile', account.User);
    this.cookieService.set('username', account.Username);
    this.cookieService.set('ssoRole', account.User.SsoRole);
    this.cookieService.set('isRegister_main', account.IsRegister.toString());
    this.roleLocal = account.User.SsoRole;

    if ((account.User.SsoRole === '' || account.User.SsoRole === null) && !environment.production) {
      this.cookieService.set('ssoRole', 'Administrator');
      localStorage.setItem('ssoRole', 'Administrator');
      this.roleLocal = 'Administrator';
    } else if (account.User.SsoRole === '' || account.User.SsoRole === null) {
      this.cookieService.set('ssoRole', 'Stakeholder');
      localStorage.setItem('ssoRole', 'Stakeholder');
      this.roleLocal = 'Stakeholder';
    }

    this.onChangeUsername.next(account.Username);
    this.onChangeSsoRole.next(this.roleLocal);
  }

  signOut(noRedirectToLogoutUrl: boolean = false): void {
    localStorage.removeItem('username');
    localStorage.removeItem('isRegister_main');
    localStorage.removeItem('ssoRole');
    localStorage.removeItem(this.tokenKey);

    this.oauthService.logOut(noRedirectToLogoutUrl);
    this.router.navigate(['/loginids']);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    const tokenInfo = jwt_decode(token);
    localStorage.setItem(this.storageUserKey, tokenInfo.name);
  }

  getToken(): string | null {
    let token = this.oauthService.getAccessToken();
    if (!token) {
      token = localStorage.getItem(this.tokenKey);
    }
    return token;
  }

  getUserName(): string {
    return localStorage.getItem('username') || '';
  }


}

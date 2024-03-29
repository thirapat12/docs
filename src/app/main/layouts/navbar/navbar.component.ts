import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  env: any;
  userName: string;
  role: string;
  login = true;
  logout = false;
  showuser = false;

  constructor(private router: Router,
              protected cookie: CookieService,
              private auth: AuthService
  ) {
    this.auth.onChangeUsername.subscribe((userName) => {
      this.userName = userName;
    });
    this.auth.onChangeSsoRole.subscribe((ssoRole) => {
      this.role = ssoRole;
      // this.setmenu(this.role);
    });
  }

  ngOnInit() {
    this.env = environment;
    this.userName = localStorage.getItem('username');
    this.user();
  }

  onScroll(id: string) {
    const el = document.getElementById(id);
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  gotoWikiHelp() {
    // tslint:disable-next-line:max-line-length
    window.open('https://ais.matadorsuite.com/git/mts/wiki/help/wikis/home');
  }

  gotoWikiIssue() {
    window.open('https://git.matador.ais.co.th/mts/issue/matadorsuite-issuetracking/issues');
  }
  onLoginClick() {
    this.router.navigate(['/auth/signin']);
    this.user();
  }

  onlogout() {
    this.auth.signOut();
    this.user();
  }


  user() {
    if (this.userName) {
      this.login = false;
      this.logout = true;
    } else {
      this.login = true;
      this.logout = false;
    }
  }

}

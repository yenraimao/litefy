import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public auth: AuthService, public translate: TranslateService) {
    const defaultLanguage = window.localStorage.getItem('languageSelected');
    translate.addLangs(['pt', 'en', 'es']);
    translate.setDefaultLang(defaultLanguage || 'pt');
  }

  title = 'spotify-client';

  ngOnInit(): void {
    this.auth.setUser(JSON.parse(window.localStorage.getItem('user')));
  }
}

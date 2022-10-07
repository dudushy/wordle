/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectorRef } from '@angular/core';

import { GlobalVariablesService } from './services/global-variables.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppComponent';

  constructor(
    public GVS: GlobalVariablesService,
    public router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    console.log(`[${this.title}#constructor]`);
    if (!this.GVS.getVar('current_url')) {
      this.redirectTo('menu', this.title);
    } else {
      this.redirectTo(this.GVS.getVar('last_page'), this.title);
    }
  }

  updateView(from: string) {
    console.log(`[${this.title}#updateView] from`, from);
    this.cdr.detectChanges;
  }

  redirectTo(url: any, from: any) {
    console.log(`[${this.title}#redirectTo] ${from} | url`, url);

    this.router.navigateByUrl(`/${url}`);

    this.GVS.setVar('current_url', url);
    this.GVS.setVar('last_page', url);
    console.log(`[${this.title}#redirectTo] current_url`, this.GVS.getVar('current_url'));

    this.updateView('app');
  }

  toggleTheme(theme: any) {
    console.log(`[${this.title}#toggleTheme] theme`, theme);
    this.updateView('app');
  }
}

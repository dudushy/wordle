/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { GlobalVariablesService } from '../services/global-variables.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  title = 'SettingsComponent';

  theme: any;

  constructor(
    public GVS: GlobalVariablesService,
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.title}#constructor]`);

    if (!this.GVS.getVar('theme')) {
      this.theme = 'dark';
      this.GVS.setVar('theme', this.theme);
    } else {
      this.theme = this.GVS.getVar('theme');
    }
    console.log(`[${this.title}#constructor] theme (STORAGE)`, this.GVS.getVar('theme'));
    console.log(`[${this.title}#constructor] theme`, this.theme);
  }

  ngOnInit(): void {
    console.log(`[${this.title}#ngOnInit]`);
  }

  updateView() {
    console.log(`[${this.title}#updateView]`);

    this.cdr.detectChanges;
    this.app.updateView(this.title);
  }

  redirectTo(url: any) {
    this.app.redirectTo(url, this.title);

    this.updateView();
  }

  updateRows(value: any) {
    console.log(`[${this.title}#updateRows]`);
    this.GVS.setVar('rows', value);
    console.log(`[${this.title}#updateRows] rows (STORAGE)`, this.GVS.getVar('rows'));
    this.updateView();
  }

  updateColumns(value: any) {
    console.log(`[${this.title}#updateColumns]`);
    this.GVS.setVar('columns', value);
    console.log(`[${this.title}#updateColumns] columns (STORAGE)`, this.GVS.getVar('columns'));
    this.updateView();
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  title = 'GlobalVariablesService';

  constructor() {
    console.log(`[${this.title}#constructor]`);

    this.setupVars();

    // this.test();
  }

  async test() {
    console.log(`[${this.title}#test]`);
  }

  setupVars() {
    console.log(`[${this.title}#setupVars]`);
  }

  getVar(varname: any) {
    return JSON.parse(localStorage.getItem(varname) || 'null');
  }

  setVar(varname: any, value: any) {
    localStorage.setItem(varname, JSON.stringify(value));
  }
}

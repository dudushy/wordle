/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { AppComponent } from '../app.component';
import { GlobalVariablesService } from '../services/global-variables.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  title = 'GameComponent';

  gameGrid: any = {};
  maxAttempts: any;
  wordSize: any;
  targetWord: any = '';
  currentWord: any = '';
  currentAttempt: any = 0;
  attempts: any = {};

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event = event || window.event;
    this.handleKey(event.key.substring(0));
  }

  constructor(
    public GVS: GlobalVariablesService,
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.title}#constructor]`);
  }

  ngOnInit(): void {
    console.log(`[${this.title}#ngOnInit]`);
    this.gameGrid.rows = Array(parseInt(this.GVS.getVar('rows')));
    this.gameGrid.columns = Array(parseInt(this.GVS.getVar('columns')));
    console.log(`[${this.title}#constructor] gameGrid`, this.gameGrid);

    this.maxAttempts = parseInt(this.GVS.getVar('rows'));
    console.log(`[${this.title}#constructor] maxAttempts`, this.maxAttempts);

    this.wordSize = parseInt(this.GVS.getVar('columns'));
    console.log(`[${this.title}#constructor] wordSize`, this.wordSize);

    switch (this.wordSize) {
      case 3:
        this.targetWord = 'dog';
        break;

      case 4:
        this.targetWord = 'test';
        break;

      case 5:
        this.targetWord = 'hello';
        break;

      case 6:
        this.targetWord = 'knifes';
        break;

      default:
        break;
    }

    console.log(`[${this.title}#constructor] targetWord`, this.targetWord);
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

  handleKey(key: any) {
    const KEY = key.toUpperCase();
    console.log(`[${this.title}#handleKey] key`, KEY);
    console.log(`[${this.title}#handleKey] attempts`, this.attempts);
    console.log(`[${this.title}#handleKey] maxAttempts`, this.maxAttempts);
    console.log(`[${this.title}#handleKey] currentAttempt`, this.currentAttempt);
    console.log(`[${this.title}#handleKey] (BEFORE) currentWord`, this.currentWord);
    console.log(`[${this.title}#handleKey] (BEFORE) currentWord.length`, this.currentWord.length);
    console.log(`[${this.title}#handleKey] wordSize`, this.wordSize);

    if (this.currentAttempt < this.maxAttempts) {
      if (KEY.length == 1 && this.currentWord.length < this.wordSize) this.currentWord += KEY;

      console.log(`[${this.title}#handleKey] (AFTER) currentWord`, this.currentWord);
      console.log(`[${this.title}#handleKey] (AFTER) currentWord.length`, this.currentWord.length);

      if (KEY == 'BACKSPACE') {
        this.currentWord = this.currentWord.substring(0, this.currentWord.length - 1);
      }

      if (KEY == 'ENTER' && this.currentWord.length == this.wordSize) {
        this.attempts[this.currentAttempt] = this.currentWord;
        console.log(`[${this.title}#handleKey] attempts`, this.attempts);

        this.currentWord = '';
        this.currentAttempt++;
      }
    }

    console.log(`[${this.title}#handleKey] currentWord`, this.currentWord);

    this.updateView();
  }

  checkLetterStatus(attempt: any, index: any) { // attempts[rowIndex][columnIndex]
    console.log(`[${this.title}#checkLetterStatus] attempt`, attempt);
    console.log(`[${this.title}#checkLetterStatus] index`, index);

    const targetWord = this.targetWord.toUpperCase();
    console.log(`[${this.title}#checkLetterStatus] targetWord`, targetWord);

    if (this.attempts[attempt]) {
      console.log(`[${this.title}#checkLetterStatus] attempts[${attempt}][${index}]`, this.attempts[attempt][index]);
      console.log(`[${this.title}#checkLetterStatus] targetWord[${index}]`, targetWord[index]);

      if (this.attempts[attempt][index] == targetWord[index]) {
        return 'hit';
      } else if (targetWord.includes(this.attempts[attempt][index])) { //TODO check if char already used
        return 'near';
      } else if (!targetWord.includes(this.attempts[attempt][index])) {
        return 'miss';
      } else {
        return 'none';
      }
    } else {
      return 'none';
    }

    this.updateView();
  }
}

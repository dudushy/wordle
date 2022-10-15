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
  extraChars: any = {};

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
    this.setupGame();
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

  setupGame() {
    this.gameGrid.rows = Array(parseInt(this.GVS.getVar('rows')));
    this.gameGrid.columns = Array(parseInt(this.GVS.getVar('columns')));
    console.log(`[${this.title}#setupGame] gameGrid`, this.gameGrid);

    this.maxAttempts = parseInt(this.GVS.getVar('rows'));
    console.log(`[${this.title}#setupGame] maxAttempts`, this.maxAttempts);

    this.wordSize = parseInt(this.GVS.getVar('columns'));
    console.log(`[${this.title}#setupGame] wordSize`, this.wordSize);

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

    console.log(`[${this.title}#setupGame] targetWord`, this.targetWord);

    // this.extraChars = {
    //   char: {
    //     remaining: 0,
    //     totalDupes: 0,
    //   }
    // };
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

        const targetWord = this.targetWord.toUpperCase();
        console.log(`[${this.title}#handleKey] targetWord`, targetWord);

        this.extraChars = {};
        let previousChars = '';
        for (const char in targetWord) {
          console.log(`[${this.title}#handleKey] previousChars.includes(targetWord[${char}])`, previousChars.includes(targetWord[char]));
          if (previousChars.includes(targetWord[char])) {
            console.log(`[${this.title}#handleKey] extraChars[targetWord[${char}]]`, this.extraChars[targetWord[char]]);

            if (this.extraChars[targetWord[char]]) {
              this.extraChars[targetWord[char]].remaining++;
              this.extraChars[targetWord[char]].totalDupes++;
            } else {
              this.extraChars[targetWord[char]] = {
                remaining: 1,
                totalDupes: 1,
              };
            }

            console.log(`[${this.title}#handleKey] extraChars`, this.extraChars);
          }

          previousChars += targetWord[char];
          console.log(`[${this.title}#handleKey] previousChars`, previousChars);
        }

        console.log(`[${this.title}#handleKey] (AFTER) previousChars`, previousChars);
        console.log(`[${this.title}#handleKey] (AFTER) extraChars`, this.extraChars);

        this.currentWord = '';
        this.currentAttempt++;
      }
    }

    console.log(`[${this.title}#handleKey] currentWord`, this.currentWord);

    this.updateView();
  }

  checkLetterStatus(attempt: any, char: any) { // attempts[rowIndex][columnIndex]
    // console.log(`[${this.title}#checkLetterStatus] attempt`, attempt);
    // console.log(`[${this.title}#checkLetterStatus] char`, char);

    const targetWord = this.targetWord.toUpperCase();
    // console.log(`[${this.title}#checkLetterStatus] targetWord`, targetWord);

    if (this.attempts[attempt]) {
      console.log(`[${this.title}#checkLetterStatus] targetWord[${char}]`, targetWord[char]);
      console.log(`[${this.title}#checkLetterStatus] attempts[${attempt}][${char}]`, this.attempts[attempt][char]);

      if (this.attempts[attempt][char] == targetWord[char]) {
        console.log(`[${this.title}#checkLetterStatus] HIT`);
        return 'hit';
      }

      if (targetWord.includes(this.attempts[attempt][char])) {
        console.log(`[${this.title}#checkLetterStatus] NEAR`);
        return 'near';
      }

      //TODO check if char already used [BEGIN]
      // if (targetWord.includes(this.attempts[attempt][char]) && this.extraChars[this.attempts[attempt][char]] == undefined) {
      //   console.log(`[${this.title}#checkLetterStatus] NEAR`);
      //   return 'near';
      // }
      // if (targetWord.includes(this.attempts[attempt][char]) && this.extraChars[this.attempts[attempt][char]] != undefined) {
      //   if (this.extraChars[this.attempts[attempt][char]].remaining > 0) {
      //     this.extraChars[this.attempts[attempt][char]].remaining--;

      //     // if (this.extraChars[this.attempts[attempt][char]].remaining == 0) {
      //     //   this.extraChars[this.attempts[attempt][char]] = undefined;
      //     // }

      //     console.log(`[${this.title}#checkLetterStatus] NEAR NEAR`);
      //     console.log(`[${this.title}#checkLetterStatus] extraChars`, this.extraChars);
      //     return 'near';
      //   } else {
      //     console.log(`[${this.title}#checkLetterStatus] NEAR MISS`);
      //     return 'miss';
      //   }
      // }
      //TODO check if char already used [END]

      if (!targetWord.includes(this.attempts[attempt][char])) {
        console.log(`[${this.title}#checkLetterStatus] MISS`);
        return 'miss';
      }

      return 'none';
    } else {
      return 'none';
    }
  }
}

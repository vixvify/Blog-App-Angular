import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeywordService } from '../../services/keyword.service';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css',
})
export class Searchbar {
  keyword = signal<string>('');
  constructor(private keywordservice: KeywordService) {}
  send() {
    this.keywordservice.sharedKeyword.set(this.keyword());
  }
}

import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KeywordService {
  sharedKeyword = signal<string>('');
}

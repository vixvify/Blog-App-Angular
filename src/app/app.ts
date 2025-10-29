import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Searchbar } from './searchbar/searchbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Searchbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('blog-app-angular');
}

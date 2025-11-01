import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Searchbar } from '../../searchbar/searchbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, Searchbar, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}

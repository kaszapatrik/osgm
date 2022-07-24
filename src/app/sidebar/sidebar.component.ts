import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  public resourceGroups = [
    'Sprites',
    'Backgrounds',
    'Models',
    'Materials',
    'Fonts',
    'Sounds',
    'Scripts',
    'Objects',
    'Rooms',
  ];

  constructor() {
  }

  ngOnInit() : void {
  }
}

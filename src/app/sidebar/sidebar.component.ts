import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  private isBorderCatched = false;
  private sidebarElementRef : HTMLElement | null = null;
  public borderDragX = 0;

  public resourceGroups = {};

  public sidebarList = [
    { name: 'sprites', title: 'Sprites', isExpandable: true, isOpen: false, list: [] },
    { name: 'backgrounds', title: 'Backgrounds', isExpandable: true, isOpen: false, list: [] },
    { name: 'models', title: 'Models', isExpandable: true, isOpen: false, list: [] },
    { name: 'materials', title: 'Materials', isExpandable: true, isOpen: false, list: [] },
    { name: 'fonts', title: 'Fonts', isExpandable: true, isOpen: false, list: [] },
    { name: 'sounds', title: 'Sounds', isExpandable: true, isOpen: false, list: [] },
    { name: 'scripts', title: 'Scripts', isExpandable: true, isOpen: false, list: [] },
    { name: 'objects', title: 'Objects', isExpandable: true, isOpen: false, list: [] },
    { name: 'rooms', title: 'Rooms', isExpandable: true, isOpen: false, list: [] },
    { title: 'Game Information', uniqueClass: 'btn-game-information', isExpandable: false },
    { title: 'Global Game Settings', uniqueClass: 'btn-game-settings', isExpandable: false },
  ];

  constructor() {
  }

  ngOnInit() : void {
    this.sidebarElementRef = document.querySelector('.panel-sidebar');
  }

  public borderResizeToggle(isCatched = false) : void {
    this.isBorderCatched = isCatched;
  }

  public borderResize(event : MouseEvent) {
    if (this.isBorderCatched) {
      // save drag x
      if (event.clientX !== 0) {
        this.borderDragX = event.clientX;
      }

      // set sidebar width to drag x
      if (this.sidebarElementRef !== null) {
        this.sidebarElementRef.style.width = `${this.borderDragX}px`;
      }
    }
  }
}

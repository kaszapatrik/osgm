import { Component, ElementRef, ViewChild } from '@angular/core';
import { Globals } from './common/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = 'Web Game Maker';
  public contextMenu = Globals.getContextMenuData();

  constructor() {
  }

  public onRightClick(event : MouseEvent) : void {
    event.preventDefault();
  }
}

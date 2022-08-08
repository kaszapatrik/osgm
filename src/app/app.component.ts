import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = 'Web Game Maker';

  constructor() {
  }

  onRightClick(event : Event) : void {
    event.preventDefault();

    // TODO contextmenu to sidebar (resource management: new, delete, etc), and others
  }
}

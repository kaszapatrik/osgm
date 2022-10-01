import { Component } from '@angular/core';
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

  ngOnInit() {
    document.body.addEventListener('click', (event : MouseEvent) => { this.onLeftClick(event); });
  }

  private onLeftClick(event : MouseEvent) : void {
    if (this.contextMenu.isVisible()) {
      this.checkContextMenuOutClick(event);
    }
  }

  public onRightClick(event : MouseEvent) : void {
    event.preventDefault();

    if (this.contextMenu.isVisible()) {
      if (this.contextMenu.isShown()) {
        this.checkContextMenuOutClick(event);
      }
      else {
        this.contextMenu.setShown(true);
      }
    }
  }

  private checkContextMenuOutClick(event : MouseEvent) : void {
    if (event.target !== null) {
      const target = event.target as Element,
        isOnMenuClick = target.classList.contains('cm');

      if (!isOnMenuClick) {
        this.contextMenu.setVisibility(false);
        this.contextMenu.setShown(false);
      }
    }
  }
}

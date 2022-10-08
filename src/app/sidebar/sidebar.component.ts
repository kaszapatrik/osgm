import { Component, OnInit } from '@angular/core';
import { Globals } from '../common/globals';
import { ResourceListInterface } from '../common/resourcelistinterface';

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

  public sidebarListInstance;
  public sidebarList : Array<ResourceListInterface>;

  public contextMenu = Globals.getContextMenuData();

  constructor() {
    this.sidebarListInstance = Globals.getResourceListInstance();
    this.sidebarList = Globals.getResourceList();

    this.initSidebarMenu();
  }

  private initSidebarMenu() : void {
    this.sidebarListInstance.add('sprites', 'Sprites');
    this.sidebarListInstance.add('sounds', 'Sounds');
    this.sidebarListInstance.add('backgrounds', 'Backgrounds');
    this.sidebarListInstance.add('models', 'Models');
    this.sidebarListInstance.add('materials', 'Materials');
    this.sidebarListInstance.add('scripts', 'Scripts');
    this.sidebarListInstance.add('fonts', 'Fonts');
    this.sidebarListInstance.add('objects', 'Objects');
    this.sidebarListInstance.add('rooms', 'Rooms');
    this.sidebarListInstance.add('game-info', 'Game Information', false, false, [], 'btn-game-information');
    this.sidebarListInstance.add('game-settings', 'Global Game Settings', false, false, [], 'btn-game-settings');

    this.sidebarListInstance.addItem('sprites', {title: 'Sprite1'});
    this.sidebarListInstance.addItem('sprites', {title: 'Sprite2'});
  }

  ngOnInit() : void {
    this.sidebarElementRef = document.querySelector('.panel-sidebar');
  }

  public borderResizeToggle(isCatched = false) : void {
    this.isBorderCatched = isCatched;
  }

  public borderResize(event : MouseEvent) {
    if (this.isBorderCatched) {
      // save drag X
      if (event.clientX !== 0) {
        this.borderDragX = event.clientX;
      }

      // set sidebar width to drag X
      if (this.sidebarElementRef !== null) {
        this.sidebarElementRef.style.width = `${this.borderDragX}px`;
      }
    }
  }

  public onRightClick(event : MouseEvent, resourceName : string, isGroup = false) : void {
    if (resourceName.length === 0) {
      // no context menu on settings items
      return;
    }

    this.contextMenu.setMenuType(resourceName);
    this.contextMenu.setMenuPosition(event.clientX, event.clientY);
    this.contextMenu.setVisibility(true);
    this.contextMenu.setShown(false);
    this.contextMenu.setIsGroup(isGroup);

    const target = event.target as HTMLElement;
    if (target !== null) {
      const targetContainer = target.closest('li');

      if (targetContainer !== null) {
        // main groups selection
        if (typeof targetContainer.dataset['id'] === 'undefined') {
          this.sidebarListInstance.setSelectedItem(resourceName);
        }
        // all other group and item selection
        else {
          this.sidebarListInstance.setSelectedItem(targetContainer.dataset['id']);
        }
      }
    }
  }

  public onLeftClick(event : MouseEvent, resourceName : string, isDoubleClick = false) : void {
    const resource = Globals.getResourceListInstance().getGroup(resourceName);
    if (resource !== null) {
      const target = event.target as HTMLElement,
        isToggleButtonClicked = isDoubleClick || (target !== null && target.classList.contains('btn-toggle'));

      if (target !== null) {
        const targetContainer = target.closest('li');

        if (targetContainer !== null) {
          // main groups click/selection
          if (typeof targetContainer.dataset['id'] === 'undefined') {
            if (isToggleButtonClicked) {
              // TODO getter
              resource.isOpen = !resource.isOpen;
            } else {
              Globals.getResourceListInstance().setSelectedItem(resourceName);
            }
          }
          // all other group and item click/selection
          else {
            if (isToggleButtonClicked) {
              // TODO
              console.log(`open subfolder or open item properties of ${resourceName} group id: ${targetContainer.dataset['id']}`);
            } else {
              Globals.getResourceListInstance().setSelectedItem(targetContainer.dataset['id']);
            }
          }
        }
      }
    }
  }
}

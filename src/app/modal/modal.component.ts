import { Component, OnInit } from '@angular/core';
import { Globals } from '../common/globals';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  public openModalsList = Globals.getOpenModalsList();
  public isHeaderCatched : boolean = false;
  public dragX = 0;
  public dragY = 0;
  public ghostImage = new Image();
  private modalElementRef : HTMLElement | null = null;
  private parentElementRef : HTMLElement | null = null;
  public positionX = 0;
  public positionY = 0;

  constructor() {
    Globals.modalsComponent = this;

    // transparent pixel
    this.ghostImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  }

  ngOnInit() : void {
    window.addEventListener('resize', () => { this.positionRefresh(); });
  }

  public getModalElement(index : number) : HTMLElement | null {
    if (typeof this.openModalsList[index] !== 'undefined') {
      if (this.openModalsList[index]['modalElementRef'] === null) {
        this.openModalsList[index]['modalElementRef'] = document.querySelector(`.modal-container[data-id="${this.openModalsList[index]['uniqueItemId']}"]`);
      }

      return this.openModalsList[index]['modalElementRef'];
    }

    return null;
  }

  public getParentElement(index : number) : HTMLElement | null {
    if (typeof this.openModalsList[index] !== 'undefined') {
      if (this.openModalsList[index]['parentElementRef'] === null) {
        this.openModalsList[index]['parentElementRef'] = this.getModalElement(index)?.closest('.container');
      }

      return this.openModalsList[index]['parentElementRef'];
    }

    return null;
  }

  public modalDragToggle(event : DragEvent, index = -1, isCatched = false) : void {
    if (isCatched) {
      event?.dataTransfer?.setDragImage(this.ghostImage, 0, 0);
    }

    const target = event.target as HTMLElement;

    if (!target.classList.contains('drag')) {
      this.isHeaderCatched = false;
      return;
    }

    this.isHeaderCatched = isCatched;

    if (isCatched) {
      if (typeof this.openModalsList[index] !== 'undefined') {
        const modal = this.openModalsList[index];

        this.dragX = modal['positionX'] - event.clientX;
        this.dragY = modal['positionY'] - event.clientY;
      }
    }
  }

  public modalDrag(event : MouseEvent, index = -1) : void {
    if (this.isHeaderCatched && typeof this.openModalsList[index] !== 'undefined') {
      const modal = this.openModalsList[index],
        modalElement = this.getModalElement(index),
        parentElement = this.getParentElement(index);

      // save X, Y
      if (event.clientX !== 0) {
        const widthLimit = (parentElement?.offsetWidth ?? window.innerWidth) - (modalElement?.offsetWidth ?? 0) - 1;
        modal['positionX'] = Math.max(0, Math.min(widthLimit, event.clientX + this.dragX));
      }
      if (event.clientY !== 0) {
        const heightLimit = (parentElement?.offsetHeight ?? window.innerHeight) - (modalElement?.offsetHeight ?? 0) - 1;
        modal['positionY'] = Math.max(28, Math.min(heightLimit, event.clientY + this.dragY));
      }
    }
  }

  private positionRefresh() : void {
    for (let i = 0; i < this.openModalsList.length; i++) {
      const modal = this.openModalsList[i],
        modalElement = this.getModalElement(i),
        parentElement = this.getParentElement(i);

        const widthLimit = (parentElement?.offsetWidth ?? window.innerWidth) - (modalElement?.offsetWidth ?? 0) - 1;
        modal['positionX'] = Math.max(0, Math.min(widthLimit, modal['positionX']));
        
        const heightLimit = (parentElement?.offsetHeight ?? window.innerHeight) - (modalElement?.offsetHeight ?? 0) - 1;
        modal['positionY'] = Math.max(28, Math.min(heightLimit, modal['positionY']));
    }
  }

  public setPositionCenter(index : number) : void {
    const modal = this.openModalsList[index],
      modalElement = this.getModalElement(index),
      parentElement = this.getParentElement(index);
    
    modal['positionX'] = (parentElement?.offsetWidth ?? window.innerWidth) / 2 - (modalElement?.offsetWidth ?? 0) / 2;
    modal['positionY'] = (parentElement?.offsetHeight ?? window.innerHeight) / 2 - (modalElement?.offsetHeight ?? 0) / 2;
  }

  public getModalLeftPosition(index : number) : string {
    let left = 0;

    if (typeof this.openModalsList[index] !== 'undefined') {
      left = this.openModalsList[index]['positionX'];
    }

    return `${left}px`;
  }

  public getModalTopPosition(index : number) : string {
    let top = 0;

    if (typeof this.openModalsList[index] !== 'undefined') {
      top = this.openModalsList[index]['positionY'];
    }

    return `${top}px`;
  }
}

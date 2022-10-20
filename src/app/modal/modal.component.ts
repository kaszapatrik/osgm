import { Component, OnInit } from '@angular/core';
import { Globals } from '../common/globals';
import { ResourceInterface } from '../common/resourceinterface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  public resourceListInstance = Globals.getResourceListInstance();
  public openModalsList = Globals.getOpenModalsList();
  public isHeaderCatched : boolean = false;
  public modalPositionShift = 0;
  public dragX = 0;
  public dragY = 0;
  public ghostImage = new Image();
  private selectedModalId = '';

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
        this.openModalsList[index]['modalElementRef'] = document.querySelector(`.modal-container[data-unique-id="${this.openModalsList[index]['uniqueItemId']}"]`);
      }

      return this.openModalsList[index]['modalElementRef'];
    }

    return null;
  }

  public getParentElement(index : number) : HTMLElement | null {
    if (typeof this.openModalsList[index] !== 'undefined') {
      if (this.openModalsList[index]['parentElementRef'] === null) {
        const modal = this.getModalElement(index);
        this.openModalsList[index]['parentElementRef'] = modal !== null ? modal.closest('.container') : null;
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

        // take it to the front
        modal['zIndex'] = Globals.getZIndex();
        // make it focused
        Globals.getModalComponent().setSelectedModal(modal['uniqueItemId']);

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
        const modalHeaderHeight = 29,
          heightLimit = (parentElement?.offsetHeight ?? window.innerHeight) - modalHeaderHeight - 1;
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
        
        const modalHeaderHeight = 29,
          heightLimit = (parentElement?.offsetHeight ?? window.innerHeight) - modalHeaderHeight - 1;
        modal['positionY'] = Math.max(28, Math.min(heightLimit, modal['positionY']));
    }
  }

  public setPositionCenter(index : number) : void {
    const modal = this.openModalsList[index],
      modalElement = this.getModalElement(index),
      parentElement = this.getParentElement(index),
      parentElementWidth = parentElement?.offsetWidth ?? window.innerWidth,
      parentElementHeight = parentElement?.offsetHeight ?? window.innerHeight,
      shiftX = this.modalPositionShift * (parentElementWidth * 0.05),
      shiftY = this.modalPositionShift * (parentElementHeight * 0.05);

    modal['positionX'] = parentElementWidth / 2 - (modalElement?.offsetWidth ?? 0) / 2 + shiftX;
    modal['positionY'] = parentElementHeight / 2 - (modalElement?.offsetHeight ?? 0) / 2 + shiftY;

    this.modalPositionShift++;

    if (this.modalPositionShift >= 5) {
      this.modalPositionShift = -5;
    }
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

  public modalClose(index : number, event ?: Event) : void {
    if (typeof event !== 'undefined') {
      const target = event.target as HTMLElement;

      if (target.classList.contains('disabled')) {
        return;
      }
    }

    if (typeof this.openModalsList[index] !== 'undefined') {
      this.openModalsList.splice(index, 1);
    }

    if (this.openModalsList.length === 0) {
      this.modalPositionShift = 0;
      Globals.setZIndex(0);
    }
  }

  public modalMinimize(index : number, event ?: Event) : void {
    if (typeof event !== 'undefined') {
      const target = event.target as HTMLElement;
      
      if (target.classList.contains('disabled')) {
        return;
      }
    }

    if (typeof this.openModalsList[index] !== 'undefined') {
      this.openModalsList[index]['isMinimized'] = !this.openModalsList[index]['isMinimized'];

      console.log(this.openModalsList[index]);
    }
  }

  public modalMaximize(index : number, event ?: Event) : void {
    if (typeof event !== 'undefined') {
      const target = event.target as HTMLElement;
      
      if (target.classList.contains('disabled')) {
        return;
      }
    }

    if (typeof this.openModalsList[index] !== 'undefined') {
      this.openModalsList[index]['isMaximized'] = !this.openModalsList[index]['isMaximized'];
    }
  }

  public setSelectedModal(uniqueItemId ?: string) : void {
    if (typeof uniqueItemId !== 'string') {
      this.selectedModalId = '';
    }
    else {
      this.selectedModalId = uniqueItemId;
    }
  }

  public getSelectedModal() : string {
    return this.selectedModalId;
  }

  // TODO resource interface
  public resourceSetProperty(resource : any, property : string, event : Event) : void {
    let value : string = '';

    if (event !== null) {
      const target = event.target as HTMLInputElement;
      if (typeof target.value === 'string') {
        value = target.value;
      }
    }

    if (typeof resource[property] !== 'undefined') {
      resource[property] = value;
    }
  }
}

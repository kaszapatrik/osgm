import { ResourceInterface } from './resourceinterface';

export interface OpenModalsInterface {
    groupName : string;
    itemId : number;
    modalElementRef : HTMLElement | null;
    parentElementRef : HTMLElement | null;
    positionX : number;
    positionY : number;
    uniqueItemId : string;
    zIndex : number;
    resource : ResourceInterface | null;
}
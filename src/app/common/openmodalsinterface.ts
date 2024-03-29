import { ResourceInterface } from './resourceinterface';

export interface OpenModalsInterface {
    groupName : string;
    itemId : number;
    modalElementRef : HTMLElement | null;
    parentElementRef : HTMLElement | null;
    positionX : number;
    positionY : number;
    isMinimized : boolean;
    isMaximized : boolean;
    uniqueItemId : string;
    zIndex : number;
    resource : ResourceInterface | null;
}
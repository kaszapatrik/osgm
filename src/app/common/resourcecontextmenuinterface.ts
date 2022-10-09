export interface ResourceContextMenuInterface {
    isVisible : boolean;
    isShown : boolean;
    isGroup : boolean;
    contextMenuType : string;
    selectedItemId : number | null;
    positionX : number;
    positionY : number;
}
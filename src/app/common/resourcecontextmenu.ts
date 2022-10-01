import { ResourceContextMenuInterface } from './resourcecontextmenuinterface';

export class ResourceContextMenu {
    private resourceContextMenu : ResourceContextMenuInterface;
    
    public constructor() {
        this.resourceContextMenu = {
            isVisible: false,
            isShown: false,
            isGroup: false,
            contextMenuType: '',
            positionX: 0,
            positionY : 0,
        };
    }

    public setVisibility(isVisible : boolean) : void {
        this.resourceContextMenu.isVisible = isVisible;
    }

    public isVisible() : boolean {
        return this.resourceContextMenu.isVisible;
    }

    public setShown(isShown : boolean) : void {
        this.resourceContextMenu.isShown = isShown;
    }

    public isShown() : boolean {
        return this.resourceContextMenu.isShown;
    }

    public setMenuType(menuType : string) : void {
        this.resourceContextMenu.contextMenuType = menuType;
    }

    public getMenuType() : string {
        return this.resourceContextMenu.contextMenuType;
    }

    public setMenuPosition(x : number, y : number) : void {
        this.resourceContextMenu.positionX = x;
        this.resourceContextMenu.positionY = y;
    }

    public getMenuPositionX() : string {
        return `${this.resourceContextMenu.positionX}px`;
    }

    public getMenuPositionY() : string {
        return `${this.resourceContextMenu.positionY}px`;
    }

    public setIsGroup(isGroup : boolean) : void {
        this.resourceContextMenu.isGroup = isGroup;
    }

    public getIsGroup() : boolean {
        return this.resourceContextMenu.isGroup;
    }
}
import { Globals } from './globals';
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

    /**
     * returns whether the context menu is visible
     * @returns
     */
    public isVisible() : boolean {
        return this.resourceContextMenu.isVisible;
    }

    public setShown(isShown : boolean) : void {
        this.resourceContextMenu.isShown = isShown;
    }

    /**
     * a bit hack:
     * false, when the menu appeared, but yet don't need to hide it after an outside click
     * (first right click is always an outside click sadly)
     * true, when the menu was appeared, and when click outside closing the menu
     * @returns 
     */
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

    public hide() : void {
        this.setVisibility(false);
        this.setShown(false);
    }

    /**
     * menu click on context menu
     * @param event 
     * @param command
     */
    public click(event : MouseEvent, command : string) : void {
        const target = event.target as Element,
            isTargetDisabled = target.classList.contains('disabled');

        if (isTargetDisabled) {
            return;
        }

        switch (command) {
            case 'addItem': { this.addItem(); break; }
            case 'addGroup': { break; }
            case 'delete': { break; }
            case 'rename': { break; }
            case 'sort': { this.sortGroup(); break; }
            case 'duplicate': { break; }
            case 'properties': { break; }
            case 'exportScripts': { break; }
        }

        this.hide();
    }

    private addItem() : void {
        const groupName = this.getMenuType();
        Globals.getResourceListInstance().addItem(groupName);

        Globals.getResourceListInstance().openGroup(groupName);
    }

    private sortGroup() : void {
        const group = this.getMenuType();

        console.log(group);

        // TODO
    }
}
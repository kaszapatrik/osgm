import { ResourceList } from './resourcelist';
import { ResourceContextMenu } from './resourcecontextmenu';

export class Globals {
    public static resourceList : ResourceList;
    public static contextMenu : ResourceContextMenu;

    public static getResourceListInstance() : ResourceList {
        if (typeof Globals.resourceList === 'undefined') {
            Globals.resourceList = new ResourceList();
        }

        return Globals.resourceList;
    }

    public static getResourceList() : Array<any> {
        return Globals.getResourceListInstance().get();
    }

    public static getContextMenuData() : ResourceContextMenu {
        if (typeof Globals.contextMenu === 'undefined') {
            Globals.contextMenu = new ResourceContextMenu();
        }

        return Globals.contextMenu;
    }
}
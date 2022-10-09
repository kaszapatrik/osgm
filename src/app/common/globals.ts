import { ResourceList } from './resourcelist';
import { ResourceContextMenu } from './resourcecontextmenu';

export class Globals {
    public static contextMenu : ResourceContextMenu;
    public static resourceList : ResourceList;
    public static globalResourceCount : number = 0;
    public static uniqueResourceIds : {[key : string] : number} = {
        sprites: 0,
        sounds: 0,
        backgrounds: 0,
        models: 0,
        materials: 0,
        scripts: 0,
        fonts: 0,
        objects: 0,
        rooms: 0,
    };

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

    public static getUniqueId(groupName : string = '') : number {
        if (Globals.uniqueResourceIds.hasOwnProperty(groupName)) {
            Globals.globalResourceCount++;

            return Globals.uniqueResourceIds[groupName]++;
        }

        return -1;
    }
}
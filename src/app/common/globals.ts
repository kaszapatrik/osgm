import { ResourceList } from './resourcelist';
import { ResourceContextMenu } from './resourcecontextmenu';
import { OpenModalsInterface } from './openmodalsinterface';
import { ModalComponent } from '../modal/modal.component';

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
    public static modalsComponent : any;
    // TODO interface
    public static openModalsList : Array<OpenModalsInterface> = [];
    public static zIndex : number = 0;

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

    public static getOpenModalsList() : Array<OpenModalsInterface> {
        return Globals.openModalsList;
    }

    public static getModalIsOpen(groupName : string, itemId : number) : null | {[key : string] : any} {
        for (let i = 0, n = this.openModalsList.length; i < n; i++) {
            if (this.openModalsList[i]['groupName'] === groupName && this.openModalsList[i]['itemId'] === itemId) {
                return this.openModalsList[i];
            }
        }

        return null;
    }

    public static openModal(groupName : string, itemId : number) : void {
        const modal = this.getModalIsOpen(groupName, itemId);

        if (modal !== null) {
            // take it to the front
            modal['zIndex'] = Globals.getZIndex();
            // make it focused
            Globals.getModalComponent().setSelectedModal(modal['uniqueItemId']);

            return;
        }

        const newUniqueItemId = `${groupName}${itemId}`;

        this.openModalsList.push({
            groupName: groupName,
            itemId: itemId,
            modalElementRef: null,
            parentElementRef: null,
            positionX: 0,
            positionY: 0,
            uniqueItemId: newUniqueItemId,
            zIndex: this.getZIndex(),
        });

        const newModalIndex = this.openModalsList.length - 1;

        requestAnimationFrame(() => {
            this.getModalComponent().setPositionCenter(newModalIndex);

            // make it focused
            Globals.getModalComponent().setSelectedModal(newUniqueItemId);
        });
    }

    public static getZIndex() : number {
        return this.zIndex++;
    }

    public static setZIndex(zIndex : number) : void {
        this.zIndex = zIndex;
    }

    public static getModalComponent() : ModalComponent {
        return this.modalsComponent;
    }
}
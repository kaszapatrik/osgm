import { ResourceListInterface } from './resourcelistinterface';
import { Globals } from './globals';

export class ResourceList {
    private resourceList : Array<ResourceListInterface>;
    private resourceListGroupsIndex : {[name : string] : number};
    private selectedItem : string | null = null;
    
    public constructor() {
        this.resourceList = [];
        this.resourceListGroupsIndex = {};
    }

    public add(name : string = '', title : string = '', isExpandable : boolean = true, isOpen : boolean = false, list = [], uniqueClass : string = '') : void {
        const resource = {
            name: name,
            title: title,
            isExpandable: isExpandable,
            isOpen: isOpen,
            list: list,
            uniqueClass: uniqueClass,
        };

        this.resourceList.push(resource);
    }

    public get() : Array<ResourceListInterface> {
        return this.resourceList;
    }

    public getGroup(groupName : string) : ResourceListInterface | null {
        for (let i = 0, n = this.resourceList.length; i < n; i++) {
            if (this.resourceList[i].name === groupName) {
                return this.resourceList[i];
            }
        }

        return null;
    }

    private getGroupIconImage(groupName : string) : string | null {
        const icons : {[key : string] : string | null} = {
            sprites: null,
            sounds: '/assets/images/icon_sound.png',
            backgrounds: null,
            models: '/assets/images/icon_model.png',
            materials: '/assets/images/icon_material.png',
            scripts: '/assets/images/icon_script.png',
            fonts: '/assets/images/icon_font.png',
            objects: null,
            rooms: '/assets/images/icon_room.png',
        };

        if (icons.hasOwnProperty(groupName)) {
            return icons[groupName];
        }
        else {
            return null;
        }
    }

    private getGroupItemName(groupName : string, id : number) : string {
        const names : {[key : string] : string} = {
            sprites: 'sprite',
            sounds: 'sound',
            backgrounds: 'background',
            models: 'model',
            materials: 'material',
            scripts: 'script',
            fonts: 'font',
            objects: 'object',
            rooms: 'room',
        };

        if (names.hasOwnProperty(groupName)) {
            return `${names[groupName]}${id}`;
        }
        else {
            return '';
        }
    }

    public addItem(groupName : string, item : {[key : string] : any} = {}) : void {
        this.insertItem(groupName, null, item);
    }

    public insertItem(groupName : string, otherItemId : number | null = null, item : {[key : string] : any} = {}) : void {
        const resourceGroup = this.getGroup(groupName);

        if (resourceGroup === null) {
            return;
        }

        if (!item.hasOwnProperty('id')) {
            item['id'] = Globals.getUniqueId(groupName);
        }

        if (!item.hasOwnProperty('title')) {
            item['title'] = this.getGroupItemName(groupName, item['id']);
        }

        if (!item.hasOwnProperty('image')) {
            item['image'] = this.getGroupIconImage(groupName);
        }

        if (otherItemId !== null) {
            const index = this.getItemIndex(groupName, otherItemId);
            if (index > -1) {
                resourceGroup.list.splice(index, 0, item);
            } else {
                resourceGroup.list.push(item);
            }
        } else {
            resourceGroup.list.push(item);
        }
    }

    public setSelectedItem(name : string | null) : void {
        this.selectedItem = name;
    }

    public getSelectedItem() : string | null {
        return this.selectedItem;
    }

    public getItemIndex(groupName : string, itemId : number | null) : number {
        const resourceGroup = this.getGroup(groupName);

        if (resourceGroup === null || itemId === null) {
            return -1;
        }

        for (let i = 0, n = resourceGroup.list.length; i < n; i++) {
            if (resourceGroup.list[i].id === itemId) {
                return i;
            }
        }

        return -1;
    }

    public toggleGroup(groupName :  string | ResourceListInterface, value : null | boolean = null) : void {
        let group;
        if (typeof groupName === 'string') {
            group = this.getGroup(groupName);
        } else {
            group = groupName;
        }

        if (!group || group.list.length === 0) {
            return;
        }

        if (value === null) {
            group.isOpen = !group.isOpen;
        } else {
            group.isOpen = value;
        }
    }

    public openGroup(groupName : string | ResourceListInterface) : void {
        this.toggleGroup(groupName, true);
    }
}
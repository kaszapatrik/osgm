import { ResourceListInterface } from './resourcelistinterface';
import { ResourceInterface } from './resourceinterface';
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
        if (typeof this.resourceListGroupsIndex[groupName] === 'undefined') {
            for (let i = 0, n = this.resourceList.length; i < n; i++) {
                if (this.resourceList[i].name === groupName) {
                    this.resourceListGroupsIndex[groupName] = i;

                    return this.resourceList[i];
                }
            }
        } else {
            const listItem = this.resourceList[this.resourceListGroupsIndex[groupName]];
            if (typeof listItem !== 'undefined') {
                return listItem;
            } else {
                return null;
            }
        }

        return null;
    }

    public getGroupIconImage(groupName : string, hasAlwaysReturnIcon = false) : string | null {
        const icons : {[key : string] : string | null} = {
            sprites: './assets/images/icon_sprite.png',
            sounds: './assets/images/icon_sound.png',
            backgrounds: './assets/images/icon_background.png',
            models: './assets/images/icon_model.png',
            materials: './assets/images/icon_material.png',
            scripts: './assets/images/icon_script.png',
            fonts: './assets/images/icon_font.png',
            objects: './assets/images/icon_object.png',
            rooms: './assets/images/icon_room.png',
        };

        if (icons.hasOwnProperty(groupName)) {
            if (hasAlwaysReturnIcon) {
                return icons[groupName];
            }
            else {
                // that resources using unique pictures
                const excluded = ['sprites', 'backgrounds', 'objects'];

                return excluded.indexOf(groupName) === -1 ? icons[groupName] : null;
            }
        }
        else {
            return null;
        }
    }

    public getGroupName(groupName : string, isCapitalized = false) : string {
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

        return names.hasOwnProperty(groupName)
            ? (isCapitalized
                ? `${names[groupName].substring(0, 1).toLocaleUpperCase()}${names[groupName].substring(1)}`
                : names[groupName]
            )
            : '';
    }

    private getGroupItemName(groupName : string, id : number) : string {
        const name = this.getGroupName(groupName);

        return name !== '' ? `${name}${id}` : '';
    }

    private getResourceDetailsByGroupName(groupName : string) : any {
        const details : {[key : string] : any} = {};

        switch (groupName) {
            case 'sprites': {
                details['url'] = null;
                details['image'] = new Image();
                details['width'] = 0;
                details['height'] = 0;
                details['origin'] = { x: 0, y: 0 };

                details['subimages'] = {
                    list: [],
                    width: 0,
                    height: 0,
                    count: 0,
                    // TODO horizontal/vertical separator, columns
                };

                details['image'].onload = () => {
                    details['width'] = details['image'].naturalWidth;
                    details['height'] = details['image'].naturalHeight;
                };

                break;
            }
        }

        return details;
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

        if (!item.hasOwnProperty('icon')) {
            item['icon'] = this.getGroupIconImage(groupName);
        }

        item['resourceType'] = groupName;
        item['details'] = this.getResourceDetailsByGroupName(groupName);

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

        const newItemId = resourceGroup.list.length - 1,
            newItemDataId = `${groupName}${newItemId}`;

        item['uniqueId'] = newItemDataId;

        // select the new item
        this.setSelectedItem(newItemDataId);

        Globals.openModal(groupName, newItemId);
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

    public getResource(groupName : string, itemId : number) : ResourceInterface | null {
        const resourceGroup = this.getGroup(groupName);
        if (resourceGroup !== null) {
            const index = this.getItemIndex(groupName, itemId);
            if (index > -1) {
                return resourceGroup.list[index];
            }
        }

        return null;
    }
}
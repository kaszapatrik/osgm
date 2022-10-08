import { ResourceListInterface } from './resourcelistinterface';

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

    public addItem(groupName : string, item : object = {}) : void {
        const resourceGroup = this.getGroup(groupName);

        if (resourceGroup === null) {
            return;
        }

        resourceGroup.list?.push(item);
    }

    public setSelectedItem(name : string | null) : void {
        this.selectedItem = name;
    }

    public getSelectedItem() : string | null {
        return this.selectedItem;
    }

    public toggleGroup(group : ResourceListInterface) : void {
        group.isOpen = !group.isOpen;
    }
}
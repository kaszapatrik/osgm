import { ResourceListInterface } from './resourcelistinterface';

export class ResourceList {
    private resourceList : Array<ResourceListInterface>;
    
    public constructor() {
        this.resourceList = [];
    }

    public add(name : string = '', title : string = '', isExpandable : boolean = true, isOpen : boolean = false, list = [], uniqueClass : string = '') : void {
        const resource = {
            name: name,
            title: title,
            isExpandable: isExpandable,
            isOpen: isOpen,
            list: list,
            uniqueClass: uniqueClass
        };

        this.resourceList.push(resource);
    }

    public get() : Array<ResourceListInterface> {
        return this.resourceList;
    }
}
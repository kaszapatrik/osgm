import { ResourceList } from './resourcelist';

export class Globals {
    public static resourceList : ResourceList;

    public static getResourceListInstance() : ResourceList {
        if (Globals.resourceList === undefined) {
            Globals.resourceList = new ResourceList();
        }

        return Globals.resourceList;
    }

    public static getResourceList() : Array<any> {
        return Globals.getResourceListInstance().get();
    }
}
import { ResourceInterface } from "./resourceinterface";

export class Resource {
    private data : ResourceInterface;

    public constructor(id : number, title : string, resourceType : string, icon : string | null, details : {[key : string] : any} = {}) {
        this.data = {
            id: id,
            title: title,
            resourceType: resourceType,
            icon: icon,
            details: details
        };
    }
}
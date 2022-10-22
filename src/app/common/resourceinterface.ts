export interface ResourceInterface {
    id : number;
    title : string;
    icon : string | null;
    resourceType : string;
    details : {[key : string] : any};
    uniqueId ?: string;
}
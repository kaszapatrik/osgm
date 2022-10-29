export interface ResourceInterface {
    id : number;
    title : string;
    icon : string | null;
    resourceType : string;
    // TODO details interface by resourcelist datas
    details : {[key : string] : any};
    uniqueId ?: string;
}
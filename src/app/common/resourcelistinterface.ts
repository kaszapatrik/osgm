export interface ResourceListInterface {
    name : string;
    title : string;
    isExpandable : boolean;
    isOpen ?: boolean;
    // TODO
    list ?: Array<any>;
    uniqueClass ?: string;
}
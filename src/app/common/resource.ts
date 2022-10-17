import { ResourceInterface } from "./resourceinterface";

export class Resource {
    private data : ResourceInterface;

    public constructor(id : number, title : string, image : string | null) {
        this.data = {
            id: id,
            title: title,
            image: image,
        };
    }
}
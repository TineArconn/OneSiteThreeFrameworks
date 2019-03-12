import { IPeople } from '../interfaces/people';
import { ITrip } from '../interfaces/trip';

export class Trip implements ITrip {
    id: number;
    title: string;
    description: string;
    time: string;
    peoples: IPeople[];
    imageUrl: string;
    tags: string[];

    constructor({id, title, description, time, peoples, imageUrl, tags}){
        this.id = id;
        this.time = time;
        this.tags = tags;
        this.description = description;
        this.imageUrl = imageUrl;
        this.title = title;
        this.peoples = peoples;
    }

}

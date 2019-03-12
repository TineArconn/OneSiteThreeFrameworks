import { IPeople } from './people';

export interface ITrip {
    id: number;
    title: string;
    description: string;
    time: string;
    imageUrl: string;
    peoples: IPeople[];
    tags: string[];
}

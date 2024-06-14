export interface Character {
    id: number;
    name: string;
    status: string;
    image: string;
    species: string;
    location:{
        name: string;
    },
    origin: {
        name: string;
    },
    gender:string;
}
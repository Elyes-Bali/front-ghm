

export class User{
    id?:number;
    nom?:string;
    username?:string;
    email?:string;
    password?:string;
    gender?:string;
    prenom?:string;
    rating?:number;
    desctiption?:string;
    achievments?:string;
    fears?:string;
    age?:number;
    roles?: string; // Enumérations devraient être traitées différemment
    connected?: boolean;
    banned?: boolean;
}
import { seminar } from "./seminar";

export class student{
    
    constructor( public id:number,public fName:string,public lName:string,public seminar:seminar,public img:string,public phone:number) {
        
    }
}
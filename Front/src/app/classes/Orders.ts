import { DatePipe } from "@angular/common";

export class Orders {

    constructor(public id?: number, public codeUser?: number,public name?: string, public orderDate?: Date, public orderTime?: DatePipe , public codeTrip?: number,public destination?: string,public date?:Date, public numberOfPlaces?: number) {

    }
}
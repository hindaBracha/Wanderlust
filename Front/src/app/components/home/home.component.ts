import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
// import { Product } from '../../domain/product';
// import { ProductService } from '../../service/productservice';
import { Trip } from 'src/app/classes/Trip';
import { TripService } from 'src/app/services/trip.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
value:string="ssd";
// products: any[] | undefined;

products: Trip[] =[];

responsiveOptions: any[] | undefined;

constructor(private productService: TripService,public r:Router) {}

ngOnInit() {
    
    this.productService.getAllTrips().subscribe(
        succ => { this.products = succ 
          console.log("ListTTTT", this.products);
        },
        err => { console.log(err) }
      );

    this.responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
}

getSeverity(status: number) {
    if (status > 20) {
        return 'success';
    } else if (status < 20) {
        return 'danger';
    } else {
        return 'warning ';
    }
}
pass(id:number){
    this.r.navigate([`/SingleTrip`,id])
}
alert(destination:string){
    Swal.fire({
        title: `The trip:${destination} has been added to favorites!`,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
}
// getSeverity(status: number) {
//     switch (status) {
//         case 30:
//             return 'success';
//         case 40:
//             return 'warning';
//         case 90:
//             return 'danger';
//         default: return 'rrr'
//     }
}


   

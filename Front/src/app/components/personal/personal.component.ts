import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/classes/Trip';
import { UserService } from 'src/app/serv/user.service';
import { TripService } from 'src/app/services/trip.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  swalWithHtml = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger mr-2'
    },
    buttonsStyling: false,
    iconHtml: '<i class="pi pi-info-circle" style="font-size: 2rem;"></i>'
  });

  constructor(public ts: TripService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ts.getTripById(3).subscribe(foundTrip => {
          console.log("jj",foundTrip);
          this.trip = foundTrip;
          this.avelbleplaces = foundTrip.availablePlaces!;
          console.log("fcc", this.trip);
        });
    // this.route.params.subscribe(params => {
    //   this.ts.getTripById(params['id']).subscribe(foundTrip => {
    //     console.log("jj",foundTrip);
    //     this.trip = foundTrip;
    //     this.avelbleplaces = foundTrip.availablePlaces!;
    //     console.log("fcc", this.trip);
    //   });
    // });
  }

  trip: Trip | undefined
  avelbleplaces: number = 0
  places: number = 1
  bool: boolean = false

  showAlert(icon: SweetAlertIcon, title: string, html: string): Promise<any> {
    return this.swalWithHtml.fire({
      icon: icon,
      title: title,
      html: html,
      showCancelButton: true,
      confirmButtonText: 'אישור',
      cancelButtonText: 'ביטול'
    });
  }

  handleClick() {
    let html = `
      <div class="container mt-3">
        <div>${this.avelbleplaces}</div>
        <ul class="pagination">
          <li class="page-item"><a class="page-link" (click)="handleAction('inc')" style="background-color: aquamarine;">+</a></li>
          <li class="page-item"><a class="page-link">${this.places}</a></li>
          <li class="page-item"><a class="page-link" (click)="handleAction('dic')">-</a></li>
        </ul>
      </div>
    `;
  
    this.showAlert('question', 'בחר פעולה', html).then((result) => {
      if (result.isConfirmed) {
        // Your logic here
      }
    });
  }

  handleAction(action: string) {
    if (action === 'inc') {
      this.inc();
    } else if (action === 'dic') {
      this.dic();
    }
  }

  inc() {
    if (this.avelbleplaces > 0) {
      this.places++;
      this.avelbleplaces--;
      this.bool = false;
    } else {
      this.bool = true;
      const html = `
        <div class="container mt-3">
          <div>${this.avelbleplaces}</div>
          <ul class="pagination">
            <li class="page-item"><a class="page-link" (click)="handleAction('inc')" style="background-color: aquamarine;">+</a></li>
            <li class="page-item"><a class="page-link">${this.places}</a></li>
            <li class="page-item"><a class="page-link" (click)="handleAction('dic')">-</a></li>
          </ul>
        </div>
      `;
  
      this.showAlert('error', 'אין מספיק מקומות', html);
    }
  }

  dic() {
    if (this.places > 1) {
      this.places--;
      this.avelbleplaces++;
      this.bool = false;
    } else {
      const html = `
        <div class="container mt-3">
          <div>${this.avelbleplaces}</div>
          <ul class="pagination">
            <li class="page-item"><a class="page-link" (click)="handleAction('inc')" style="background-color: aquamarine;">+</a></li>
            <li class="page-item"><a class="page-link">${this.places}</a></li>
            <li class="page-item"><a class="page-link" (click)="handleAction('dic')">-</a></li>
          </ul>
        </div>
      `;
  
      this.showAlert('warning', 'לא ניתן להפחית', html);
    }
  }
}





//   showAlert(icon: SweetAlertIcon, title: string, html: string) {
//     return this.swalWithHtml.fire({
//       icon: icon,
//       title: title,
//       html: html,
//       showCancelButton: true,
//       confirmButtonText: 'אישור',
//       cancelButtonText: 'ביטול'
//     });
//   }







//   inc() {
//     if (this.avelbleplaces > 0) {
//       this.places++;
//       this.avelbleplaces--;
//       this.bool = false;
//     } else {
//       this.bool = true;
//       const html = `
//         <div class="container mt-3">
//           <div>${this.avelbleplaces}</div>
//           <ul class="pagination">
//             <li class="page-item"><a class="page-link" onclick="handleClick('inc')" style="background-color: aquamarine;">+</a></li>
//             <li class="page-item"><a class="page-link">${this.places}</a></li>
//             <li class="page-item"><a class="page-link" onclick="handleClick('dic')">-</a></li>
//           </ul>
//         </div>
//       `;
  
//       this.showAlert('error', 'אין מספיק מקומות', html);
//     }
//   }
  
//   dic() {
//     if (this.places > 1) {
//       this.places--;
//       this.avelbleplaces++;
//       this.bool = false;
//     } else {
//       const html = `
//         <div class="container mt-3">
//           <div>${this.avelbleplaces}</div>
//           <ul class="pagination">
//             <li class="page-item"><a class="page-link" onclick="handleClick('inc')" style="background-color: aquamarine;">+</a></li>
//             <li class="page-item"><a class="page-link">${this.places}</a></li>
//             <li class="page-item"><a class="page-link" onclick="handleClick('dic')">-</a></li>
//           </ul>
//         </div>
//       `;
  
//       this.showAlert('warning', 'לא ניתן להפחית', html);
//     }
//   }

//   handleClick = (action: string) => {
//     if (action === 'inc') {
//       this.inc();
//     } else if (action === 'dic') {
//       this.dic();
//     }
//   };




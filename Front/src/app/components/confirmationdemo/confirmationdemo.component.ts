

// export class ConfirmationdemoComponent {
// }
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../serv/ticketservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmationdemo',
  templateUrl: './confirmationdemo.component.html',
  styleUrls: ['./confirmationdemo.component.css']
    
})
export class ConfirmationdemoComponent implements OnInit {
    ticketInformation: any;

    constructor(public ticketService: TicketService, private router: Router) {}

    ngOnInit() {
        this.ticketInformation = this.ticketService.ticketInformation;
        this.setupCamera();

    }

    complete() {
        this.ticketService.complete();
    }

    prevPage() {
        this.router.navigate(['signal/payment']);
    }
    setupCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                const video = document.querySelector('video') as HTMLVideoElement;
                if (video) {
                    video.srcObject = stream;
                    if (video && video.readyState >= 2) {
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        context?.drawImage(video, 0, 0, canvas.width, canvas.height);
                        debugger
                        sessionStorage.setItem("currentpic",canvas.toDataURL('image/png'))
                       
                    }
                }
            })
            .catch((err) => {
                console.error('Error accessing camera: ', err);
            });

    }
}
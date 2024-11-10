import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../classes/User';
import { Router } from '@angular/router';
import { ImageService } from './image.service';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    pic: string | undefined;
    newUser: User
    a: Number = 0
    imageDataURL: string | undefined;
    Id: number = 0
    constructor(public http: HttpClient, public UserService: UserService, public r: Router, public Is: ImageService) {
        this.newUser = new User(0, ",", ",", "", ",", ",", 1)
    }
    
    ticketInformation = {
        personalInformation: {
            firstname: '',
            lastname: '',
            age: null
        },
        seatInformation: {
            class: null,
            wagon: null,
            seat: null
        },
        paymentInformation: {
            cardholderName: '',
            cardholderNumber: '',
            date: '',
            cvv: '',
            remember: false
        }
    };

    private paymentComplete = new Subject<any>();

    paymentComplete$ = this.paymentComplete.asObservable();

    getTicketInformation() {
        return this.ticketInformation;
    }

    setTicketInformation(ticketInformation: any) {
        this.ticketInformation = ticketInformation;

    }

    complete() {

        this.newUser = new User(0, this.ticketInformation.personalInformation.firstname, this.ticketInformation.personalInformation.lastname, this.ticketInformation.personalInformation.age + ""
            , this.ticketInformation.paymentInformation.cardholderName, this.ticketInformation.paymentInformation.cardholderNumber, this.a = this.ticketInformation.paymentInformation.remember ? 0 : 1)
        this.addUser()
        this.paymentComplete.next(this.ticketInformation.personalInformation);
        this.r.navigate([`./Home`])

    }
    addUser() {
        this.UserService.addUser(this.newUser).subscribe(
            succ => {
                debugger
                this.Id = succ
                this.newUser.id=this.Id
                this.pict()
                // localStorage.setItem('currentuser', this.Id + "")
                this.UserService.setCurrentuser(this.newUser)
                console.log("work")
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            },

            err => { console.log("err") }
        )
    }
    pict() {
        this.setupCamera();
        this.captureImage();
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
                        this.imageDataURL = canvas.toDataURL('image/png');
                    }
                }
            })
            .catch((err) => {
                console.error('Error accessing camera: ', err);
            });

    }
    captureImage() {
        const video = document.querySelector('video') as HTMLVideoElement;

        if (video && video.readyState >= 2) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context?.drawImage(video, 0, 0, canvas.width, canvas.height);
            // this.imageDataURL = canvas.toDataURL('image/png');
            // יצירת קובץ מהתמונה
            canvas.toBlob((blob) => {
                const file = new File([blob!], 'captured-image.png', { type: 'image/png' });
                // שליחת הקובץ לשרת
                this.uploadImage(file);
            }, 'image/png');
        }
    }
    uploadImage(file: File) {
        this.Is.uploadImage(file, this.Id).subscribe(
            succ => {
                this.pic = `https://localhost:7292/api/getImage/${this.Id}`
                // localStorage.setItem('currentpic', this.pic + "")
                // sessionStorage.setItem('currentpic', this.pic + "")
               this.UserService.setcurrentimg(this.pic)
                console.log('התמונה נשלחה בהצלחה!', succ);
            },
            err => {
                console.log('שגיאה בשליחת התמונה:', err);
            }
        );
        this.stopCamera();
    }
    stopCamera() {
        const video = document.querySelector('video') as HTMLVideoElement;
        if (video.srcObject) {
            const tracks = (video.srcObject as MediaStream).getTracks();
            tracks.forEach(track => track.stop());
            video.srcObject = null;
        }
    }

}





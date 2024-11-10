import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.css']
})
export class ProfileComponentComponent {
  imageDataURL: string | undefined;
  
  ngOnInit() {
    this.setupCamera();
  }
 
  setupCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        const video = document.querySelector('video') as HTMLVideoElement;
        if (video) {
          video.srcObject = stream;
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
  
      this.imageDataURL = canvas.toDataURL('image/png');
    }
  }
  // captureImage() {
  //   const video = document.getElementById('user-camera') as HTMLVideoElement;
  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d');

  //   video.addEventListener('loadedmetadata', () => {
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     context?.drawImage(video, 0, 0, canvas.width, canvas.height);

  //     this.imageDataURL = canvas.toDataURL('image/png');
  //     // שליחת התמונה לשרת או שמירה בבסיס נתונים
  //   });
  }


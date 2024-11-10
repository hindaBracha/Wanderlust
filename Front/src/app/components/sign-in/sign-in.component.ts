import { IfService } from './../../serv/if.service';
import { TicketService } from './../../serv/ticketservice.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent  implements OnInit{
  items: MenuItem[];
  
    subscription: Subscription
    @Output() sendDataToParentEvent = new EventEmitter<void>();

    sendDataToParent() {
      this.sendDataToParentEvent.emit();
    }
    constructor(public r:Router, public MessageService: MessageService, public TicketService: TicketService,public IfService:IfService) {
        this.items = [];
        this.subscription=new Subscription();
    }

    ngOnInit() {
        sessionStorage.setItem("ok","false") 
        this.IfService.ok=false
        console.log("j",this.IfService.ok);
        
        this.items = [
            {
                label: 'Personal',
                routerLink: 'personal'
            },
            {
                label: 'Seat',
                routerLink: 'seat'
            },
            {
                label: 'Payment',
                routerLink: 'payment'
            },
            {
                label: 'Confirmation',
                routerLink: 'confirmation'
            }
        ];

        this.subscription = this.TicketService.paymentComplete$.subscribe((personalInformation) => {
            this.MessageService.add({ severity: 'success', summary: 'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.' });
        });
    }
//      id:, name:, lastName:, cellPhone:, email:, password:, facertificate:) {

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.sendDataToParent();
    }
    login(){
      this.r.navigate([`/login`])
    }
}

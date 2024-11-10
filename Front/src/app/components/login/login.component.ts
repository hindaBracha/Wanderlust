import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/User';
import { ImageService } from 'src/app/serv/image.service';
import { UserService } from 'src/app/serv/user.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

    constructor(public Us: UserService, public r: Router, public imgS: ImageService) { }
    ngOnInit(): void {
    }
    wantChen: boolean = false
    newUser: User = new User();
    pass: string | undefined
    email: string | undefined
    ListU: Array<User> = new Array<User>()

    send() {
        this.Us.getUserById(this.email!, this.pass!).subscribe(
            succ => {
                debugger
                this.newUser = succ
                if (this.newUser) {
                    // localStorage.setItem('currentuser', this.newUser.id + "")
                    // sessionStorage.setItem('pic', `https://localhost:7292/api/getImage/${this.newUser.id}`)
                    this.Us.setCurrentuser(this.newUser!)
                    this.Us.setcurrentimg("https://localhost:7292/api/getImage/"+this.newUser.id)
                    console.log(""+ this.Us.getcurrentimg());
                    
                    // this.getPic(succ.id!)
                    this.wantChen = true
                    this.r.navigate([`./Home`])
                    Swal.fire({
                        title: `hi ${this.newUser.name}!`,
                        text: "we are so happy to see you back!!",
                        // confirmButtonText: ` <i class="fa fa-thumbs-up"></i>`,
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
                else
                    alert("הסיסמא או כתובת המייל אינה נכונה")

            },
            err => {
                console.log(err);
            }
        );

    }
    signal() {
        this.r.navigate([`/signal`])

    }
    getPic(id: number) {

        // this.imgS.getAllImages().subscribe(
        //     suc => {
        //         this.Us.setcurrentimg(suc.find(p => p == "https://localhost:7292/images/" + id + ".png")!)
        //         console.log("ddgd", this.Us.getcurrentimg());

        //     },
        //     err => {

        //     }

        // )
    }
}

import { Component, OnInit } from '@angular/core';
import { Auth2Service } from './core/services/auth2.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private router: Router, private auth2Service: Auth2Service,) { }


  ngOnInit() {

    // this.auth2Service.logout()
    //  this.router.navigate(['/auth/login']);
  }
}

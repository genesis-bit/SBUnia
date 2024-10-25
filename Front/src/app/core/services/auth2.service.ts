import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralConstants } from '../constants/GeneralConstants';

import { map } from 'rxjs/operators';
import { User } from 'src/app/store/Authentication/auth.models';

@Injectable({
  providedIn: 'root'
})
export class Auth2Service {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private isUserLoged = new BehaviorSubject<boolean>(false);

  constructor(
    private _http: HttpClient, private router: Router
  ) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  verifyUserLoged() {
    if (localStorage.getItem(GeneralConstants.USER_AUTH.TOKEN_KEY) != null) {
      this.isUserLoged.next(true);
    }
    return this.isUserLoged.asObservable();
  }

  setFoto(foto: string) {
    localStorage.setItem(GeneralConstants.USER_AUTH.USER_FOTO, foto);
  }

  setcurrentUser(user:any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);

  }


  setLogin(userToken: string, id: string, userName: string, bi: string, foto: string) {

    localStorage.setItem(GeneralConstants.USER_AUTH.TOKEN_KEY, userToken);
    localStorage.setItem(GeneralConstants.USER_AUTH.USERID_KEY, id);
    localStorage.setItem(GeneralConstants.USER_AUTH.USERNAME_KEY, userName);
    localStorage.setItem(GeneralConstants.USER_AUTH.USER_BI, bi);
    localStorage.setItem(GeneralConstants.USER_AUTH.USER_FOTO, foto);
    this.isUserLoged.next(true);
  }

  logout() {
    localStorage.removeItem(GeneralConstants.USER_AUTH.TOKEN_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERID_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERNAME_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERPROFILE_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USER_FOTO);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USER_BI);
    this.isUserLoged.next(false);
    localStorage.removeItem('isLoggedin');

    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }


  setMenu(menu: any) {
    let id = 0
    console.log(menu)
    for (let menu_item of menu) {
      if (menu_item?.code) {
        console.log(menu_item.code.toLowerCase())
        localStorage.setItem(menu_item.code.toLowerCase(), menu_item.code?.toLowerCase());
      }
    }
    console.log("adicionar menus localstrore**********************************************")
  }

  logoutMenu(menu: any) {
    for (let menu_item of menu) {
      if (menu_item?.code) {
        localStorage.removeItem(menu_item.code.toLowerCase());
        if (menu_item?.subItems) {
          for (let submi_item of menu_item?.subItems) {
            localStorage.removeItem(submi_item.code?.toLowerCase());
          }
        }
      }
    }
  }


  getToken() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.TOKEN_KEY);
  }

  getUserId() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USERID_KEY);
  }

  getCurrentUser() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USERNAME_KEY);
  }

  getUserBI() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USER_BI);
  }

  getCurrentFotoPerfil() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USER_FOTO);
  }
}

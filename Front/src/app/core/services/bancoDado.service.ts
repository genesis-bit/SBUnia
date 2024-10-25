import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Auth2Service } from "src/app/core/services/auth2.service";
import { environment } from "src/environments/environment";
import { GeneralConstants } from "../constants/GeneralConstants";

@Injectable({
  providedIn: "root",
})
export class BancoDado {
  private apiURL = "http://jsonplaceholder.typicode.com";
  // private apiURL = "http://192.168.100.115";

  constructor(
    private _http: HttpClient,
    private router: Router,
    private _AuthService: Auth2Service
  ) {}

//   onLogout(e: any) {
//     //  e.preventDefault();
//     localStorage.removeItem("isLoggedin");

//     if (!localStorage.getItem("isLoggedin")) {
//       this.router.navigate(["/login"]);
//     }
//   }


  execute(
    resource: string,
    operacao: any,
    body?: any,
    _blank?: string,
    params?: string
  ): Observable<any> {
    const user_id = this._AuthService.getUserId();
    const user_token = this._AuthService.getToken();
    const headers = new HttpHeaders().append(
      "Authorization",
      `Bearer ${user_token}`
    );

    let url = `${environment.baseUrl}/${resource}`;

    //url = `${url}?app_=NYUMUIH9j.2SADd3-n983hoiw`   // tecroval
    url = `${url}?app_=Bid3ojd7JDyf99DNaxeDI9399379289`; // inagbe

    // url = `${url}?app_=frvdt7JDyf9vdgbfFGE9342429`  //  inema

    // url = `${url}?app_=5FDV67JFGHDGWDSF86433323`  //  delivery


     

    if (params) url = url + "&" + params;
    // metodo para retonar dados da api com get
    if (operacao === GeneralConstants.CRUD_OPERATIONS.READ) {
      return this._http.get<any>(url, { headers }).pipe();
    } else if (operacao === GeneralConstants.CRUD_OPERATIONS.INSERT) {
      return this._http.post<any>(url, body, { headers });
    }

    if (typeof body?.get === "function") {
      body.id = body.get("id");
    }

    const id = body?.id
      ? body.id
      : operacao === GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE
      ? undefined
      : "";

    if (operacao === GeneralConstants.CRUD_OPERATIONS.GET) {
      if (_blank != "") {
        window.open(url, "_blank");
        return new Observable();
      }
      return this._http.get<any>(url, { headers }).pipe();
    } else if (operacao === GeneralConstants.CRUD_OPERATIONS.UPDATE) {
      return this._http.patch<any>(url, body, { headers });
    } else if (operacao === GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE) {
      return this._http.put<any>(url, body, { headers });
    } else if (operacao === GeneralConstants.CRUD_OPERATIONS.DELETE) {
      return this._http.delete<any>(url, { headers });
    }

    return new Observable();
  }

  salvar(
    resource: string,
    operacao: any,
    body?: any,
    _blank?: string,
    params?: string
  ): Observable<any> {
    const user_id = this._AuthService.getUserId();
    const user_token = this._AuthService.getToken();
    const headers = new HttpHeaders().append(
      "Authorization",
      `Bearer ${user_token}`
    );

    let url = `${environment.baseUrl}/${resource}`;

    //url = `${url}?app_=NYUMUIH9j.2SADd3-n983hoiw`   // tecroval
    url = `${url}?app_=Bid3ojd7JDyf99DNaxeDI9399379289`; // inagbe

    

    if (params) url = url + "&" + params;
    // metodo para retonar dados da api com get
    if (operacao === GeneralConstants.CRUD_OPERATIONS.READ) {
      return this._http.get<any>(url, { headers }).pipe();
    } else if (operacao === GeneralConstants.CRUD_OPERATIONS.INSERT) {
      return this._http.post<any>(url, body, { headers });
    }

    if (typeof body?.get === "function") {
      body.id = body.get("id");
    }

    const id = body?.id
      ? body.id
      : operacao === GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE
      ? undefined
      : "";

    if (operacao === GeneralConstants.CRUD_OPERATIONS.GET) {
      if (_blank != "") {
        window.open(url, "_blank");
        return new Observable();
      }
      return this._http.get<any>(url, { headers }).pipe();
    } else if (operacao === GeneralConstants.CRUD_OPERATIONS.UPDATE) {
      return this._http.patch<any>(url, body, { headers });
    } else if (operacao === GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE) {
      return this._http.put<any>(url, body, { headers });
    } else if (operacao === GeneralConstants.CRUD_OPERATIONS.DELETE) {
      return this._http.delete<any>(url, { headers });
    }

    return new Observable();
  }

}

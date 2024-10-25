import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

import { Auth2Service } from 'src/app/core/services/auth2.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private auth: Auth2Service,
    private spinner: NgxSpinnerService,
    public toasterService: ToastrService,
    private authService: Auth2Service) {
  }

  private setHeaders(req: HttpRequest<any>) {
    const token = this.auth.getToken();
    ////console.log(token)
    if (!token) {
      return req;
    }
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
  }

  private showToastMessage(messageType, message, title?) {
    if (messageType != 0) {
      this.toasterService.clear();
    } 
    if (messageType === 1) {
      this.toasterService.success(message, 'Mensagem de Sucesso');
    } else if (messageType === 2) {
      this.toasterService.warning(message, 'Mensagem de Alerta');
    } else if (messageType === 3) {
      this.toasterService.error(message, title ? title : 'Mensagem de Alerta');
    } 
  }
  private showToastMessage2(messageType, message, title?) {
    if (messageType != 0) {
      this.toasterService.clear();
    }

    if (messageType === 1) { 
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Mensagem de Sucesso',
        text: message,
        showConfirmButton: false,
        timer: 2000,
     //   background: '#0c1427', 
      }) 
      //   this.toasterService.success(message, 'Mensagem de Sucesso');
    } else if (messageType === 2) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Atenção...',
        text: message,
        showConfirmButton: false,
        timer: 2000,
        background: '#0c1427'
      })
      //     this.toasterService.warning(message, 'Mensagem de Alerta');
    } else if (messageType === 3) {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Atenção...',
        text: message,
        showConfirmButton: false,
        timer: 2000,
      //  background: '#0c1427'
      })
      //   this.toasterService.error(message, title ? title : 'Mensagem de Alerta');
    }

  }




  contador: number = 0;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.contador++;
    if (this.contador === 1) {
      this.spinner.show();
    }

    req = this.setHeaders(req);

    return next.handle(req).pipe(tap(evt => {
      if (evt instanceof HttpResponse) {
        this.contador--;
//console.log(evt)

        this.showToastMessage(evt?.body?.messageType, evt?.body?.message)
      }
    }), catchError((err: HttpErrorResponse) => {

      this.contador--;

      if (err.error instanceof ErrorEvent) {
        //console.log(`Error: ${err.error.message}`);
      } else {
        //console.log(`Error Code: ${err.status}\nMessagem: ${err.message}`);
      }

      let title = 'Comunicação';
      let errorMessage = 'Não foi possível comunicar-se com o servidor';

      if (err.status == 401) {
        title = 'Erro de Autenticação';
        errorMessage = 'Não foi possível aceder ao recurso solicitado';
        this.authService.logout();
      }

      //    this.showToastMessage(3, errorMessage, title);
      if (this.contador === 0) {
        this.spinner.hide();
      }

      return throwError(err);
      // return throwError(err).subscribe;
    }), finalize(() => {
      if (this.contador === 0) {
        this.spinner.hide();
      }
    })
    );
  }
}

import { Injectable } from '@angular/core';
 import { ToastrService } from 'ngx-toastr';


 import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toasterService: ToastrService) { }

  showSuccess(message:any, title:any) {
    this.toasterService.success(message, title)
  }

  public showToastMessage(messageType:any, message:any, title?:any) {
    if (messageType != 0) {
      this.toasterService.clear();
    }
    if (messageType === 1) {
      setTimeout(() => {
        this.toasterService.success(message, 'Mensagem de Sucesso');
      }, 500);
    } else if (messageType === 2) {
      setTimeout(() => {
        this.toasterService.warning(message, 'Mensagem de Alerta');
      }, 500);
    } else if (messageType === 3) {
      setTimeout(() => {
        this.toasterService.error(message, title ? title : 'Mensagem de Alerta');
      }, 500);

    }
  }


  public notificationSuccess (mensagem:any) { 
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Parabens...',
      text: mensagem,
      showConfirmButton: false,
      timer: 3500
    })  
  }


  public notificationError (mensagem:any) { 
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Atenção...',
      text: mensagem,
      showConfirmButton: false,
      timer: 3500
    })  
  }

}
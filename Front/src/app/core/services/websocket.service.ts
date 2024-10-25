 
import { Injectable } from '@angular/core';
 
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client'; 
import { environment } from 'src/environments/environment'; 
 
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
 
  private  url:any = `${environment.baseUrlSocket}`;
  
  private socket = io(this.url);
 
  sendMessage(message: string){ 
    console.log("service websocket angular ..")
    console.log(message)
    this.socket.emit('new-message', message);
  }

  
  public getNewMessage = () => {
    this.socket.on('new-message', (message) =>{
      console.log("mesagem recebida de  broadcast....")
      console.log(message)
      this.message$.next(message); 
    });
    
    return this.message$.asObservable();
  };



  public getWsDashBoardOcorrencia = () => {
    this.socket.on('update_ocorrencia', (data) => {
      console.log("mesagem recebida de  broadcast users....")

      let message = data.data
      console.log(message)
      this.message$.next(message);

    });

    return this.message$.asObservable();
  };



  await() { 
    this.socket.on('new-message-broadcast', (data) => {

      console.log(" Informação vinda do servidor... await")
      console.log(data) 
      //this. socket.emit('notifique', { message: 'Ola Angular',type:1 })
    })
  }

 
}

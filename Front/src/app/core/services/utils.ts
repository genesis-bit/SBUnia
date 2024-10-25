import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private notifyService: NotificationService,
    private _http: HttpClient, private router: Router
  ) {
  }


  getDataHojeDiaMesAno() {
    const date_hoje = new Date()
    const date_hoje_iso = date_hoje.toISOString().slice(0, 10)
    return date_hoje_iso.substring(8, 10) + "/" + (date_hoje_iso.substring(5, 7)) + "/" + date_hoje_iso.substring(0, 4)

    return date_hoje_iso
  }

  getDataHojeAnoMesDia() {
    const date_hoje = new Date() 
    return date_hoje.toISOString().slice(0, 10)
  }
  getDataHoje() {
    const date_hoje = new Date()
    const date_hoje_iso = date_hoje.toISOString().slice(0, 10)
    return date_hoje_iso.substring(8, 10) + " de " + this.getMes(date_hoje_iso.substring(5, 7)) + " de " + date_hoje_iso.substring(0, 4)

  }

  getData(date_hoje_iso) {
    return date_hoje_iso.substring(8, 10) + " de " + this.getMes(date_hoje_iso.substring(5, 7)) + " de " + date_hoje_iso.substring(0, 4)

  }

  getMes(value) {
    switch (value) {
      case 1:
        return 'Janeiro';
        break
      case 2:
        return 'Fevereiro';
        break
      case 3:
        return 'Março';
        break
      case 4:
        return 'Abril';
        break
      case 5:
        return 'Maio';
        break
      case 6:
        return 'Junho';
        break
      case 7:
        return 'Julho';
        break
      case 8:
        return 'Agosto';
        break
      case 9:
        return 'Setembro';
        break
      case 10:
        return 'Outubro';
        break
      case 11:
        return 'Novembro';
        break
      case 12:
        return 'Dezembro';
        break
      default:
        ""
    }
  }


  getDiferencaDiasData2(date1, date2) {

    let dif_dias = 0;
    date1 = date1.substring(0, 10);
    date2 = date2.substring(0, 10);

    date1 = new Date(date1);
    date2 = new Date(date2);
    dif_dias = 0;
    if (date1 < date2)
    dif_dias = 0;
    else {
      let intervalo = date1.diff(date2);
     dif_dias = intervalo.days;
    }
    return dif_dias;
  }
  getDiferencaDiasData(date1, date2) {


    date1 = new Date(date1)

    date2 = new Date(date1)


    console.log(date1)
    console.log(date2)
    var ONE_DAY = 1000 * 60 * 60 * 24
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()
    var difference_ms = Math.abs(date1_ms - date2_ms)

    console.log(difference_ms)

    return Math.round(difference_ms / ONE_DAY)

  }
}

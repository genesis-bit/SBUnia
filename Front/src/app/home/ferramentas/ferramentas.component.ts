import { Component } from '@angular/core';
import {  vacancyData } from './data';

import { Universidade } from '../model/universidade';
import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';

@Component({
  selector: 'app-ferramentas',
  templateUrl: './ferramentas.component.html',
  styleUrls: ['./ferramentas.component.css']
})
export class FerramentasComponent {

  vacancyData: any;
  universidade = new Universidade();
  universidades: any;
  
  private _fetchData() {
    this.vacancyData = vacancyData;
  }

  constructor(private generalService: GeneralService){}

  ngOnInit(): void {
    this._fetchData();
    this.ListaUniversidade();
  }

  tables$: any;

  salvarUniversidade(){
    this.generalService.execute('universidades', GeneralConstants.CRUD_OPERATIONS.INSERT, this.universidade).
    subscribe((data: any)=>{
      this.universidade = new Universidade();
      this.ListaUniversidade();
    });
  }

  ListaUniversidade(){
    this.generalService.execute('universidades', GeneralConstants.CRUD_OPERATIONS.READ).
    subscribe((data: any)=>{
      this.universidades = data.data;
    });
  }

  EditarUniversidade(data: Universidade){
    this.universidade = {...data};
  }

}

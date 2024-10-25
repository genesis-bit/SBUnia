 
  import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';


  import { GeneralService } from 'src/app/core/services/general.service';
  import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
  
  import { Licenca } from 'src/app/roval/licenca/model/licenca';
  
  import { Observable } from 'rxjs';
  
  @Component({
    selector: 'app-tipo-agentes',
    templateUrl: './tipo-agentes.component.html',
    styleUrls: ['./tipo-agentes.component.css']
  })
  export class TipoAgentesComponent {
    // bread crumb items
    breadCrumbItems: Array<{}>;
    @ViewChild('search') search: ElementRef;
  
    //licencas: Observable<any>;
    licenca = new Licenca();
  
  
    licencas: Observable<any>;
    tipoAgentesResults$: Observable<any>;
  
  
    data_licencas:any
  
  
    constructor(private generalService: GeneralService) { }
  
  
    tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];
    filtro = {
      name_code: '',
      estado: '1',
      page: 1,
      pagesize: 5,
      total_itens: 0,
    };
    ngOnInit() {
      this.carregarLista();
      this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Basic Tables', active: true }];
    }
  
  
    pesquisarFitro() {
      this.filtro.page = 1;
      this.carregarLista();
    }
  
    onTableDataChange(event: any) {
      this.filtro.page = event;
      this.carregarLista();
    }
    onTableSizeChange(event: any): void {
      this.filtro.pagesize = event.target.value;
      this.filtro.page = 1;
      this.carregarLista();
    }
  
  
    carregarLista() {
  
  
      let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&name_code=${this.filtro.name_code}&estado=${this.filtro.estado}`;
  
      this.tipoAgentesResults$ = this.generalService.execute(`licencas`, GeneralConstants.CRUD_OPERATIONS.READ, '', '', params);
    //  this.filtro.total_itens=   this.tipoAgentesResults$ ?.data?.meta?.total 
    
    }
  
  
  }
  


import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective, } from "ngx-bootstrap/modal";
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { Router, ActivatedRoute } from "@angular/router";

import { Store } from '@ngrx/store';
import { fetchprojectData } from 'src/app/store/ProjectsData/project.actions';
import { selectData } from 'src/app/store/ProjectsData/project-selector';
import { GeneralService } from 'src/app/core/services/general.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
import { Actividade } from '../model/actividade';
import { UtilsService } from 'src/app/core/services/utils';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent {


  modalRef?: BsModalRef;
  @ViewChild("search") search: ElementRef;

  @ViewChild("newModal", { static: false })
  newModal?: ModalDirective;

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  totalItems = 12
  // bread crumb items
  breadCrumbItems: Array<{}>;
  total: any
  page: any = 1;
  endItem: any = 12;
  returnedArray: any;
  projectlist: any


  actividade = new Actividade();

  constructor(
    private router: Router,
    private utilsService: UtilsService,
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService
  ) { }
  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

  clientes: any;
  users:any
  areas:any
  tipo_actividades:any
  filtro = {
    name_code: "",
    estado: "1",
    page: 1,
    pagesize: 5,
    total_itens: 0,
    selectValue: "",
    cliente: "",
    nome_code: "",
  };
  estados = [
    { 'id': 1, nome: 'aberto' },
    { 'id': 2, nome: 'Aprovado' },
    { 'id': 3, nome: 'execução' },
    { 'id': 4, nome: 'revisão' },
    { 'id': 5, nome: 'concluido' },
    { 'id': 6, nome: 'fechado' },

  ]
  actividades: any
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'actividade' }, { label: 'Listar Actividades', active: true }];

    this.carregarLista()
    
    this.carregarAreas()

    this.carregarUsers()
    this.carregarTipoActividades()
  }

  carregarLista() {
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}`;
    this.generalService
      .execute(
        `actividades`,
        GeneralConstants.CRUD_OPERATIONS.READ, "", "", params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.actividades = res.data.data;
          this.filtro.total_itens = res.data.meta.total;

          console.log(res)
        }
      });
  }
  carregarAreas() {
    this.generalService
      .execute(`gd-areas`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.areas = res.data;

          }
        }
      });
  }
  carregarTipoActividades() {
    this.generalService
      .execute(`tipo-actividades`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            
            console.log(res)
            this.tipo_actividades = res.data;

          }
        }
      });
  }
  carregarUsers() {
    this.generalService
      .execute(`gd-users`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.users = res.data;
          }
        }
      });
  }

  pageChanged(event: PageChangedEvent): void {
    //  const startItem = (event.page - 1) * event.itemsPerPage;
    //  this.endItem = event.page * event.itemsPerPage;
    //  this.projectlist = this.returnedArray.slice(startItem, this.endItem);

    console.log(event)
    this.filtro.page = event.page;
    this.carregarLista();
  }


  getEstado(estado) {
    switch (estado) {
      case 1: return 'ABERTO';
      case 2: return 'APROVADO';
      case 3: return 'EXECUÇÃO';
      case 4: return 'REVISÃO';
      case 5: return 'CONCLUIDO';
      case 6: return 'FECHADO';
      default: return 'ABERTO';
    }
  }
  getEstadoCor(estado) {
    switch (estado) {
      case 1: return 'bg-danger';
      case 2: return 'bg-warning';
      case 3: return 'bg-primary';
      case 4: return 'bg-info';
      case 5: return 'bg-success';
      case 6: return 'bg-dark';

      default: return 'bg-danger';


    }

  }

  pesquisar() {
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

  carregarTipoDocumentos() {
    this.generalService
      .execute(`gd-documento-tipo`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            //   this.tipo_documentos = res.data;
          }
        }
      });
  }

  carregarPrioridadeDocumentos() {
    this.generalService
      .execute(`gd-documento-prioridade`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            //  this.prioridade_documentos = res.data;
          }
        }
      });
  }

  carregarDocumentosAcessos() {
    this.generalService
      .execute(`gd-documento-acesso`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            //   this.acesso_documentos = res.data;
          }
        }
      });
  }
  carregarViaTramissaoDocumentos() {
    this.generalService
      .execute(
        `gd-documento-via-transmissao`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            //     this.via_tramissao_documentos = res.data;
          }
        }
      });
  }

  save() {
    this.generalService
      .execute(
        "actividades",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.actividade
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");

        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.actividade = new Actividade();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  update() {
    this.generalService
      .execute(
        "actividades",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.actividade
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");

        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.actividade = new Actividade();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  } // Delete User
  remove(id: any) {
    // this.deleteId = id
    this.removeItemModal?.show();
  }


  detalhes(data: any) {
    this.router.navigate(['/actividade/actividade-detalhes/' + data.id]);

  }


  editar(data: any) {
    this.actividade = data;

    console.log(data)

    this.actividade.data_inicio   =  data?.data_inicio?.substring(0, 10);
    this.actividade.data_fim      =  data?.data_fim?.substring(0, 10);

    this.actividade.duracao = this.utilsService.getDiferencaDiasData(data.data_fim, data.data_inicio);

    this.newModal?.show();
  }

  actualizarDuracaoActividade(data) {
    this.actividade.data_inicio = data.data_inicio.substring(0, 10);
    this.actividade.data_fim = data.data_fim.substring(0, 10);
    this.actividade.duracao = this.utilsService.getDiferencaDiasData(data.data_fim, data.data_inicio);
 
  }
}

 
  import { Component, ViewChild, OnInit, ElementRef, TemplateRef } from '@angular/core';

  import { GeneralService } from 'src/app/core/services/general.service';
  import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
   
  
  import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
 
  import { NotificationService } from 'src/app/core/services/notification.service';
import { User } from '../model/user';
  
  @Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
  })
  export class UsersComponent {
  
    // bread crumb items
    breadCrumbItems: Array<{}>;
    @ViewChild('search') search: ElementRef;
  
  
  
    @ViewChild("newModal", { static: false })
    newModal?: ModalDirective;
  
  
    // @ViewChild("newContactModal", { static: false }) newModal?: ModalDirective;
    @ViewChild("newModal", { static: false })
    removeItemModal?: ModalDirective;
  
    modalRef?: BsModalRef;
    config: any = {
      backdrop: true,
      ignoreBackdropClick: true
    };
    name: any;
  
    user = new User();
    empresas: any
    grupos: any = [
      { id: '1', nome: 'admin' },
      { id: '2', nome: 'supervisor' },
      { id: '3', nome: 'tecnico' }]
  
    data_users: any
  
  
    constructor(private modalService: BsModalService,
  
      private NotificacaoService: NotificationService,
      private generalService: GeneralService) { }
  
  
    tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];
  
    clientes: any
    estados = [
      { id: "", 'nome': 'Todas users' },
      { id: "1", 'nome': 'users Disponível' }, 
      { id: "0", 'nome': 'users Inactivo' }, 
  
    ]
    tipo_utilizadores = [
      { id: "", 'nome': 'Todas users' },
      { id: "1", 'nome': 'ROVAL' },
      { id: "2", 'nome': 'Agentes' },
      { id: "3", 'nome': 'Empresas' },
      { id: "4", 'nome': 'Geral' },
  
    ]
    filtro = {
      name_code: '',
      estado: '1',
      page: 1,
      tipo_utilizador:0,
      pagesize: 5,
      total_itens: 0,
      selectValue: "",
      cliente: "",
      nome_code: "",
      time: "",
      data_expiracao: "",
      data_activacao: ""
    };
    ngOnInit() {
      this.carregarLista();
      this.  getEmpresas();
      this.breadCrumbItems = [{ label: 'Roval' }, { label: 'Gerir Licenças', active: true }];
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
  
    changeDataActivacao() {
      if (this.filtro.data_activacao) {
        this.filtro.estado = "";
        this.filtro.data_expiracao = ""
      };
      this.carregarLista()
  
    }
    changeDataExpiracao() {
      if (this.filtro.data_expiracao) {
        this.filtro.estado = "";
        this.filtro.data_activacao = ""
      };
      this.carregarLista()
    }
    changeDataEstado() {
      this.filtro.data_expiracao = ""
      this.carregarLista()
    }
    changeDataTipoUtilizador() {
      this.filtro.data_expiracao = ""
      this.carregarLista()
    }
  
    carregarLista() {
  
      let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&name_code=${this.filtro.name_code}&time=${this.filtro.time}&estado=${this.filtro.estado}&data_expiracao=${this.filtro.data_expiracao}&data_activacao=${this.filtro.data_activacao}`;
      this.generalService.execute(`users`, GeneralConstants.CRUD_OPERATIONS.READ, '', '', params)
        .subscribe((res: any) => {
          if (res.data) {
  
            this.data_users = res.data.data
            this.filtro.total_itens = res.data.meta.total
          }
        });
    }
  
    
    getEmpresas() { 
        this.generalService.execute(`empresas`, GeneralConstants.CRUD_OPERATIONS.READ )
        .subscribe((res: any) => {
  
          console.log(res)
          if (res.data) { 
            this.empresas = res.data 
          }
        });
    }
  
  
  
    resetPinForm(newModal: any, data) {
      this.user = data;
      this.user.password = ""
      this.user.pin = ""
      this.modalRef = this.modalService.show(newModal, { class: 'modal-xl' });
    }
    n
    resetPasswordForm(newModal: any, user) {
      this.user = user; 
      this.user.password = ""
      this.user.pin = ""
      this.modalRef = this.modalService.show(newModal, { class: 'modal-xl' });
    }
    newForm(newModal: any) {
      this.user = new User();
      
      this.modalRef = this.modalService.show(newModal, { class: 'modal-xl' });
    }
  
    editForm(newModal: any, user: any) {
      this.user = user;
      this.user.password = ""
      this.user.pin = ""
  
      console.log(this.user)
      this.modalRef = this.modalService.show(newModal, { class: 'modal-xl' });
    }
  
    salvar() {
      if (this.user?.id)
        this.actualizar()
      else
        this.salvarNovo()
    }
  
  
    save() {
      this.generalService
        .execute(
          "users",
          GeneralConstants.CRUD_OPERATIONS.INSERT,
          this.user
        )
        .subscribe((res: any) => {
          if (res.data) {
            this.NotificacaoService.notificationSuccess(res.message);
            this.carregarLista();
            this.modalRef?.hide()
            this.user = new User();
          } else {
            this.NotificacaoService.notificationError(res.message);
          }
        });
    }
  
    update() {
      console.log(this.user);
  
      this.generalService
        .execute(
          "gd-documento-entidade-acreditada",
          GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE,
          this.user
        )
        .subscribe((res: any) => {
          if (res.data) {
            this.NotificacaoService.notificationSuccess(res.message);
            this.carregarLista();
            this.user = new User();
          } else {
            this.NotificacaoService.notificationError(res.message);
          }
        });
    }
  
  
  
    salvarNovo() {
      this.generalService
        .execute('users', GeneralConstants.CRUD_OPERATIONS.INSERT, this.user).subscribe((res: any) => {
  
          if (res.data) {
            this.modalRef?.hide()
            this.carregarLista()
          }
        });
    }
    actualizar() {
      this.generalService.execute('actualizarUsuario', GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE, this.user).subscribe((res: any) => {
        if (res.data) {
          
          this.modalRef?.hide()
          this.carregarLista()
        }
      });
    }
  
    delete(data:any) { 
      data.estado=0
      this.generalService.execute('actualizarUsuario', GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE, data).subscribe((res: any) => {
        if (res.data) {
           
          this.carregarLista()
        }
      });
    }
  
  
    openModal(content: any) {
      this.modalRef = this.modalService.show(content);
    }
  
  
  
    /**
   * Open modal
   * @param content modal content
   */
    modalAdd(template: TemplateRef<any>, name: any) {
  
      this.user = new User()
      this.name = name
      this.modalRef = this.modalService.show(template, this.config);
    }
  
  
    modalEdit(template: TemplateRef<any>, data, name: any) {
  
      this.user = data
      this.name = name
      this.modalRef = this.modalService.show(template, this.config);
    }
  }
  
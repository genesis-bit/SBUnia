 
  import { Component, ViewChild, OnInit, ElementRef, TemplateRef } from '@angular/core';

  import { GeneralService } from 'src/app/core/services/general.service';
  import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
  
  import { Licenca } from 'src/app/roval/licenca/model/licenca';
  
  import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { SistemaOnline } from '../model/sistemaOnline';
  
  @Component({
    selector: 'app-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.css']
  })
  export class EmpresasComponent {
    // bread crumb items
    breadCrumbItems: Array<{}>;
    @ViewChild('search') search: ElementRef;
  
    @ViewChild('newContactModal', { static: false }) newModal?: ModalDirective;
  
    modalRef?: BsModalRef;
    config: any = {
      backdrop: true,
      ignoreBackdropClick: true
    }; 
   
    rovalSistemas: any; 
    sistemaOnline = new SistemaOnline();

  
  
    empresas: any 
  
  
    constructor(private modalService: BsModalService, private generalService: GeneralService) { }
  
  
    tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];
  
    clientes: any
    estados = [
      { id: "", 'nome': 'Todas licencas' },
      { id: "1", 'nome': 'Licencas Disponível' },
      { id: "0", 'nome': 'licencas Usadas' }, 
      { id: "4", 'nome': 'Por Expirar' },
  
    ]
  
    filtro = {
      name_code: '',
      estado: '1',
      page: 1,
      pagesize: 5,
      total_itens: 0,
      selectValue: "",
      cliente: "",
      nome_code: ""
    };
    ngOnInit() {
      this.carregarLista();
      this.breadCrumbItems = [{ label: 'Roval' }, { label: 'Gerir Empresas', active: true }];
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
  
  
    carregarLista() {
  
      console.log(this.filtro.estado)
      let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&name_code=${this.filtro.name_code}&estado=${this.filtro.estado}`;
      this.generalService.execute(`empresas`, GeneralConstants.CRUD_OPERATIONS.READ, '', '', params)
        .subscribe((res: any) => {
          if (res.data) {
  
            console.log(res.data)
            this.empresas = res.data.data
            this.filtro.total_itens = res.data.meta.total
          }
        });
    }
  
  
  
    salvar() {
      if (this.sistemaOnline?.id)
        this.actualizar()
      else
        this.salvarNovo()
    }
    salvarNovo() {
      this.generalService
        .execute('empresas', GeneralConstants.CRUD_OPERATIONS.INSERT, this.sistemaOnline).subscribe((res: any) => {
          console.log(res);
          if (res.data) {
            this.modalRef?.hide()
            this.carregarLista()
          }
        });
    }

    

    actualizar() {
      this.generalService.execute('empresas', GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE, this.sistemaOnline).subscribe((res: any) => {
        if (res.data) {
          this.modalRef?.hide()
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
    modalAdd(template: TemplateRef<any> ) {
  
      this.sistemaOnline = new SistemaOnline() 
      this.modalRef = this.modalService.show(template,{ class: 'modal-xl' },);
    }
    modalEdit(template: TemplateRef<any>, data : any,) {
  
      this.sistemaOnline = data
  
      console.log(data)
      this.modalRef = this.modalService.show(template,{ class: 'modal-xl' },);
    }
    pesquisarNif() { 
      console.log("pesquisar ao perder o focus" + this.sistemaOnline.nif)
      this.generalService.pesquisarNifAGT(`get/${this.sistemaOnline.nif}`, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
        (res: any) => {
  
          if (res.success == true) {
  
            console.log(res)
            let dados_agt = res.data;
            this.sistemaOnline.empresa = dados_agt.gsmc
            //  this.cliente.nome_ponto_focal = dados_agt.nameAbb
  
            this.sistemaOnline.telefone = dados_agt.lxfs
            this.sistemaOnline.endereco = dados_agt.nsrdz
  
          }
          else {
  
          }
        }
      ); 
    }
  
    configurarFacturacaoOnline(sistemaOnline) {
      this.generalService
        .execute('configurar-facturacao-online', GeneralConstants.CRUD_OPERATIONS.INSERT, sistemaOnline).subscribe((res: any) => {
          console.log(res);
          if (res.data) { 
            this.carregarLista()
          }
        });
    }
  

    configurarTableFacturacaoOnline(sistemaOnline) {
      this.generalService
        .execute('generate-table-online', GeneralConstants.CRUD_OPERATIONS.INSERT, sistemaOnline).subscribe((res: any) => {
          console.log(res);
          if (res.data) { 
            this.carregarLista()
          }
        });
    }
  
    configurarSeedsFacturacaoOnline(sistemaOnline) {
      this.generalService
        .execute('generate-seeds-online', GeneralConstants.CRUD_OPERATIONS.INSERT, sistemaOnline).subscribe((res: any) => {
          console.log(res);
          if (res.data) { 
            this.carregarLista()
          }
        });
    }
     
 
    configurarUserUpdateFacturacaoOnline(sistemaOnline) {
      this.generalService
        .execute('update-user-online', GeneralConstants.CRUD_OPERATIONS.INSERT, sistemaOnline).subscribe((res: any) => {
          console.log(res);
          if (res.data) { 
            this.carregarLista()
          }
        });
    }
    configurarNovoUserFacturacaoOnline(sistemaOnline) {
      this.generalService
        .execute('insert-novo-user-online', GeneralConstants.CRUD_OPERATIONS.INSERT, sistemaOnline).subscribe((res: any) => {
          console.log(res);
          if (res.data) { 
            this.carregarLista()
          }
        });
    }
 
  
  }
  
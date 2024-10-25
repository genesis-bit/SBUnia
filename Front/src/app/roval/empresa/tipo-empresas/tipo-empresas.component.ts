 


  import { Component, ViewChild, OnInit, ElementRef, TemplateRef } from '@angular/core';

  import { GeneralService } from 'src/app/core/services/general.service';
  import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
  
  import { Licenca } from 'src/app/roval/licenca/model/licenca';
  
  import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
  
  @Component({
    selector: 'app-tipo-empresas',
    templateUrl: './tipo-empresas.component.html',
    styleUrls: ['./tipo-empresas.component.css']
  })
  export class TipoEmpresasComponent {
    // bread crumb items
    breadCrumbItems: Array<{}>;
    @ViewChild('search') search: ElementRef;
  
    @ViewChild('newContactModal', { static: false }) newModal?: ModalDirective;
  
    modalRef?: BsModalRef;
    config: any = {
      backdrop: true,
      ignoreBackdropClick: true
    };
    name: any;
  
    licenca = new Licenca();
  
  
  
  
    data_licencas: any
  
  
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
      this.breadCrumbItems = [{ label: 'Roval' }, { label: 'Gerir Tipo de Empresa', active: true }];
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
      this.generalService.execute(`licencas`, GeneralConstants.CRUD_OPERATIONS.READ, '', '', params)
        .subscribe((res: any) => {
          if (res.data) {
  
            console.log(res.data)
            this.data_licencas = res.data.data
            this.filtro.total_itens = res.data.meta.total
          }
        });
    }
  
  
  
    salvar() {
      if (this.licenca?.id)
        this.actualizar()
      else
        this.salvarNovo()
    }
    salvarNovo() {
      this.generalService
        .execute('licencas', GeneralConstants.CRUD_OPERATIONS.INSERT, this.licenca).subscribe((res: any) => {
          console.log(res);
          if (res.data) {
            this.modalRef?.hide()
            this.carregarLista()
          }
        });
    }
    actualizar() {
      this.generalService.execute('licencas', GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE, this.licenca).subscribe((res: any) => {
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
    varyingModal(template: TemplateRef<any>, name: any) {
  
      this.licenca = new Licenca()
      this.name = name
      this.modalRef = this.modalService.show(template, this.config);
    }
  
  }
  
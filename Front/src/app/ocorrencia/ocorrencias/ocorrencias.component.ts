
import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  TemplateRef,
} from "@angular/core";

import { GeneralService } from "src/app/core/services/general.service";
import { GeneralConstants } from "src/app/core/constants/GeneralConstants";

import { NotificationService } from "src/app/core/services/notification.service";

import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from "ngx-bootstrap/modal";
import { PdfService } from "src/app/core/services/pdf.service";
import { zebraPrint } from "src/app/core/services/zebraPrint.service";
import { Ocorrencia } from "../model/ocorrencia";

import {
  UntypedFormGroup,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-ocorrencias-registo',
  templateUrl: './ocorrencias.component.html',
  styleUrls: ['./ocorrencias.component.css']
})
export class OcorrenciasComponent {

  momentForm!: FormGroup;

  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("modalFormulario", { static: false })
  modalFormulario?: ModalDirective;
  // @ViewChild("modalFormulario", { static: false }) newModal?: ModalDirective;
  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;

  @ViewChild("modalHistorico", { static: false })
  modalHistorico?: ModalDirective;

  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  name: any;

  dado_code_barra: any;
  createContactForm!: UntypedFormGroup;

  tipo_documentos: any;
  acesso_documentos: any;
  prioridade_documentos: any;
  via_tramissao_documentos: any;

  provincias: any;
  municipios: any;
  municipiosP: any;
  tipo_ocorrencias: any;
  estados_ocorrencias: any;
  via_tramissao_ocorrencias: any;
  local_solicitacoes: any;

  natureza_ocorrencia = [
    { id: 1, nome: "Particular" },
    { id: 2, nome: "Empresa" },
  ];

  ocorrencias: any;
  ocorrencia = new Ocorrencia();
  historicos: any;

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,

    private PdfService: PdfService,
    private zebraPrintZervice: zebraPrint
  ) { }

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

  estadoList = [
    {
      id: 1,
      nome: "Iniciado",
    },
    {
      id: 2,
      nome: "Atendido",
    },
    {
      id: 3,
      nome: "Falso",
    },
    {
      id: 4,
      nome: "Não Atendido",
    },
  ];

  clientes: any;


  filtro = {
    name_code: "",
    estado: "1",
    page: 1,
    pagesize: 5,
    total_itens: 0,
    selectValue: "",
    cliente: "",
    nome_code: "",
    ocorrencia_tipo_id: "",
    ocorrencia_estado_id: "",
    ocorrencia_via_transmissao_id: "",
    base_provincia_id: "",
    base_municipio_id: "",
    data_fim:"",
    data_inicio:""
  };

  ngOnInit() {
    this.carregarLista();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Ocorrências", active: true },
    ];
    this.carregarProvincias();
    this.carregarMunicipios();
    this.carregarTipoOcorrencias();
    this.carregarEstadoOcorrencias();
    this.carregarViaTramissaoOcorrencias();
    this.carregarLocalSolicitacoes();

    this.momentForm = new FormGroup({
      id: new FormControl(""),
      relatorio: new FormControl(""),
      pessoa_nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      ndi: new FormControl("", [Validators.required, Validators.minLength(2)]),
      descricao: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(65535),
      ]),
      ocorrencia_tipo_id: new FormControl("", [Validators.required]),
      data_ocorrencia: new FormControl("", [Validators.required]),
      ocorrencia_estado_id: new FormControl("", [Validators.required]),
      ocorrencia_via_transmissao_id: new FormControl("", [Validators.required]),
      base_municipio_id: new FormControl("", [Validators.required]),
      base_provincia_id: new FormControl("", [Validators.required]),
      ocorrencia_natureza: new FormControl("", [Validators.required]),
      ocorrencia_local_solicitacao_id: new FormControl("", [
        Validators.required,
      ]),
    });
  }

  get pessoa_nome() {
    return this.momentForm.get("pessoa_nome")!;
  }

  get data_ocorrencia() {
    return this.momentForm.get("data_ocorrencia")!;
  }

  get ndi() {
    return this.momentForm.get("ndi")!;
  }

  get descricao() {
    return this.momentForm.get("descricao")!;
  }

  get ocorrencia_tipo_id() {
    return this.momentForm.get("ocorrencia_tipo_id")!;
  }

  get ocorrencia_estado_id() {
    return this.momentForm.get("ocorrencia_estado_id")!;
  }

  get ocorrencia_via_transmissao_id() {
    return this.momentForm.get("ocorrencia_via_transmissao_id")!;
  }

  get ocorrencia_local_solicitacao_id() {
    return this.momentForm.get("ocorrencia_local_solicitacao_id")!;
  }

  get base_municipio_id() {
    return this.momentForm.get("base_municipio_id")!;
  }

  get base_provincia_id() {
    return this.momentForm.get("base_provincia_id")!;
  }

  get ocorrencia_natureza() {
    return this.momentForm.get("ocorrencia_natureza")!;
  }

  get relatorio() {
    return this.momentForm.get("relatorio")!;
  }

  pesquisar() {

console.log(this.filtro)
if (this.filtro.ocorrencia_tipo_id=== null)
  this.filtro.ocorrencia_tipo_id = ""
if (this.filtro.ocorrencia_estado_id === null)
  this.filtro.ocorrencia_estado_id = ""
if (this.filtro.ocorrencia_via_transmissao_id === null)
  this.filtro.ocorrencia_via_transmissao_id = ""
if (this.filtro.base_provincia_id === null)
  this.filtro.base_provincia_id = ""
if (this.filtro.base_municipio_id === null)
  this.filtro.base_municipio_id = ""
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
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}&data_inicio=${this.filtro.data_inicio}&data_fim=${this.filtro.data_fim}&ocorrencia_tipo_id=${this.filtro.ocorrencia_tipo_id}&ocorrencia_estado_id=${this.filtro.ocorrencia_estado_id}&ocorrencia_via_transmissao_id=${this.filtro.ocorrencia_via_transmissao_id}&base_provincia_id=${this.filtro.base_provincia_id}&base_municipio_id=${this.filtro.base_municipio_id}`;
    this.generalService
      .execute(
        `ocorrencias`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.ocorrencias = res.data.data;
          console.log(res);
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }
  carregarTipoOcorrencias() {
    this.generalService
      .execute(`ocorrencias-tipos`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.tipo_ocorrencias = res.data;
        }
      });
  }
  carregarHistoricos(data: any) {
    this.generalService
      .execute(`ocorrencias/${data.id}`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.historicos = res.data;
          console.log(this.historicos);
        }
      });
  }

  carregarLocalSolicitacoes() {
    this.generalService
      .execute(
        `ocorrencias-local-solicitacoes`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.local_solicitacoes = res.data;
          }
        }
      });
  }

  carregarProvincias() {
    this.generalService
      .execute(`base-provincias`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.provincias = res.data;
          }
        }
      });
  }

  carregarMunicipios() {
    this.generalService
      .execute(`base-municipios`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.municipios = res.data;
            this.municipiosP = res.data;
          }
        }
      });
  }

  carregarMunicipiosProvincia() {    
    this.generalService
      .execute(`municipios-provincia/${this.ocorrencia.base_provincia_id}`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.municipiosP = res.data;
        }
      });
  }

  carregarEstadoOcorrencias() {
    this.generalService
      .execute(`ocorrencias-estados`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.estados_ocorrencias = res.data;
          }
        }
      });
  }

  carregarViaTramissaoOcorrencias() {
    this.generalService
      .execute(
        `ocorrencias-via-transmissoes`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.via_tramissao_ocorrencias = res.data;
          }
        }
      });
  }

  // ImprimirTicket(data: any) {
  //   this.dado_code_barra = data;
  //   console.log(data);
  //   //  this.zebraPrintZervice.printTeste(data)
  //   //  this.print(data)

  //   this.PdfService.ticketDocumentoPdf(data);
  // }
  save() {
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.ocorrencia);
      console.log("ERROS", this.momentForm.errors);
      return;
    }
    console.log("DADOS válidos", this.ocorrencia);
    this.ocorrencia.base_pessoa_id = 1;
    this.ocorrencia.user_id = 1;
    //this.ocorrencia.ocorrencia_local_solicitacao_id = 1;
    console.log("DADOS válidos", this.ocorrencia);
    // this.ocorrencia.ocorrencia_estado_id = 1;

    this.generalService
      .execute(
        "ocorrencias",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.ocorrencia
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");
        console.log(res);
        if (res.data) {
          this.modalFormulario?.hide();
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.ocorrencia = new Ocorrencia();
          this.momentForm.reset();
          Object.keys(this.momentForm.controls).forEach((controlName) => {
            this.momentForm.controls[controlName].setErrors(null);
          });
          this.modalFormulario?.hide()
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }


  update() {
    this.generalService
      .execute(
        "gd-documento",
        GeneralConstants.CRUD_OPERATIONS.INSERT
        // this.documento
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");

        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.ocorrencia = new Ocorrencia();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  } // Delete User
  removeUser(id: any) {
    // this.deleteId = id
    this.removeItemModal?.show();
  }

  editar(ocorrencia: any) {
    this.ocorrencia = ocorrencia;
    this.modalFormulario?.show();
  }

  historico(ocorrencia: any) {
    //this.historicos = ocorrencia; 
    this.carregarHistoricos(ocorrencia);
    this.modalHistorico?.show();
  }



  getCorEstadoContrato(dado: any) {
    let cor = "";

    if (Number(dado) == 1) cor = "#005e0d";
    else if (Number(dado) == 2) cor = "#D81616";
    else cor = "#99AA99";

    return cor;
  }
  getCorEstadoMigracao(dado: any) {
    let cor = "";

    if (Number(dado) == 1) cor = "#005e0d";
    else cor = "#D81616";

    return cor;
  }


  ficha(ocorrencia: any) {
    console.log(ocorrencia)
    let params = `ocorrencia_id=${ocorrencia.id}`; 
    this.generalService.execute(`criar-ficha-ocorrencia`, GeneralConstants.CRUD_OPERATIONS.GET, "", "", params)
        .subscribe((res: any) => {
        if (res.data) { 
         console.log(res.data) 
       this.  baixarDocumento (res.data)
        } else {

        }
      });
  }

  
  baixarDocumento(doc: any) {

 
    this.generalService.execute(`ocorrencia-exportar-ficha/${doc}`, GeneralConstants.CRUD_OPERATIONS.GET, "", "_blank")
      .subscribe((res: any) => {
        if (res.data) { 
        
        }
      });
  }



}

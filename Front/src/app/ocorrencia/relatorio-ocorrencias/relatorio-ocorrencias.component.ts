

import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  TemplateRef,
} from "@angular/core";

import { GeneralService } from "src/app/core/services/general.service";
import { GeneralConstants } from "src/app/core/constants/GeneralConstants";

import { ExcelService } from "src/app/core/services/excel.service";
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
  selector: 'app-relatorio-ocorrencias',
  templateUrl: './relatorio-ocorrencias.component.html',
  styleUrls: ['./relatorio-ocorrencias.component.css']
})
export class RelatorioOcorrenciasComponent {

  momentForm!: FormGroup;

  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("modalFormulario", { static: false })
  modalFormulario?: ModalDirective;
  // @ViewChild("modalFormulario", { static: false }) newModal?: ModalDirective;
  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;

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
  tipo_ocorrencias: any;
  estados_ocorrencias: any;
  via_tramissao_ocorrencias: any;

  natureza_ocorrencia = [
    { id: 1, nome: "Particular" },
    { id: 2, nome: "Empresa" },
  ];

  ocorrencias: any;
  ocorrencia = new Ocorrencia();

  constructor(
    private pdfService: PdfService,
    private excelService: ExcelService,
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

    this.momentForm = new FormGroup({
      id: new FormControl(""),
      pessoa_nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      ndi: new FormControl("", [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
      ]),
      descricao: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(65535),
      ]),
      ocorrencia_tipo_id: new FormControl("", [Validators.required]),
      ocorrencia_estado_id: new FormControl("", [Validators.required]),
      ocorrencia_via_transmissao_id: new FormControl("", [Validators.required]),
      base_municipio_id: new FormControl("", [Validators.required]),
      base_provincia_id: new FormControl("", [Validators.required]),
      ocorrencia_natureza: new FormControl("", [Validators.required]),
    });
  }

  get pessoa_nome() {
    return this.momentForm.get("pessoa_nome")!;
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

  get base_municipio_id() {
    return this.momentForm.get("base_municipio_id")!;
  }

  get base_provincia_id() {
    return this.momentForm.get("base_provincia_id")!;
  }

  get ocorrencia_natureza() {
    return this.momentForm.get("ocorrencia_natureza")!;
  }

  pesquisar() {

    console.log(this.filtro)
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
          }
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
    this.ocorrencia.ocorrencia_local_solicitacao_id = 1
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


  exportarExcel() {

    // this.exportarPdf()

    //   this.bolseiroInternoRenovadoList.sort((a, b) => (a.nome < b.nome) ? -1 : 1);

    console.log(this.ocorrencias)
    let filtro = {
      numero_colunas: 15,
      coluna_calculo_total: -1,
      titulo: 'INEMA - INSTITUTO NACIONAL DE EMERGENCIAS MEDICAS ',
      nome_documento: " Todas Provincias",
      periodo: "ANO 2024",

      modelo_mapa: "RELATORIO GERAL "
    }
    let header1 = ['ATENDIMENTO', 'RECURSOS HUMANOS',
      'SOLICITAÇOES']

    let header2 = ['CLINICO', 'RH', 'AMBULÃNCIA', 'CHAMADAS']

    let header3 = [
      'PROVINCIA', 'TOTAIS ATENDIDOS', 'TRAUMA', 'CLINICO', 'GENOCO OBSTRETA', 'PEDIATRICO', 'PSICOLOGICO', 'COVID', 'TRANSF. INTER HOSPITALAR', 'TRANSF.INTER PROVINCIAL.', 'ASSEGURAMENTO DE EVENTOS', 'MÉDICOS	ENF.', 'MOTORISTAS', 'OPERACIONAL	NÃO OPERACIONAL', 'TELEFONE DE BASE', 'SOLICITAÇÃO DIRECTA', 'CISP', 'VERDADE', 'FALSA', 'SEM SUC.', 'NÃO ATENDIDOS'
    ]
    let dados = []
    let format_colunas = [
      { id: 1, width: 5, horizontal: 'left' },
      { id: 2, width: 40, horizontal: 'left' },
      { id: 3, width: 16, horizontal: 'left' },
      { id: 4, width: 40, horizontal: 'left' },
      { id: 5, width: 30, horizontal: 'left' },
      { id: 6, width: 15, horizontal: 'left' },
      { id: 7, width: 15, horizontal: 'left' },
      { id: 8, width: 10, horizontal: 'left' },
      { id: 9, width: 15, horizontal: 'left' },
      { id: 10, width: 15, horizontal: 'left' },
      { id: 11, width: 15, horizontal: 'left' },
      { id: 12, width: 25, horizontal: 'left' },
      { id: 13, width: 30, horizontal: 'left' },
      { id: 14, width: 30, horizontal: 'left' },
      { id: 15, width: 40, horizontal: 'left' },
      { id: 16, width: 40, horizontal: 'left' },
    ]

    let cont = 1
    for (let dado of this.ocorrencias) {

      let item = [
        cont++,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]
      dados.push(item);
    }
    this.excelService.generateExcel(dados, "", filtro, header3, format_colunas);
  }


}

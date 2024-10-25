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
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";



import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from "ngx-bootstrap/modal";
import { Documento } from "../model/gd";
import { UntypedFormGroup } from "@angular/forms";
import { PdfService } from "src/app/core/services/pdf.service";
import { zebraPrint } from "src/app/core/services/zebraPrint.service";

@Component({
  selector: "app-classificacao",
  templateUrl: "./classificacao.component.html",
  styleUrls: ["./classificacao.component.css"],
})
export class ClassificacaoComponent implements OnInit {
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
  momentForm!: FormGroup;

  dado_code_barra: any
  createContactForm!: UntypedFormGroup;

  tipo_documentos: any;
  acesso_documentos: any;
  prioridade_documentos: any;
  via_tramissao_documentos: any;
  documentos: any;
  documento = new Documento();

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,

    private PdfService: PdfService,
    private zebraPrintZervice: zebraPrint
  ) { }

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

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
  };
  ngOnInit() {
    this.carregarLista();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Classificador", active: true },
    ];
    this.carregarTipoDocumentos();
    this.carregarPrioridadeDocumentos();
    this.carregarViaTramissaoDocumentos();
    this.carregarDocumentosAcessos();

    this.momentForm = new FormGroup({
      id: new FormControl(""),
      codigo_documento: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
    gd_documento_via_transmissao_id: new FormControl("", [Validators.required]),
      remetente: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      destinatario: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      descricao: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      classificador: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      data_documento: new FormControl("", [Validators.required]),
     data_entrada_saida: new FormControl("", [Validators.required]),
     assunto: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      serie: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
	     codigo_arquivista: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
   origem_documento: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
    estado: new FormControl("", [Validators.required]),
    gd_tipo_documento_id: new FormControl("", [Validators.required]),
    gd_documento_despacho_id: new FormControl("", [Validators.required]),
    gd_ordem_referencia_id: new FormControl("", [Validators.required]),
    base_anexo_id: new FormControl("", [Validators.required]),
    gd_prioridade_documento_id: new FormControl("", [Validators.required]),
    user: new FormControl("", [Validators.required]),
    periodo_tratamento: new FormControl("", [Validators.required]),
    despacho: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
    icon: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
    despacho_entidade: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
    despacho_descricao: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
    gd_documento_acesso_id: new FormControl("", [Validators.required]),
    gd_estado_id: new FormControl("", [Validators.required]),
    numero_documento: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
    numero_registo: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
    ano_avaliacao_id: new FormControl("", [Validators.required]),
    data_despacho: new FormControl("", [Validators.required]),
	  telefone: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
    email: new FormControl("", [
        Validators.required,
        Validators.email,
      ]),
    sigla: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
    base_area_id: new FormControl("", [Validators.required]),
    user_id: new FormControl("", [Validators.required]),
    funcionario_id: new FormControl("", [Validators.required]),
    actividade_id: new FormControl("", [Validators.required]),
    user_despacho: new FormControl("", [Validators.required]),
    area_despacho: new FormControl("", [Validators.required]),
    area_despacho_conhecimento: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
    user_despacho_conhecimento: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ])
    });

  }

  //Metodos para validação
  get id() {
    return this.momentForm.get("id")!;
  }
  get nome() {
    return this.momentForm.get("nome")!;
  }
  get codigo_documento() {
    return this.momentForm.get("codigo_documento")!;
  }
  get gd_documento_via_transmissao_id() {
    return this.momentForm.get("gd_documento_via_transmissao_id")!;
  }
  get remetente() {
    return this.momentForm.get("remetente")!;
  }
  get destinatario() {
    return this.momentForm.get("destinatario")!;
  }
  get descricao() {
    return this.momentForm.get("descricao")!;
  }
  get classificador() {
    return this.momentForm.get("classificador")!;
  }
  get data_documento() {
    return this.momentForm.get("data_documento")!;
  }
  get data_entrada_saida() {
    return this.momentForm.get("data_entrada_saida")!;
  }
  get assunto() {
    return this.momentForm.get("assunto")!;
  }
  get serie() {
    return this.momentForm.get("serie")!;
  }
  get codigo_arquivista() {
    return this.momentForm.get("codigo_arquivista")!;
  }
  get origem_documento() {
    return this.momentForm.get("origem_documento")!;
  }
  get estado() {
    return this.momentForm.get("estado")!;
  }
  get gd_tipo_documento_id() {
    return this.momentForm.get("gd_tipo_documento_id")!;
  }
  get gd_documento_despacho_id() {
    return this.momentForm.get("gd_documento_despacho_id")!;
  }
  get gd_ordem_referencia_id() {
    return this.momentForm.get("gd_ordem_referencia_id")!;
  }
  get base_anexo_id() {
    return this.momentForm.get("base_anexo_id")!;
  }
  get gd_prioridade_documento_id() {
    return this.momentForm.get("gd_prioridade_documento_id")!;
  }
  get user() {
    return this.momentForm.get("user")!;
  }
  get periodo_tratamento() {
    return this.momentForm.get("periodo_tratamento")!;
  }
  get despacho() {
    return this.momentForm.get("despacho")!;
  }
  get icon() {
    return this.momentForm.get("icon")!;
  }
  get despacho_entidade() {
    return this.momentForm.get("despacho_entidade")!;
  }
  get despacho_descricao() {
    return this.momentForm.get("despacho_descricao")!;
  }
  get gd_documento_acesso_id() {
    return this.momentForm.get("gd_documento_acesso_id")!;
  }
  get gd_estado_id() {
    return this.momentForm.get("gd_estado_id")!;
  }
  get numero_documento() {
    return this.momentForm.get("numero_documento")!;
  }
  get numero_registo() {
    return this.momentForm.get("numero_registo")!;
  }
  get ano_avaliacao_id() {
    return this.momentForm.get("ano_avaliacao_id")!;
  }
  get data_despacho() {
    return this.momentForm.get("data_despacho")!;
  }
  get telefone() {
    return this.momentForm.get("telefone")!;
  }
  get email() {
    return this.momentForm.get("email")!;
  }
  get sigla() {
    return this.momentForm.get("sigla")!;
  }
  get base_area_id() {
    return this.momentForm.get("base_area_id")!;
  }
  get user_id() {
    return this.momentForm.get("user_id")!;
  }
  get funcionario_id() {
    return this.momentForm.get("funcionario_id")!;
  }
  get actividade_id() {
    return this.momentForm.get("actividade_id")!;
  }
  get user_despacho() {
    return this.momentForm.get("user_despacho")!;
  }
  get area_despacho() {
    return this.momentForm.get("area_despacho")!;
  }
  get area_despacho_conhecimento() {
    return this.momentForm.get("area_despacho_conhecimento")!;
  }
  get user_despacho_conhecimento() {
    return this.momentForm.get("user_despacho_conhecimento")!;
  }
  //Fim metodos para validação

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
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}`;
    this.generalService
      .execute(
        `buscar-documento-classificacao`,
        GeneralConstants.CRUD_OPERATIONS.READ, "", "", params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.documentos = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }
  carregarTipoDocumentos() {
    this.generalService
      .execute(`gd-documento-tipo`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.tipo_documentos = res.data;
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
            this.prioridade_documentos = res.data;
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
            this.acesso_documentos = res.data;
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
            this.via_tramissao_documentos = res.data;
          }
        }
      });
  }



  ImprimirTicket(data: any) {

    this.dado_code_barra = data
    console.log(data)
  //  this.zebraPrintZervice.printTeste(data)
    //  this.print(data)

   this.PdfService.ticketDocumentoPdf(data)

  }

  save() {
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.documento);
      console.log("ERROS", this.momentForm.errors);
      return;
    }
    console.log("DADOS válidos", this.documento);
    this.generalService.execute("gd-classificar-documento", GeneralConstants.CRUD_OPERATIONS.INSERT, this.documento)
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");

        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.documento = new Documento();
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

  editar(document: any) {
    this.documento = document;
    this.modalFormulario?.show();
  }



  getCorEstadoContrato(dado: any) {
    let cor = ''

    if (Number(dado) == 1)
      cor = "#005e0d"
    else
      if (Number(dado) == 2)
        cor = "#D81616"
      else

        cor = "#99AA99"

    return cor
  }
  getCorEstadoMigracao(dado: any) {
    let cor = ''

    if (Number(dado) == 1)
      cor = "#005e0d"
    else
      cor = "#D81616"

    return cor
  }


  print(data): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()" style="width: 100px; height: 60px; font-size:16px   b">

    ${data.codigo_documento}


    </body>
      </html>`
    );
    popupWin.document.close();
  }

}

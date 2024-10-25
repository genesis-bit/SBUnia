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
import { UntypedFormGroup } from "@angular/forms";
import { PdfService } from "src/app/core/services/pdf.service";
import { zebraPrint } from "src/app/core/services/zebraPrint.service";
import { Pessoa } from "../model/pessoa";

import {
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";



@Component({
  selector: "app-pessoas",
  templateUrl: "./pessoas.component.html",
  styleUrls: ["./pessoas.component.css"],
})
export class PessoasComponent {
  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("modalFormulario", { static: false })
  modalFormulario?: ModalDirective;
  // @ViewChild("modalFormulario", { static: false }) newModal?: ModalDirective;
  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  pessoaForm: FormGroup;
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
  pessoas: any;
  pessoa = new Pessoa();

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,

    private PdfService: PdfService,
    private zebraPrintZervice: zebraPrint
  ) {}

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
      { label: "Gerir Pessoas", active: true },
    ];
    this.carregarTipoDocumentos();
    this.carregarPrioridadeDocumentos();
    this.carregarViaTramissaoDocumentos();
    this.carregarDocumentosAcessos();
    this.pessoaForm = new FormGroup({
      user_id: new FormControl("", [Validators.required]),
      nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      ndi: new FormControl("", [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
      ]),
      tipo_identificacao: new FormControl("", [
        Validators.required
      ]),
      pai: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      mae: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      endereco: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      telefone_principal: new FormControl("", [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(255),
      ]),
      data_nascimento: new FormControl("", [Validators.required]),
      genero: new FormControl("", [Validators.required]),
      estado_civil: new FormControl("", [Validators.required]),
      data_emissao: new FormControl("", [Validators.required]),
      base_municipio_id: new FormControl("", [Validators.required]),
      outro_contacto: new FormControl("", [Validators.maxLength(255)]),
      telefone_alternativo: new FormControl("", [Validators.maxLength(255)]),
      banco: new FormControl("", [Validators.maxLength(255)])
    });
  }

  get user_id() {
    return this.pessoaForm.get("user_id")!;
  }
  get nome() {
    return this.pessoaForm.get("nome")!;
  }
  get ndi() {
    return this.pessoaForm.get("ndi")!;
  }
  get tipo_identificacao() {
    return this.pessoaForm.get("tipo_identificacao")!;
  }
  get endereco() {
    return this.pessoaForm.get("endereco")!;
  }
  get pai() {
    return this.pessoaForm.get("pai")!;
  }
  get mae() {
    return this.pessoaForm.get("mae")!;
  }
  get telefone_principal() {
    return this.pessoaForm.get("telefone_principal")!;
  }
  get data_nascimento() {
    return this.pessoaForm.get("data_nascimento")!;
  }
  get genero() {
    return this.pessoaForm.get("genero")!;
  }
  get estado_civil() {
    return this.pessoaForm.get("estado_civil")!;
  }
  get data_emissao() {
    return this.pessoaForm.get("data_emissao")!;
  }
  get base_municipio_id() {
    return this.pessoaForm.get("base_municipio_id")!;
  }
  get outro_contacto() {
    return this.pessoaForm.get("outro_contacto")!;
  }
  get telefone_alternativo() {
    return this.pessoaForm.get("telefone_alternativo")!;
  }
  get banco() {
    return this.pessoaForm.get("banco")!;
  }
  
  //......
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
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&nome_code=${this.filtro.name_code}`;
    this.generalService
      .execute(
        `buscar-documento-classificacao`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.pessoas = res.data.data;
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
    this.dado_code_barra = data;
    console.log(data);
    //  this.zebraPrintZervice.printTeste(data)
    //  this.print(data)

    this.PdfService.ticketDocumentoPdf(data);
  }

  save() {
    if (this.pessoaForm.invalid) {
      console.log("Dados inválidos", this.pessoa);
      console.log("ERROS", this.pessoaForm.errors);
      return;
    }
    console.log("DADOS válidos",  this.pessoa);
    /*
    this.generalService
      .execute(
        "gd-classificar-documento",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        // this.documento
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");

        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          // this.documento = new Documento();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      }); */
  }

  update() {
    this.generalService
      .execute(
        "gd-documento",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        // this.documento
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");

        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          // this.documento = new Documento();
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
    // this.documento = document;
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

  print(data): void {
    let printContents, popupWin;
    printContents = document.getElementById("print-section").innerHTML;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
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
      </html>`);
    popupWin.document.close();
  }
}

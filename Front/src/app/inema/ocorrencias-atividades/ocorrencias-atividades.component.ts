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
import { Ocorrencia_atividade } from "../model/ocorrencia_atividade";

import {
  UntypedFormGroup,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-ocorrencias-atividades",
  templateUrl: "./ocorrencias-atividades.component.html",
  styleUrls: ["./ocorrencias-atividades.component.css"],
})
export class OcorrenciasAtividadesComponent {
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

  estadoList = [{ id: 0, nome: "Inativo" }, { id: 1, nome: "Ativo" },];

  dado_code_barra: any;
  createContactForm!: UntypedFormGroup;

  tipo_documentos: any;
  ocorrencias_atividades: any;
  ocorrencia_atividade = new Ocorrencia_atividade();

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
      { label: "Gerir Tipos de atividades de ocorrências", active: true },
    ]; 

    this.momentForm = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      estado: new FormControl("", [Validators.required]),
      ocorrencia_atividade_tipo_id: new FormControl("", [Validators.required]),
    });
  }

  get nome() {
    return this.momentForm.get("nome")!;
  }

  get estado() {
    return this.momentForm.get("estado")!;
  }

  get ocorrencia_atividade_tipo_id() {
    return this.momentForm.get("ocorrencia_atividade_tipo_id")!;
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
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&nome_code=${this.filtro.name_code}`;
    this.generalService
      .execute(
        `ocorrencias-actividades`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.ocorrencias_atividades = res.data.data;
          this.filtro.total_itens = res.data.meta.total;

          console.log(this.ocorrencias_atividades)
        }
      });
  }
  
 
  save() {
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.ocorrencia_atividade);
      console.log("ERROS", this.momentForm.errors);
      return;
    }
    console.log("DADOS válidos", this.ocorrencia_atividade);
    this.ocorrencia_atividade = new Ocorrencia_atividade();
    this.momentForm.reset();
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });

    // this.generalService
    //   .execute(
    //     "gd-classificar-documento",
    //     GeneralConstants.CRUD_OPERATIONS.INSERT
    //     // this.documento
    //   )
    //   .subscribe((res: any) => {
    //     console.log("Dados cadastrado com sucesso");

    //     console.log(res);
    //     if (res.data) {
    //       this.NotificacaoService.notificationSuccess(res.message);
    //       this.carregarLista();
    //       // this.documento = new Documento();
    //     } else {
    //       this.NotificacaoService.notificationError(res.message);
    //     }
    //   });
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

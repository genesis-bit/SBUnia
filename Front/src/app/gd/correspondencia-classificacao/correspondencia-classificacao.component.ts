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
import { Documento } from "../model/gd";
import { UntypedFormGroup } from "@angular/forms";
import { PdfService } from "src/app/core/services/pdf.service";
import { zebraPrint } from "src/app/core/services/zebraPrint.service";
import { UtilsService } from "src/app/core/services/utils";

import { FormControl, FormGroup, Validators } from "@angular/forms";

import printJS from "print-js";
export default printJS;

var JsBarcode = require("jsbarcode");
@Component({
  selector: "app-correspondencia-classificacao",
  templateUrl: "./correspondencia-classificacao.component.html",
  styleUrls: ["./correspondencia-classificacao.component.css"],
})
export class CorrespondenciaClassificacaoComponent {
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

  editar: boolean;

  recoverOrRemoveItem: "remove" | "recover";

  tipo_documentos: any;
  acesso_documentos: any;
  prioridade_documentos: any;
  via_tramissao_documentos: any;
  documentos: any;
  documento = new Documento();
  momentForm!: FormGroup;

  maxDateForDocument: string;

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,

    private utilsService: UtilsService,
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

  maxDate: string = this.utilsService.getDataHojeAnoMesDia();

  ngOnInit() {
    /*
    JsBarcode("#barcode")
    //.options({font: "OCR-B"}) // Will affect all barcodes
    .CODE128("B24042310460002974081", {  displayValue: false, height: '35px',width: '1px',  textPosition: "top", fontSize: 1, padding: 0,margin: 0,})
    .render();

*/
    this.carregarLista();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Classificador", active: true },
    ];
    this.carregarTipoDocumentos();
    this.carregarPrioridadeDocumentos();
    this.carregarViaTramissaoDocumentos();
    this.carregarDocumentosAcessos();

    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);
    this.momentForm = new FormGroup({
      gd_tipo_documento_id: new FormControl("", [Validators.required]),
      gd_documento_acesso_id: new FormControl("", [Validators.required]),
      gd_prioridade_documento_id: new FormControl("", [Validators.required]),
      gd_documento_via_transmissao_id: new FormControl("", [
        Validators.required,
      ]),
      remetente: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      destinatario: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      email: new FormControl("", [Validators.email, noWhitespaceValidator]),
      telefone: new FormControl("", [
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      assunto: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      numero_documento: new FormControl("", [
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      origem_documento: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
      data_documento: new FormControl("", [Validators.required]),
      data_entrada_saida: new FormControl("", [Validators.required]),
    });
  }

  get gd_tipo_documento_id() {
    return this.momentForm.get("gd_tipo_documento_id")!;
  }
  get gd_documento_acesso_id() {
    return this.momentForm.get("gd_documento_acesso_id")!;
  }
  get gd_prioridade_documento_id() {
    return this.momentForm.get("gd_prioridade_documento_id")!;
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
  get email() {
    return this.momentForm.get("email")!;
  }
  get telefone() {
    return this.momentForm.get("telefone")!;
  }
  get assunto() {
    return this.momentForm.get("assunto")!;
  }
  get origem_documento() {
    return this.momentForm.get("origem_documento")!;
  }
  get estado() {
    return this.momentForm.get("estado")!;
  }
  get data_documento() {
    return this.momentForm.get("data_documento")!;
  }
  get numero_documento() {
    return this.momentForm.get("numero_documento")!;
  }
  get data_entrada_saida() {
    return this.momentForm.get("data_entrada_saida")!;
  }

  getMaxDateForDocumento(): string {
    if (this.documento.data_entrada_saida) {
      const maxDateEntradaSaida = new Date(this.documento.data_entrada_saida)
        .toISOString()
        .split("T")[0];
      return maxDateEntradaSaida < this.maxDate
        ? maxDateEntradaSaida
        : this.maxDate;
    }
    return this.maxDate;
  }

  pesquisarEnter(event: any) {
    this.filtro.page = 1;
    if (event.key == "Enter") {
      this.carregarLista();
    } else {
      this.carregarLista();
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
  carregarLista() {
    
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}&estado=${this.filtro.estado}`;
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
          this.documentos = res.data.data;
          console.log(res.data);
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
    // data.codigo_documento = 'B24042310460002974081'
    //  JsBarcode("#barcode", "Hi!");
    let blobdata = this.PdfService.ticketDocumentoPdf(data);
    printJS({
      printable: window.URL.createObjectURL(blobdata),
      type: "pdf",
    });
  }

  printDiv(divId: any) {
    var printContents = document.getElementById(divId).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  save() {
    this.markFormAsSubmitted();

    console.log(this.documento);

    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.documento);
      console.log("ERROS", this.momentForm);
      return;
    }
    console.log("DADOS válidos", this.documento);

    this.generalService
      .execute(
        "gd-classificar-documento",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.documento
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso", res);
        if (res.data) {
          this.carregarLista();
          this.NotificacaoService.notificationSuccess(res.message);
          this.closeModal();
          console.log(this.documento?.id);
          console.log(res?.data?.codigo_documento);
          if (res?.data?.codigo_documento) {
            if (!this.documento?.id) this.ImprimirTicket(res?.data);
          }
        } else {
          let errorMessages = [];
          if (res.message && res.message.error && res.message.error.errors) {
            res.message.error.errors.forEach((e) => {
              errorMessages.push(e.message);
              console.log("ERRO", errorMessages);
            });
          }

          const errorMessagesString = errorMessages.join(",");
          console.log("Mensagem de erro", errorMessagesString);
          this.NotificacaoService.notificationError(errorMessagesString);
        }
      });
  }

  removeUser(id: any) {
    // this.deleteId = id
    this.removeItemModal?.show();
  }

  questionsToremoveItem(data: any, recoverOrRemoveItem: "recover" | "remove") {
    this.documento = data;
    if (this.documento.data_documento)
      this.documento.data_documento = this.documento.data_documento.substring(
        0,
        10
      );
    if (this.documento.data_entrada_saida)
      this.documento.data_entrada_saida =
        this.documento.data_entrada_saida.substring(0, 10);
    this.recoverOrRemoveItem = recoverOrRemoveItem;

    this.removeItemModal?.show();
  }

  removeItem() {
    if (this.recoverOrRemoveItem === "recover") {
      this.documento.estado = 1;
    }

    if (this.recoverOrRemoveItem === "remove") {
      this.documento.estado = 0;
    }
    this.save();
    console.log("deletar este item", this.documento);
    this.removeItemModal?.hide();
  }

  remove() {
    console.log("ID ---------------------", this.documento.id);

    this.generalService
      .execute(
        `gd-documento/${this.documento.id}`,
        GeneralConstants.CRUD_OPERATIONS.DELETE
      )
      .subscribe((res: any) => {
        console.log("REMOVIDO OU NÃO", res);
        if (res.data) {
          this.carregarLista();
          this.NotificacaoService.notificationSuccess(res.message);
          this.removeItemModal?.hide();
        } else {
          let errorMessages = [];
          if (res.message && res.message.error && res.message.error.errors) {
            res.message.error.errors.forEach((e) => {
              errorMessages.push(e.message);
              console.log("ERRO", errorMessages);
            });
          }

          const errorMessagesString = errorMessages.join(",");
          console.log("Mensagem de erro", errorMessagesString);
          this.NotificacaoService.notificationError(errorMessagesString);
        }
      });
  }

  editUser(document: any, edit: boolean) {
    this.momentForm.get("estado").disable();

    this.documento = document;
    if (document.dataDocumento)
      this.documento.data_documento = document.dataDocumento.substring(0, 10);
    if (document.dataEntradaSaida)
      this.documento.data_entrada_saida = document.dataEntradaSaida.substring(0,10);
    this.documento.gd_tipo_documento_id = document.gdTipoDocumentoId;
    this.documento.gd_documento_acesso_id = document.gdDocumentoAcessoId;
    this.documento.gd_prioridade_documento_id = document.gdPrioridadeDocumentoId;
    this.documento.gd_documento_via_transmissao_id = document.gdDocumentoViaTransmissaoId;
    this.documento.origem_documento = document.origemDocumento;
    this.documento.numero_documento = document.codigoDocumento;

    this.editar = edit;

    this.modalFormulario?.show();
  }

  openModal(_new: boolean) {
    this.momentForm.get("estado").enable();

    this.editar = _new;
    this.resetForm();
    this.modalFormulario?.show();
  }

  closeModal() {
    this.resetForm();
    this.modalFormulario?.hide();
  }

  markFormAsSubmitted() {
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      const control = this.momentForm.get(controlName);
      control?.updateValueAndValidity(); // Atualiza o estado do controle
    });
    this.momentForm.updateValueAndValidity(); // Atualiza o estado do formulário
  }

  resetForm() {
    this.documento = new Documento(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
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

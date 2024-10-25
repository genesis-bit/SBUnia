import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";

import { GeneralService } from "src/app/core/services/general.service";
import { GeneralConstants } from "src/app/core/constants/GeneralConstants";

import { NotificationService } from "src/app/core/services/notification.service";
import { UtilsService } from "src/app/core/services/utils";

import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from "ngx-bootstrap/modal";
import { Documento } from "../model/gd";

import {
  FormControl,
  FormGroup,
  Validators,
  UntypedFormGroup,
} from "@angular/forms";

@Component({
  selector: "app-registar-documento",
  templateUrl: "./registar-documento.component.html",
  styleUrls: ["./registar-documento.component.css"],
})
export class RegistarDocumentoComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("newContactModal", { static: false }) newModal?: ModalDirective;

  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  name: any;

  createContactForm!: UntypedFormGroup;

  tipo_documentos: any;
  acesso_documentos: any;
  prioridade_documentos: any;
  via_tramissao_documentos: any;
  documentos: any;
  documento = new Documento();
  numero_document_edit: any;
  momentForm!: FormGroup;
  maxDateForDocument: string;

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  maxDate: string = this.utilsService.getDataHojeAnoMesDia();

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

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
    this.route.params.subscribe((params) => {
      this.documento.codigo = params["code"];

      // Agora, 'this.codigo' contém o valor do parâmetro 'codigo' da URL.
    });
    this.carregarDocumento();
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
        Validators.minLength(2),
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
        Validators.required,
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
  get numero_documento() {
    return this.momentForm.get("numero_documento")!;
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

  carregarDocumento() {
    this.generalService
      .execute(
        `gd-documento/${this.documento.codigo}`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        ""
      )
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.documento = res.data;
            //console.log("documentos:", this.documento);
            this.numero_document_edit = this.documento?.numero_documento;

            this.documento.data_documento =
              this.documento?.data_documento?.substring(0, 10);
            this.documento.data_despacho =
              this.documento?.data_despacho?.substring(0, 10);
            this.documento.data_entrada_saida =
              this.documento?.data_entrada_saida?.substring(0, 10);

            console.log(this.documento);
          }
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

  searchDocumentByCode(code: string) {
    this.generalService
      .execute(
        `buscar-documento-por-codigo/${code}`,
        GeneralConstants.CRUD_OPERATIONS.GET,
        "",
        ""
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.router.navigate(["gd/registar-documento/", code]);
          //chamar um componente e levar o codigo
        } else {
          console.log("Documento não existe");
        }
      });
  }

  save() {
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.documento);
      console.log("ERROS", this.momentForm);
      return;
    }

    console.log("DADOS válidos", this.documento);

    this.documento.gd_estado_id = 2;
    console.log("DADOS", this.documento);

    this.generalService
      .execute(
        "gd-registar-documento",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.documento
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.router.navigate(["gd/registo"]);
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
}

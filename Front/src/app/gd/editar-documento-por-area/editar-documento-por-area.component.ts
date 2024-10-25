import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";

import { GeneralService } from "src/app/core/services/general.service";
import { GeneralConstants } from "src/app/core/constants/GeneralConstants";

import { NotificationService } from "src/app/core/services/notification.service";

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
  selector: "app-editar-documento-por-area",
  templateUrl: "./editar-documento-por-area.component.html",
  styleUrls: ["./editar-documento-por-area.component.css"],
})
export class EditarDocumentoPorAreaComponent {
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
  momentForm!: FormGroup;

  tipo_documentos: any;
  acesso_documentos: any;
  prioridade_documentos: any;
  via_tramissao_documentos: any;
  documentos: any;
  users: any;
  areas: any;
  actividades: any;
  documento = new Documento();

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

    this.carregarActividades();
    this.carregarAreas();

    this.carregarUsers();

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
      periodo_tratamento: new FormControl("", [Validators.required]),
      data_despacho: new FormControl("", [Validators.required]),
      actividade_tipo_id: new FormControl("", [Validators.required]),

      base_area_despacho: new FormControl("", [Validators.required]),
      rh_funcionario_despacho: new FormControl("", [Validators.required]),
      base_area_conhecimento: new FormControl("", [Validators.required]),
      rh_funcionario_conhecimento: new FormControl("", [Validators.required]),

      despacho_descricao: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(65535),
        noWhitespaceValidator,
      ]),
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

  get periodo_tratamento() {
    return this.momentForm.get("periodo_tratamento")!;
  }
  get data_despacho() {
    return this.momentForm.get("data_despacho")!;
  }
  get actividade_tipo_id() {
    return this.momentForm.get("actividade_tipo_id")!;
  }
  get base_area_despacho() {
    return this.momentForm.get("base_area_despacho")!;
  }
  get rh_funcionario_despacho() {
    return this.momentForm.get("rh_funcionario_despacho")!;
  }
  get base_area_conhecimento() {
    return this.momentForm.get("base_area_conhecimento")!;
  }
  get rh_funcionario_conhecimento() {
    return this.momentForm.get("rh_funcionario_conhecimento")!;
  }
  get despacho_descricao() {
    return this.momentForm.get("despacho_descricao")!;
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
            this.documento.data_documento =
              this.documento.data_documento.substring(0, 10);
            this.documento.data_entrada_saida =
              this.documento.data_entrada_saida.substring(0, 10);
            this.documento.data_despacho =
              this.documento.data_despacho.substring(0, 10);
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
  carregarActividades() {
    this.generalService
      .execute(`actividade-tipos`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.actividades = res.data;
          }
        }
      });
  }
  carregarAreas() {
    this.generalService
      .execute(`gd-areas`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.areas = res.data;
          }
        }
      });
  }
  carregarUsers() {
    this.generalService
      .execute(`gd-users`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.users = res.data;
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

  save() {
    // this.documento.gd_estado_id = 3;
    console.log("DADOS inválidos", this.documento);

    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.documento);
      console.log("ERROS", this.momentForm);
      return;
    }

    console.log("DADOS válidos", this.documento);

    this.generalService
      .execute(
        "gd-despachar-documento",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.documento
      )
      .subscribe((res: any) => {
        console.log("RESULTAD O DA EDIÇÃO DO DOCUMENTO TRAMITADO", res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.router.navigate(["gd/documentos-por-area"]);
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

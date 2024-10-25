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
import { Entidade_acreditada } from "../model/entidade-acreditada";

import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-documento-entidade-acreditada",
  templateUrl: "./documento-entidade-acreditada.component.html",
  styleUrls: ["./documento-entidade-acreditada.component.css"],
})
export class DocumentoEntidadeAcreditadaComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("newContactModal", { static: false })
  newContactModal?: ModalDirective;
  @ViewChild("newDocumentModal", { static: false })
  newDocumentModal?: ModalDirective;
  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;

  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  name: any;
  momentForm!: FormGroup;

  createContactForm!: UntypedFormGroup;

  entidade_acreditadas: any;
  entidade_acreditada = new Entidade_acreditada();

  entidades: any;
  aresa: any;
  comunicacoes: any;

  documentos: any;
  comunicacao: any;
  base_areas: any;

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService
  ) {}

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

  filtro = {
    name_code: "",
    estado: "",
    page: 1,
    pagesize: 5,
    total_itens: 0,
    selectValue: "",
    cliente: "",
    nome_code: "",
    entidade: "",
    base_area_id: "",
    gd_comunicacao_id: "",
  };
  ngOnInit() {
    this.carregarLista();
    this.carregarBaseArea();
    this.carregarEntidades();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Entidade acreditada", active: true },
    ];
    this.validacao();
  }

  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);

    this.carregarListaComunicacao();
    this.carregarListaDocumento();

    this.momentForm = new FormGroup({
      gd_comunicacao_id: new FormControl("", [Validators.required]),
      base_area_id: new FormControl("", [Validators.required]),
      data_recebimento: new FormControl("", [Validators.required]),
      data_envio: new FormControl("", [Validators.required]),
      gd_documento_id: new FormControl("", [Validators.required]),
      visualizar: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
      observacao: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      despacho: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(65535),
        noWhitespaceValidator,
      ]),
      editar: new FormControl("", [Validators.required]),
    });
  }

  get gd_comunicacao_id() {
    return this.momentForm.get("gd_comunicacao_id")!;
  }
  get data_recebimento() {
    return this.momentForm.get("data_recebimento")!;
  }
  get data_envio() {
    return this.momentForm.get("data_envio")!;
  }
  get base_area_id() {
    return this.momentForm.get("base_area_id")!;
  }
  get observacao() {
    return this.momentForm.get("observacao")!;
  }
  get despacho() {
    return this.momentForm.get("despacho")!;
  }
  get estado() {
    return this.momentForm.get("estado")!;
  }
  get visualizar() {
    return this.momentForm.get("visualizar")!;
  }
  get editar() {
    return this.momentForm.get("editar")!;
  }
  get gd_documento_id() {
    return this.momentForm.get("gd_documento_id")!;
  }

  pesquisar() {
    this.filtro.page = 1;

    if (this.filtro.gd_comunicacao_id === null) {
      this.filtro.gd_comunicacao_id = "";
    }
    if (this.filtro.base_area_id === null) {
      this.filtro.base_area_id = "";
    }
    if (this.filtro.entidade === null) {
      this.filtro.entidade = "";
    }
    if (this.filtro.estado === null) {
      this.filtro.estado = "";
    }

    console.log("FILTRO", this.filtro);

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
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&estado=${this.filtro.estado}&entidade=${this.filtro.entidade}&base_area_id=${this.filtro.base_area_id}&gd_comunicacao_id=${this.filtro.gd_comunicacao_id}`;
    this.generalService
      .execute(
        `gd-documento-entidade-acreditada`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.entidade_acreditadas = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
          this.entidade_acreditadas.forEach((entidade) => {
            entidade.data_envio = String(entidade.data_envio).substring(0, 10);
            entidade.data_recebimento = String(
              entidade.data_recebimento
            ).substring(0, 10);
          });
        }
      });
  }

  carregarListaComunicacao() {
    this.generalService
      .execute(
        `gd-comunicacao`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        ""
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.comunicacao = res.data;
        }
      });
  }

  carregarBaseArea() {
    this.generalService
      .execute(`base-areas`, GeneralConstants.CRUD_OPERATIONS.READ, "", "", "")
      .subscribe((res: any) => {
        if (res.data) {
          this.base_areas = res.data;
        }
      });
  }

  carregarListaDocumento() {
    this.generalService
      .execute(
        `gd-documento`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        ""
      )
      .subscribe((res: any) => {
        console.log("ENTIDADES ACEDITADAS", res);
        if (res.data) {
          this.documentos = res.data;
        }
      });
  }

  save() {
    this.markFormAsSubmitted();

    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.entidade_acreditada);
      console.log("ERROS", this.momentForm.errors);
      return;
    }
    console.log("DADOS válidos", this.entidade_acreditada);
    this.generalService
      .execute(
        "gd-documento-entidade-acreditada",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.entidade_acreditada
      )
      .subscribe((res: any) => {
        console.log("INFORMAÇÃO SALVA", res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();

          this.closeModal();
          console.log(res.message);
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

  carregarEntidades() {
    this.generalService
      .execute(
        `gd-documento-entidade-acreditada`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        ""
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.entidades = res.data;
        }
      });
  }

  update() {
    console.log(this.entidade_acreditada);

    this.generalService
      .execute(
        "gd-documento-entidade-acreditada",
        GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE,
        this.entidade_acreditada
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.entidade_acreditada = new Entidade_acreditada();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  removeUser(id: any) {
    // this.deleteId = id
    this.removeItemModal?.show();
  }

  editUser(entidade: any) {
    this.entidade_acreditada = entidade;
    this.newDocumentModal?.show();
  }

  openModal() {
    this.resetForm();
    this.entidade_acreditada = new Entidade_acreditada();
    this.newDocumentModal?.show();
  }

  closeModal() {
    this.resetForm();
    this.newDocumentModal?.hide();
  }

  markFormAsSubmitted() {
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      const control = this.momentForm.get(controlName);
      control?.updateValueAndValidity(); // Atualiza o estado do controle
    });
    this.momentForm.updateValueAndValidity(); // Atualiza o estado do formulário
  }

  resetForm() {
    this.entidade_acreditada = new Entidade_acreditada(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }
}

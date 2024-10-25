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
import { Atividade } from "../model/atividade";

import {
  UntypedFormGroup,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";



@Component({
  selector: "app-atividade",
  templateUrl: "./atividade.component.html",
  styleUrls: ["./atividade.component.css"],
})
export class AtividadeComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("newContactModal", { static: false })
  newContactModal?: ModalDirective;
  // @ViewChild("newContactModal", { static: false }) newModal?: ModalDirective;
  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;

  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  momentForm!: FormGroup;

  name: any;

  createContactForm!: UntypedFormGroup;

  atividades: any;
  atividade = new Atividade();

  tipo_documentos: any;
  documentos: any;
  prioridades: any;

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService
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
    this.carregarLista();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Atividades", active: true },
    ];

    this.carregarListaPrioridadeDocumento();
    this.carregarListaTipoDocumento();
    this.carregarListaDocumento();

    this.momentForm = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      codigo_documento: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      assunto: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      texto: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(65535),
      ]),
      icon: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      data_documento: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
      base_area_id: new FormControl("", [Validators.required]),
      gd_tipo_documento_id: new FormControl("", [Validators.required]),
      base_anexo_id: new FormControl("", [Validators.required]),
      gd_prioridade_documento_id: new FormControl("", [Validators.required]),
      user: new FormControl(""),
      periodo_tratamento: new FormControl("", [Validators.required]),
    });
  }
  get id() {
    return this.momentForm.get("id")!;
  }
  get nome() {
    return this.momentForm.get("nome")!;
  }
  get codigo_documento() {
    return this.momentForm.get("codigo_documento")!;
  }
  get assunto() {
    return this.momentForm.get("assunto")!;
  }
  get texto() {
    return this.momentForm.get("texto")!;
  }
  get icon() {
    return this.momentForm.get("icon")!;
  }
  get data_documento() {
    return this.momentForm.get("data_documento")!;
  }
  get estado() {
    return this.momentForm.get("estado")!;
  }
  get base_area_id() {
    return this.momentForm.get("base_area_id")!;
  }
  get gd_tipo_documento_id() {
    return this.momentForm.get("gd_tipo_documento_id")!;
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
        `gd-actividade`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.atividades = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
          this.atividades.forEach((atividade: any) => {
            atividade.data_documento = String(
              atividade.data_documento
            ).substring(0, 10);
            atividade.data_documento = String(
              atividade.data_documento
            ).substring(0, 10);
          });
        }
      });
  }

  carregarListaPrioridadeDocumento() {
    this.generalService
      .execute(
        `gd-documento-prioridade`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        ""
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.prioridades = res.data;
        }
      });
  }

  carregarListaTipoDocumento() {
    this.generalService
      .execute(
        `gd-documento-tipo`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        ""
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.tipo_documentos = res.data;
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
        if (res.data) {
          this.documentos = res.data;
        }
      });
  }

  save() {
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.atividade);
      console.log("ERROS", this.momentForm.errors);
      return;
    }
    console.log("DADOS válidos", this.atividade);
    this.generalService
      .execute(
        "gd-actividade",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.atividade
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.atividade = new Atividade();
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
        "gd-actividade",
        GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE,
        this.atividade
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.atividade = new Atividade();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  removeUser(id: any) {
    // this.deleteId = id
    this.removeItemModal?.show();
  }

  editUser(atividade: any) {
    this.atividade = atividade;
    this.newContactModal?.show();
  }
}

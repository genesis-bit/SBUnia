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

import { Actividade_area } from "../model/actividade-area";

import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from "ngx-bootstrap/modal";

import {
  FormControl,
  FormGroup,
  Validators,
  UntypedFormGroup,
} from "@angular/forms";

@Component({
  selector: "app-actividade-areas",
  templateUrl: "./actividade-areas.component.html",
  styleUrls: ["./actividade-areas.component.css"],
})
export class ActividadeAreasComponent {
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
  recoverOrRemoveItem: "remove" | "recover";
  editar: boolean;

  actividade_areas: any;
  actividades: any;
  base_areas: any;
  gd_documentos: any;
  executors: any;
  actividade_area = new Actividade_area();
  //actividade_area_edit = new actividade_area();

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService
  ) {}

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

  filtro = {
    name_code: "",
    actividade_id_code: "",
    gd_documento_code: "",
    base_area_code: "",
    executor_code: "",
    estado: 1,
    page: 1,
    pagesize: 5,
    total_itens: 0,
    selectValue: "",
    cliente: "",
    nome_code: "",
  };

  ngOnInit() {
    this.carregarLista();
    this.carregaActividades();
    this.carregaBaseArea();
    this.carregaExecutor();
    this.carregaGdDocumento();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Gestores das Actividades", active: true },
    ];

    this.validacao();
  }

  get base_area_id() {
    return this.momentForm.get("base_area_id")!;
  }
  get estado() {
    return this.momentForm.get("estado")!;
  }
  get actividade_id() {
    return this.momentForm.get("actividade_id")!;
  }
  get gd_documento_id() {
    return this.momentForm.get("gd_documento_id")!;
  }
  get executor() {
    return this.momentForm.get("executor")!;
  }

  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);
    this.momentForm = new FormGroup({
      actividade_id: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
      base_area_id: new FormControl("", [Validators.required]),
      gd_documento_id: new FormControl("", [Validators.required]),
      executor: new FormControl("", [Validators.required]),
    });
  }

  pesquisar() {
    this.filtro.page = 1;
    console.log("Filtro--------------", this.filtro);

    if (this.filtro.executor_code === null) {
      this.filtro.executor_code = "";
    }
    if (this.filtro.actividade_id_code === null) {
      this.filtro.actividade_id_code = "";
    }
    if (this.filtro.gd_documento_code === null) {
      this.filtro.gd_documento_code = "";
    }
    if (this.filtro.base_area_code === null) {
      this.filtro.base_area_code = "";
    }

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
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&estado=${this.filtro.estado}&executor=${this.filtro.executor_code}&actividade=${this.filtro.actividade_id_code}&documento=${this.filtro.gd_documento_code}&area=${this.filtro.base_area_code}`;
    this.generalService
      .execute(
        `actividade-areas`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          console.log(res.data);
          this.actividade_areas = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  save() {
    this.markFormAsSubmitted();
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.actividade_area);
      console.log("ERROS", this.momentForm.errors);
      return;
    }
    this.generalService
      .execute(
        "actividade-areas",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.actividade_area
      )
      .subscribe((res: any) => {
        if (res.data) {
          console.log("RES DATA", res.data);
          this.carregarLista();
          this.NotificacaoService.notificationSuccess(res.message);
          this.closeModal();
        } else {
          console.log("CAIU NO ERRO");

          let errorMessages = [];
          if (res.message && res.message.erro && res.message.erro.errors) {
            res.message.erro.errors.forEach((e) => {
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

  carregaActividades() {
    this.generalService
      .execute(`actividades`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.actividades = res.data;
          console.log("ATIVIDADES", res);
        }
      });
  }
  carregaBaseArea() {
    this.generalService
      .execute(`base-areas`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.base_areas = res.data;
        }
      });
  }
  carregaGdDocumento() {
    this.generalService
      .execute(
        `buscar-documento-situacao`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.gd_documentos = res.data;
          console.log("CARREGAR DOCUMENTOS", res);
        }
      });
  }
  carregaExecutor() {
    this.generalService
      .execute(`rh-funcionarios`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.executors = res.data;
          console.log("EXECUTOR", res);
        }
      });
  }

  questionsToremoveItem(data: any, recoverOrRemoveItem: "recover" | "remove") {
    this.actividade_area = data;
    this.recoverOrRemoveItem = recoverOrRemoveItem;

    this.removeItemModal?.show();
  }

  removeItem() {
    if (this.recoverOrRemoveItem === "recover") {
      this.actividade_area.estado = 1;
    }

    if (this.recoverOrRemoveItem === "remove") {
      this.actividade_area.estado = 0;
    }
    this.save();
    console.log("deletar este item", this.actividade_area);
    this.removeItemModal?.hide();
  }

  editUser(document: any, edit: boolean) {
    this.momentForm.get("estado").disable();
    this.actividade_area = { ...document };
    this.editar = edit;
    this.newDocumentModal?.show();
  }

  openModal(_new: boolean) {
    this.momentForm.get("estado").enable();
    this.editar = _new;
    this.resetForm();
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
    this.actividade_area = new Actividade_area(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }
}

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

import { Actividade_tarefa } from "../model/actividade-tarefa";

import { Router } from "@angular/router";
import { UtilsService } from "src/app/core/services/utils";

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
  selector: "app-actividade-tarefas-new",
  templateUrl: "./actividade-tarefas-new.component.html",
  styleUrls: ["./actividade-tarefas-new.component.css"],
})
export class ActividadeTarefasNewComponent {
  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("newContactModal", { static: false })
  newContactModal?: ModalDirective;

  @ViewChild("historicoModal", { static: false })
  historicoModal?: ModalDirective;

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

  actividade_tarefas: any;
  actividades: any;
  base_anexos: any;
  responsaveis: any;
  actividade_tarefa_tipos: any;
  tarefa_estados: any;

  actividade_tarefa = new Actividade_tarefa();
  //actividade_tarefa_edit = new actividade_tarefa();

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,
    private utilsService: UtilsService,

    private router: Router
  ) {}

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

  filtro = {
    name_code: "",
    estado: 1,
    page: 1,
    pagesize: 5,
    total_itens: 0,
    selectValue: "",
    cliente: "",
    nome_code: "",
  };

  maxDate: string = this.utilsService.getDataHojeAnoMesDia();

  ngOnInit() {
    this.carregarLista();
    this.carregarActividade();
    this.carregarBaseAnexo();
    this.carregarTarefaEstado();
    this.carregarTarefaTipo();
    this.carregarResponsavel();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Tarefas", active: true },
    ];

    this.validacao();
  }

  get nome() {
    return this.momentForm.get("nome")!;
  }
  get descricao() {
    return this.momentForm.get("descricao")!;
  }
  get data_inicio() {
    return this.momentForm.get("data_inicio")!;
  }
  get data_fim() {
    return this.momentForm.get("data_fim")!;
  }
  get base_anexo_id() {
    return this.momentForm.get("base_anexo_id")!;
  }
  get actividade_id() {
    return this.momentForm.get("actividade_id")!;
  }
  get actividade_tarefa_estado_id() {
    return this.momentForm.get("actividade_tarefa_estado_id")!;
  }
  get estado() {
    return this.momentForm.get("estado")!;
  }
  get actividade_tarefa_tipo_id() {
    return this.momentForm.get("actividade_tarefa_tipo_id")!;
  }
  get duracao() {
    return this.momentForm.get("duracao")!;
  }
  get responsavel() {
    return this.momentForm.get("responsavel")!;
  }

  getMaxDateForInicio(): string {
    if (this.actividade_tarefa.data_fim) {
      const maxDataInicio = new Date(this.actividade_tarefa.data_fim)
        .toISOString()
        .split("T")[0];
      return maxDataInicio < this.maxDate ? maxDataInicio : this.maxDate;
    }
    return this.maxDate;
  }

  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);

    this.momentForm = new FormGroup({
      nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      descricao: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(65535),
        noWhitespaceValidator,
      ]),
      data_inicio: new FormControl("", [Validators.required]),
      data_fim: new FormControl("", [Validators.required]),
      base_anexo_id: new FormControl("", [Validators.required]),
      actividade_id: new FormControl("", [Validators.required]),
      actividade_tarefa_estado_id: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
      actividade_tarefa_tipo_id: new FormControl("", [Validators.required]),
      duracao: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(30),
      ]),
      responsavel: new FormControl("", [Validators.required]),
    });
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

  carregarActividade() {
    this.generalService
      .execute(`actividades`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.actividades = res.data;
          }
        }
      });
  }
  carregarTarefaTipo() {
    this.generalService
      .execute(`actividade-tarefa-tipos`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.actividade_tarefa_tipos = res.data;
          }
        }
      });
  }
  carregarBaseAnexo() {
    this.generalService
      .execute(`base-anexos`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.base_anexos = res.data;
          }
        }
      });
  }
  carregarTarefaEstado() {
    this.generalService
      .execute(
        `actividade-tarefa-estados`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.tarefa_estados = res.data;
          }
        }
      });
  }
  carregarResponsavel() {
    this.generalService
      .execute(`users`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.responsaveis = res.data;
          }
        }
      });
  }
  carregarLista() {
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}&estado=${this.filtro.estado}`;
    this.generalService
      .execute(
        `actividade-tarefas`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          console.log("Lista", res.data);
          this.actividade_tarefas = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  save() {
    this.markFormAsSubmitted();

    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.actividade_tarefa);
      console.log("ERROS", this.momentForm.errors);
      return;
    }

    this.generalService
      .execute(
        "actividade-tarefas",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.actividade_tarefa
      )
      .subscribe((res: any) => {
        if (res.data) {
          console.log("RES DATA", res.data);
          this.carregarLista();
          this.NotificacaoService.notificationSuccess(res.message);
          this.closeModal();
        } else {
          console.log("CAIU NO ERRO");
          console.log(res);
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

  questionsToremoveItem(data: any, recoverOrRemoveItem: "recover" | "remove") {
    this.actividade_tarefa = data;
    this.recoverOrRemoveItem = recoverOrRemoveItem;

    this.removeItemModal?.show();
  }

  removeItem() {
    if (this.recoverOrRemoveItem === "recover") {
      this.actividade_tarefa.estado = 1;
    }

    if (this.recoverOrRemoveItem === "remove") {
      this.actividade_tarefa.estado = 0;
    }
    this.actividade_tarefa.data_inicio =
      this.actividade_tarefa.data_inicio.substring(0, 10);
    this.actividade_tarefa.data_fim = this.actividade_tarefa.data_fim.substring(
      0,
      10
    );
    this.save();
    console.log("deletar este item", this.actividade_tarefa);
    this.removeItemModal?.hide();
  }

  editUser(document: any, edit: boolean) {
    this.momentForm.get("estado").disable();
    this.actividade_tarefa = { ...document };
    if (document.data_inicio)
      this.actividade_tarefa.data_inicio = document.data_inicio.substring(
        0,
        10
      );
    if (document.data_fim)
      this.actividade_tarefa.data_fim = document.data_fim.substring(0, 10);
    this.editar = edit;
    this.newDocumentModal?.show();
  }

  buscarHistorico(code: string) {
    this.router.navigate(["actividade/actividade-tarefa-historico", code]);
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
    this.actividade_tarefa = new Actividade_tarefa(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }
}

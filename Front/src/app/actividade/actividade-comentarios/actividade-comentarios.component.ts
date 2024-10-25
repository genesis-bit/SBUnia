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

import { Actividade_comentario } from "../model/actividade-comentario";

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

import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-actividade-comentarios",
  templateUrl: "./actividade-comentarios.component.html",
  styleUrls: ["./actividade-comentarios.component.css"],
})
export class ActividadeComentariosComponent {
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

  actividade_comentarios: any;
  actividade_detalhes: any;
  actividade_tarefas: any;
  actividades: any;
  actividade_comentario = new Actividade_comentario();
  codico_actividade_id: any;
  //actividade_comentario_edit = new actividade_comentario();

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
    actividade_id_code: "",
    actividade_detalhe_code: "",
    actividade_tarefa_code: "",
    estado: 1,
    page: 1,
    pagesize: 5,
    total_itens: 0,
    selectValue: "",
    cliente: "",
    nome_code: "",
  };

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.codico_actividade_id = params["code"];
    });
    this.carregarLista();
    //this.carregaActividades();
    this.carregaActividadeDetalhes();
    this.carregaActividadeTarefas();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Comentario de Actividades", active: true },
    ];

    this.validacao();
  }

  get descricao() {
    return this.momentForm.get("descricao")!;
  }

  get actividade_detalhe_id() {
    return this.momentForm.get("actividade_detalhe_id")!;
  }
  get actividade_tarefa_id() {
    return this.momentForm.get("actividade_tarefa_id")!;
  }

  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);

    this.momentForm = new FormGroup({
      descricao: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(65535),
        noWhitespaceValidator,
      ]),
      actividade_detalhe_id: new FormControl("", [Validators.required]),
      actividade_tarefa_id: new FormControl("", [Validators.required]),
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

  carregarLista() {
    //let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&actividade=1&estado=${this.filtro.estado}`;
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}&estado=${this.filtro.estado}&actividade=${this.codico_actividade_id}`;
    this.generalService
      .execute(
        `actividade-comentarios`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          console.log("comentario", res);
          this.actividade_comentarios = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  save() {


    this.markFormAsSubmitted();
    this.actividade_comentario.actividade_id = this.codico_actividade_id;
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.actividade_comentario);
      console.log("ERROS", this.momentForm.errors);
      return;
    }

    this.actividade_comentario.estado = 1
    console.log("para salvar", this.actividade_comentario);
    this.generalService
      .execute(
        "actividade-comentarios",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.actividade_comentario
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

  // carregaActividades() {
  //   this.generalService
  //     .execute(`actividade-comentarios`, GeneralConstants.CRUD_OPERATIONS.READ)
  //     .subscribe((res: any) => {
  //       if (res.data) {
  //         this.actividades = res.data;
  //       }
  //     });
  // }
  carregaActividadeTarefas() {
    this.generalService
      .execute(`actividade-tarefas`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.actividade_tarefas = res.data;
        }
      });
  }
  carregaActividadeDetalhes() {
    this.generalService
      .execute(`actividade-detalhes`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.actividade_detalhes = res.data;
        }
      });
  }

  questionsToremoveItem(data: any, recoverOrRemoveItem: "recover" | "remove") {
    this.actividade_comentario = data;
    this.recoverOrRemoveItem = recoverOrRemoveItem;

    this.removeItemModal?.show();
  }

  removeItem() {
    if (this.recoverOrRemoveItem === "recover") {
      this.actividade_comentario.estado = 1;
    }

    if (this.recoverOrRemoveItem === "remove") {
      this.actividade_comentario.estado = 0;
    }
    this.actividade_comentario.data_comentario =
      this.actividade_comentario.data_comentario.substring(0, 10);
    this.save();

    console.log("deletar este item", this.actividade_comentario);
    this.removeItemModal?.hide();
  }

  remove() {
    console.log("ID ---------------------", this.actividade_comentario.id);
    console.log("ATIVIDADE ---------------------", this.actividade_comentario);

    this.generalService
      .execute(
        `actividade-comentarios/${this.actividade_comentario.id}`,
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
    this.actividade_comentario = { ...document };
    this.editar = edit;
    this.newDocumentModal?.show();
  }

  openModal(_new: boolean) {
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
    this.actividade_comentario = new Actividade_comentario(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }
}

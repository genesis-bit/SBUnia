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

import { Gestor_user } from "../model/gestor-user";

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
  selector: "app-actividade-gestor-users",
  templateUrl: "./actividade-gestor-users.component.html",
  styleUrls: ["./actividade-gestor-users.component.css"],
})
export class ActividadeGestorUsersComponent {
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

  users: any;

  createContactForm!: UntypedFormGroup;
  recoverOrRemoveItem: "remove" | "recover";
  editar: boolean;

  gestor_users: any;
  actividades: any;
  gestor_user = new Gestor_user();
  //gestor_user_edit = new gestor_user();

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService
  ) {}

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

  filtro = {
    name_code: "",
    actividade: "",
    responsavel: "",
    register: "",
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
    this.carregarUsers();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Gestores das Actividades", active: true },
    ];

    this.validacao();
  }

  get id() {
    return this.momentForm.get("id")!;
  }
  // get nome() {
  //   return this.momentForm.get("nome")!;
  // }
  get responsavel() {
    return this.momentForm.get("responsavel")!;
  }
  get estado() {
    return this.momentForm.get("estado")!;
  }
  get actividade_id() {
    return this.momentForm.get("actividade_id")!;
  }

  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);

    this.momentForm = new FormGroup({
      id: new FormControl(""),
      // nome: new FormControl("", [
      //   Validators.required,
      //   Validators.minLength(2),
      //   Validators.maxLength(255),
      //   noWhitespaceValidator,
      // ]),
      responsavel: new FormControl("", [Validators.required]),
      actividade_id: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
    });
  }

  pesquisar() {
    this.filtro.page = 1;

    if (this.filtro.responsavel === null) {
      this.filtro.responsavel = "";
    }
    if (this.filtro.register === null) {
      this.filtro.register = "";
    }
    if (this.filtro.actividade === null) {
      this.filtro.actividade = "";
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

  carregarUsers() {
    this.generalService
      .execute(`users`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        console.log("USSUARIOS----------------------------------", res);
        if (res.data) {
          if (res.data) {
            this.users = res.data;
          }
        }
      });
  }

  carregarLista() {
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}&estado=${this.filtro.estado}&register=${this.filtro.register}&responsavel=${this.filtro.responsavel}&actividade=${this.filtro.actividade}`;
    this.generalService
      .execute(
        `actividade-gestor-users`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        console.log("RESPOSTA", res);
        if (res.data) {
          this.gestor_users = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  save() {
    this.markFormAsSubmitted();

    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.gestor_user);
      console.log("ERROS", this.momentForm.errors);
      return;
    }

    this.generalService
      .execute(
        "actividade-gestor-users",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.gestor_user
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
        }
      });
  }

  questionsToremoveItem(data: any, recoverOrRemoveItem: "recover" | "remove") {
    this.gestor_user = data;
    this.recoverOrRemoveItem = recoverOrRemoveItem;

    this.removeItemModal?.show();
  }

  removeItem() {
    if (this.recoverOrRemoveItem === "recover") {
      this.gestor_user.estado = 1;
    }

    if (this.recoverOrRemoveItem === "remove") {
      this.gestor_user.estado = 0;
    }
    this.save();
    console.log("deletar este item", this.gestor_user);
    this.removeItemModal?.hide();
  }

  editUser(document: any, edit: boolean) {
    this.momentForm.get("estado").disable();
    this.gestor_user = { ...document };
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
    this.gestor_user = new Gestor_user(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }
}

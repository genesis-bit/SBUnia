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
import { Estado } from "../model/estado";

import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-estado",
  templateUrl: "./estado.component.html",
  styleUrls: ["./estado.component.css"],
})
export class EstadoComponent implements OnInit {
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

  estados: any;
  estadoM = new Estado();
  estadoM_edit = new Estado();

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
      { label: "Gerir Estados", active: true },
    ];

    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);

    this.momentForm = new FormGroup({
      id: new FormControl(""),
      estado: new FormControl("", [Validators.required]),
      nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      cor: new FormControl("", [
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
    });
  }

  get id() {
    return this.momentForm.get("id")!;
  }
  get estado() {
    return this.momentForm.get("estado")!;
  }
  get nome() {
    return this.momentForm.get("nome")!;
  }
  get cor() {
    return this.momentForm.get("cor")!;
  }
  get descricao() {
    return this.momentForm.get("descricao")!;
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
        `gd-estado`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.estados = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }
  save() {
    this.markFormAsSubmitted();

    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.estadoM);
      console.log("ERROS", this.momentForm.errors);
      return;
    }

    console.log("DADOS válidos", this.estadoM);
    this.generalService
      .execute(
        "gd-estado",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.estadoM
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.carregarLista();
          this.NotificacaoService.notificationSuccess(res.message);
          this.closeModal();
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

  questionsToremoveItem(data: any, recoverOrRemoveItem: "recover" | "remove") {
    this.estadoM = data;
    this.recoverOrRemoveItem = recoverOrRemoveItem;

    this.removeItemModal?.show();
  }

  removeItem() {
    if (this.recoverOrRemoveItem === "recover") {
      this.estadoM.estado = 1;
    }

    if (this.recoverOrRemoveItem === "remove") {
      this.estadoM.estado = 0;
    }
    this.save();
    console.log("deletar este item", this.estadoM);
    this.removeItemModal?.hide();
  }

  editUser(estado: any, edit: boolean) {
    this.momentForm.get("estado").disable();
    this.estadoM = { ...estado };
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
    this.estadoM = new Estado(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }
}

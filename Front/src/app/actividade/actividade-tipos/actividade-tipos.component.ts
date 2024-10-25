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

import { Actividade_tipo } from "../model/actividade-tipo";

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
  selector: 'app-actividade-tipos',
  templateUrl: './actividade-tipos.component.html',
  styleUrls: ['./actividade-tipos.component.css']
})
export class ActividadeTiposComponent {
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

  actividade_tipos: any;
  actividade_tipo = new Actividade_tipo();
  //actividade_tipo_edit = new actividade_tipo();

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService
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

  ngOnInit() {
    this.carregarLista();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Tipo de Actividade", active: true },
    ];

    this.validacao();
  }

  get id() {
    return this.momentForm.get("id")!;
  }
  get nome() {
    return this.momentForm.get("nome")!;
  }
  get estado() {
    return this.momentForm.get("estado")!;
  }
  get duracao() {
    return this.momentForm.get("duracao")!;
  }


  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);

    this.momentForm = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(365),
        noWhitespaceValidator,
      ]),
      duracao: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(30),
        noWhitespaceValidator,
      ]),
      estado: new FormControl("", [Validators.required]),
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
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}&estado=${this.filtro.estado}`;
    this.generalService
      .execute(
        `actividade-tipos`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          console.log(res.data)
          this.actividade_tipos = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  save() {
    this.markFormAsSubmitted();
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.actividade_tipo);
      console.log("ERROS", this.momentForm.errors);
      return;
    }

    this.generalService
      .execute(
        "actividade-tipos",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.actividade_tipo
      )
      .subscribe((res: any) => {
        if (res.data) {
          console.log("RES DATA", res.data);
          this.carregarLista();
          this.NotificacaoService.notificationSuccess(res.message);
          this.closeModal();
        } else {
          console.log("CAIU NO ERRO");
          console.log(res)
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
    this.actividade_tipo = data;
    this.recoverOrRemoveItem = recoverOrRemoveItem;

    this.removeItemModal?.show();
  }

  removeItem() {
    if (this.recoverOrRemoveItem === "recover") {
      this.actividade_tipo.estado = 1;
    }

    if (this.recoverOrRemoveItem === "remove") {
      this.actividade_tipo.estado = 0;
    }
    this.save();
    console.log("deletar este item", this.actividade_tipo);
    this.removeItemModal?.hide();
  }

  editUser(document: any, edit: boolean) {
    this.momentForm.get("estado").disable();
    this.actividade_tipo = { ...document };
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
    this.actividade_tipo = new Actividade_tipo(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }
}

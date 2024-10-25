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

import { Actividade_detalhe } from "../model/actividade-detalhe";

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
  selector: "app-actividade-detalhes",
  templateUrl: "./actividade-detalhes.component.html",
  styleUrls: ["./actividade-detalhes.component.css"],
})
export class ActividadeDetalhesComponent {
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

  actividade_detalhes: any;
  actividades: any;
  base_anexos: any;
  tarefa_estados: any;
  codico_actividade_id: any;

  actividade_detalhe = new Actividade_detalhe();
  //actividade_detalhe_edit = new actividade_detalhe();


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
    estado: 1,
    atividade_code: "",
    visibilidade_code: "",
    anexo_code: "",
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
    this.carregarActividade();
    this.carregarBaseAnexo();
    this.carregarTarefaEstado();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Detalhe de Actividade", active: true },
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
  // get actividade_id() {
  //   return this.momentForm.get("actividade_id")!;
  // }
  get visibilidade() {
    return this.momentForm.get("visibilidade")!;
  }
  get estado() {
    return this.momentForm.get("estado")!;
  }
  get foto() {
    return this.momentForm.get("foto")!;
  }

  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);

    this.momentForm = new FormGroup({
      foto: new FormControl(""),
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
      //actividade_id: new FormControl("", [Validators.required]),
      visibilidade: new FormControl("", [Validators.required]),
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
  carregarLista() {
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}&estado=${this.filtro.estado}&actividade=${this.codico_actividade_id}`;
    this.generalService
      .execute(
        `actividade-detalhes`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.actividade_detalhes = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  save() {
    // this.actividade_detalhe.user_id = 1;
    this.actividade_detalhe.actividade_id = this.codico_actividade_id;
    console.log("antes da validação", this.actividade_detalhe);
    this.markFormAsSubmitted();
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.actividade_detalhe);
      console.log("ERROS", this.momentForm.errors);
      return;
    }

    this.generalService
      .execute(
        "actividade-detalhes",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.actividade_detalhe
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

  questionsToremoveItem(data: any, recoverOrRemoveItem: "recover" | "remove") {
    this.actividade_detalhe = data;
    this.recoverOrRemoveItem = recoverOrRemoveItem;

    this.removeItemModal?.show();
  }

  removeItem() {
    if (this.recoverOrRemoveItem === "recover") {
      this.actividade_detalhe.estado = 1;
    }

    if (this.recoverOrRemoveItem === "remove") {
      this.actividade_detalhe.estado = 0;
    }
    this.actividade_detalhe.data_fim =
      this.actividade_detalhe.data_fim.substring(0, 10);
    this.actividade_detalhe.data_inicio =
      this.actividade_detalhe.data_inicio.substring(0, 10);
    this.save();
    console.log("deletar este item", this.actividade_detalhe);
    this.removeItemModal?.hide();
  }

  editUser(document: any, edit: boolean) {
    this.momentForm.get("estado").disable();
    this.actividade_detalhe = { ...document };
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
    this.actividade_detalhe = new Actividade_detalhe(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }
}

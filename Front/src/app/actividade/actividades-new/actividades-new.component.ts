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

import { Actividade } from "../model/actividade-new";

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

import { Router } from "@angular/router";
import { UtilsService } from "src/app/core/services/utils";

@Component({
  selector: "app-actividades-new",
  templateUrl: "./actividades-new.component.html",
  styleUrls: ["./actividades-new.component.css"],
})
export class ActividadesNewComponent {
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

  actividades: any;
  gd_documentos: any;
  responsaveis: any;
  tipo_actividades: any;

  actividade = new Actividade();
  //actividade_edit = new actividade();

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

  ngOnInit() {
    this.carregarLista();
    this.carregarGdDocumento();
    this.carregarResponsavel();
    this.carregarTipoActividade();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Actividade", active: true },
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
  get estado() {
    return this.momentForm.get("estado")!;
  }
  get duracao() {
    return this.momentForm.get("duracao")!;
    }
  get responsavel() {
    return this.momentForm.get("responsavel")!;
  }
  get despacho() {
    return this.momentForm.get("despacho")!;
  }
  get gd_documento_id() {
    return this.momentForm.get("gd_documento_id")!;
  }
  get actividade_tipo_id() {
    return this.momentForm.get("actividade_tipo_id")!;
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
      despacho: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      data_inicio: new FormControl("", [Validators.required]),
      data_fim: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
      actividade_tipo_id: new FormControl("", [Validators.required]),
      duracao: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(30),
      ]),
      responsavel: new FormControl("", [Validators.required]),
      gd_documento_id: new FormControl("", [Validators.required]),
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
  maxDate: string = this.utilsService.getDataHojeAnoMesDia();

  getMaxDateForEntradaSaida(): string {
    if (this.actividade.data_fim) {
      const maxDateInicio = new Date(this.actividade.data_fim)
        .toISOString()
        .split("T")[0];
      return maxDateInicio < this.maxDate ? maxDateInicio : this.maxDate;
    }
    return this.maxDate;
  }

  carregarGdDocumento() {
    this.generalService
      .execute(
        `buscar-documento-situacao`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe((res: any) => {
        if (res.data) {
          console.log(res);
          this.gd_documentos = res.data;
          console.log("DOCUMENTO", res);
        }
      });
  }
  carregarTipoActividade() {
    this.generalService
      .execute(`actividade-tipos`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          console.log(res);
          this.tipo_actividades = res.data;
        }
      });
  }

  carregarResponsavel() {
    this.generalService
      .execute(`rh-funcionarios`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          console.log(res.data);
          this.responsaveis = res.data;
        }
      });
  }

  carregarLista() {
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}&estado=${this.filtro.estado}`;
    this.generalService
      .execute(
        `actividades`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          console.log(res.data);
          this.actividades = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  save() {
    this.markFormAsSubmitted();

    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.actividade);
      console.log("ERROS", this.momentForm.errors);
      return;
    }

    this.generalService
      .execute(
        "actividades",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.actividade
      )
      .subscribe((res: any) => {
        console.log("RESULTADO DE ATIVIDADES", res.data);
        if (res.data) {
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

  buscarDetalhe(code: string) {
    this.router.navigate(["actividade/actividade-detalhe", code]);
  }
  buscarComentario(code: string) {
    this.router.navigate(["actividade/actividade-comentario", code]);
  }

  questionsToremoveItem(data: any, recoverOrRemoveItem: "recover" | "remove") {
    this.actividade = data;
    this.recoverOrRemoveItem = recoverOrRemoveItem;

    this.removeItemModal?.show();
  }

  removeItem() {
    if (this.recoverOrRemoveItem === "recover") {
      this.actividade.estado = 1;
    }

    if (this.recoverOrRemoveItem === "remove") {
      this.actividade.estado = 0;
    }
    this.actividade.data_inicio = this.actividade.data_inicio.substring(0, 10);
    this.actividade.data_fim = this.actividade.data_fim.substring(0, 10);
    this.save();
    console.log("deletar este item", this.actividade);
    this.removeItemModal?.hide();
  }

  editUser(document: any, edit: boolean) {
    this.momentForm.get("estado").disable();
    this.actividade = { ...document };
    if (document.data_inicio)
      this.actividade.data_inicio = document.data_inicio.substring(0, 10);
    if (document.data_fim)
      this.actividade.data_fim = document.data_fim.substring(0, 10);
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
    this.actividade = new Actividade(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }
}

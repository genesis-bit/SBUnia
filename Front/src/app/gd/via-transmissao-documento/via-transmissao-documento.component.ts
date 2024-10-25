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
import { Documento } from "../model/gd";
import { UntypedFormGroup } from "@angular/forms";
import { Via_transmissao } from "../model/via-transmissao-documento";
import { Tipo_documento } from "../model/tipo-documento";

import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-via-transmissao-documento",
  templateUrl: "./via-transmissao-documento.component.html",
  styleUrls: ["./via-transmissao-documento.component.css"],
})
export class ViaTransmissaoDocumentoComponent implements OnInit {
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
  recoverOrRemoveItem: "remove" | "recover";

  createContactForm!: UntypedFormGroup;

  editar: boolean;
  // tipo_documentos: any;
  // tipo_documento = new Tipo_documento();

  via_transmissao_documentos: any;
  via_transmissao_documento = new Via_transmissao();
  via_transmissao_documento_edit = new Via_transmissao();

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService
  ) {}

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

  clientes: any;
  estados = [
    { id: "", nome: "Todas licencas" },
    { id: "1", nome: "Licencas Disponível" },
    { id: "0", nome: "licencas Usadas" },
    { id: "4", nome: "Por Expirar" },
  ];

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
      { label: "Gerir Via de Transmissão", active: true },
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
    try {
      let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}&estado=${this.filtro.estado}`;
      this.generalService
        .execute(
          `gd-documento-via-transmissao`,
          GeneralConstants.CRUD_OPERATIONS.READ,
          "",
          "",
          params
        )
        .subscribe((res: any) => {
          console.log(
            "RESULTADO  DA LISTA ----------------------------------------------------------",
            res
          );
          if (res.data) {
            this.via_transmissao_documentos = res.data.data;
            this.filtro.total_itens = res.data.meta.total;
          }
        });
    } catch (e) {
      console.log("Erro ao buscar ", e);
    }
  }

  save() {
    this.markFormAsSubmitted();

    try {
      if (this.momentForm.invalid) {
        console.log("Dados inválidos", this.via_transmissao_documento);
        console.log("ERROS", this.momentForm.errors);
        return;
      }

      console.log("DADOS válidos", this.via_transmissao_documento);
      this.generalService
        .execute(
          "gd-documento-via-transmissao",
          GeneralConstants.CRUD_OPERATIONS.INSERT,
          this.via_transmissao_documento
        )
        .subscribe((res: any) => {
          console.log("RESULTAO DO CADASTRO", res);
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
    } catch (e) {
      console.log("Erro ao cadastrar", e);
    }
  }

  questionsToremoveItem(data: any, recoverOrRemoveItem: "recover" | "remove") {
    this.via_transmissao_documento = data;
    this.recoverOrRemoveItem = recoverOrRemoveItem;

    this.removeItemModal?.show();
  }

  removeItem() {
    if (this.recoverOrRemoveItem === "recover") {
      this.via_transmissao_documento.estado = 1;
    }

    if (this.recoverOrRemoveItem === "remove") {
      this.via_transmissao_documento.estado = 0;
    }
    this.save();
    console.log("deletar este item", this.via_transmissao_documento);
    this.removeItemModal?.hide();
  }

  editUser(document: any, edit: boolean) {
    this.momentForm.get("estado").disable();
    this.via_transmissao_documento = { ...document };
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
    this.via_transmissao_documento = new Via_transmissao(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }
}

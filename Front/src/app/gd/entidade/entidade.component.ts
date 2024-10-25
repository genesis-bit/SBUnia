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
import { Entidade } from "../model/entidade";
import { UntypedFormGroup } from "@angular/forms";
import { PdfService } from "src/app/core/services/pdf.service";
import { zebraPrint } from "src/app/core/services/zebraPrint.service";
import { UtilsService } from "src/app/core/services/utils";

import { FormControl, FormGroup, Validators } from "@angular/forms";

import printJS from "print-js";
export default printJS;

@Component({
  selector: "app-entidade",
  templateUrl: "./entidade.component.html",
  styleUrls: ["./entidade.component.css"],
})
export class EntidadeComponent {
  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("modalFormulario", { static: false })
  modalFormulario?: ModalDirective;
  // @ViewChild("modalFormulario", { static: false }) newModal?: ModalDirective;
  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;

  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  name: any;

  dado_code_barra: any;
  createContactForm!: UntypedFormGroup;

  editar: boolean;

  recoverOrRemoveItem: "remove" | "recover";

  areas: any;

  tipo_documentos: any;
  acesso_documentos: any;
  prioridade_documentos: any;
  via_tramissao_documentos: any;
  entidades: any;
  entidade = new Entidade();
  momentForm!: FormGroup;

  maxDateForDocument: string;

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,

    private utilsService: UtilsService,
    private PdfService: PdfService,
    private zebraPrintZervice: zebraPrint
  ) {}

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

  clientes: any;

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

  maxDate: string = this.utilsService.getDataHojeAnoMesDia();

  ngOnInit() {
    /*
    JsBarcode("#barcode")
    //.options({font: "OCR-B"}) // Will affect all barcodes
    .CODE128("B24042310460002974081", {  displayValue: false, height: '35px',width: '1px',  textPosition: "top", fontSize: 1, padding: 0,margin: 0,})
    .render();

*/
    this.carregarLista();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Entidade", active: true },
    ];

    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);
    this.momentForm = new FormGroup({
      nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      endereco: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      telefone: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),

      estado: new FormControl("", [Validators.required]),
    });
  }

  get nome() {
    return this.momentForm.get("nome")!;
  }
  get endereco() {
    return this.momentForm.get("endereco")!;
  }
  get email() {
    return this.momentForm.get("email")!;
  }

  get telefone() {
    return this.momentForm.get("telefone")!;
  }
  get estado() {
    return this.momentForm.get("estado")!;
  }

  pesquisarEnter(event: any) {
    this.filtro.page = 1;
    if (event.key == "Enter") {
      this.carregarLista();
    } else {
      this.carregarLista();
    }
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
    console.log("MAX DATA ", this.maxDate);

    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}&estado=${this.filtro.estado}`;
    this.generalService
      .execute(
        `gd-entidade`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.entidades = res.data.data;
          console.log(res.data);
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  save() {
    this.markFormAsSubmitted();

    console.log(this.entidade);

    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.entidade);
      console.log("ERROS", this.momentForm);
      return;
    }
    console.log("DADOS válidos", this.entidade);

    this.generalService
      .execute(
        "gd-entidade",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.entidade
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso", res);
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

  removeUser(id: any) {
    // this.deleteId = id
    this.removeItemModal?.show();
  }

  questionsToremoveItem(data: any, recoverOrRemoveItem: "recover" | "remove") {
    this.entidade = data;
    this.recoverOrRemoveItem = recoverOrRemoveItem;
    this.removeItemModal?.show();
  }

  removeItem() {
    if (this.recoverOrRemoveItem === "recover") {
      this.entidade.estado = 1;
    }

    if (this.recoverOrRemoveItem === "remove") {
      this.entidade.estado = 0;
    }
    this.save();
    console.log("deletar este item", this.entidade);
    this.removeItemModal?.hide();
  }

  remove() {
    console.log("ID ---------------------", this.entidade.id);

    this.generalService
      .execute(
        `gd-entidade/${this.entidade.id}`,
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

  editUser(entidade: any, edit: boolean) {
    this.momentForm.get("estado").disable();
    this.entidade = entidade;
    this.editar = edit;
    this.modalFormulario?.show();
  }

  openModal(_new: boolean) {
    this.momentForm.get("estado").enable();

    this.editar = _new;
    this.resetForm();
    this.modalFormulario?.show();
  }

  closeModal() {
    this.resetForm();
    this.modalFormulario?.hide();
  }

  markFormAsSubmitted() {
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      const control = this.momentForm.get(controlName);
      control?.updateValueAndValidity(); // Atualiza o estado do controle
    });
    this.momentForm.updateValueAndValidity(); // Atualiza o estado do formulário
  }

  resetForm() {
    this.entidade = new Entidade(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }
}

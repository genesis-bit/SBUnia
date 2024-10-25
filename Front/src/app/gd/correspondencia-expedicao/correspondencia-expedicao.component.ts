import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";

import { Router } from "@angular/router";

import { GeneralService } from "src/app/core/services/general.service";
import { GeneralConstants } from "src/app/core/constants/GeneralConstants";

import { NotificationService } from "src/app/core/services/notification.service";

import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from "ngx-bootstrap/modal";
import { Documento } from "../model/gd";
import {
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { UtilsService } from "src/app/core/services/utils";

@Component({
  selector: "app-correspondencia-expedicao",
  templateUrl: "./correspondencia-expedicao.component.html",
  styleUrls: ["./correspondencia-expedicao.component.css"],
})
export class CorrespondenciaExpedicaoComponent {
  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;
  @ViewChild("newDocumentModal", { static: false }) newModal?: ModalDirective;

  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  name: any;

  createContactForm!: UntypedFormGroup;

  tipo_documentos: any;
  acesso_documentos: any;
  prioridade_documentos: any;
  via_tramissao_documentos: any;
  documentos: any;
  documento = new Documento();
  momentForm!: FormGroup;

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
    estado: "1",
    page: 1,
    pagesize: 5,
    total_itens: 0,
    selectValue: "",
    cliente: "",
    nome_code: "",
    gd_documento_via_transmissao_id: "",
    gd_prioridade_documento_id: "",
    gd_documento_acesso_id: "",
    gd_tipo_documento_id: "",
  };

  maxDate: string = this.utilsService.getDataHojeAnoMesDia();

  ngOnInit() {
    this.carregarLista();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Licenças", active: true },
    ];

    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);
    this.momentForm = new FormGroup({
      periodo_tratamento: new FormControl("", [Validators.required]),
      receptor: new FormControl("receptor", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
      expedido_fisico: new FormControl("", [Validators.required]),
      expedido_email: new FormControl("", [Validators.required]),
      data_expedicao: new FormControl("", [Validators.required]),
      notificacao_enviada: new FormControl("", [Validators.required]),
    });
  }

  get periodo_tratamento() {
    return this.momentForm.get("periodo_tratamento");
  }

  get receptor() {
    return this.momentForm.get("receptor");
  }
  get expedido_fisico() {
    return this.momentForm.get("expedido_fisico");
  }
  get expedido_email() {
    return this.momentForm.get("expedido_email");
  }
  get data_expedicao() {
    return this.momentForm.get("data_expedicao");
  }
  get notificacao_enviada() {
    return this.momentForm.get("notificacao_enviada");
  }

  pesquisar() {
    this.filtro.page = 1;
    console.log("FILTRO-------", this.filtro);
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
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}`;
    this.generalService
      .execute(
        `buscar-documento-assinado`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.documentos = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
          console.log("DOCUMENTO-------------------------", res);
          this.documentos.forEach((item) => {
            if (item.data_expedicao)
              item.data_expedicao = item.data_expedicao.substring(0, 10);
            if (item.data_despacho)
              item.data_despacho = item.data_despacho.substring(0, 10);
          });
        }
      });
  }

  openModal(documento: any) {
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
    this.documento = documento;
    console.log("DATA expedição", this.documento.data_expedicao);
    this.newModal.show();
  }

  closeModal() {
    this.resetForm();
    this.newModal?.hide();
  }

  markFormAsSubmitted() {
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      const control = this.momentForm.get(controlName);
      control?.updateValueAndValidity(); // Atualiza o estado do controle
    });
    this.momentForm.updateValueAndValidity(); // Atualiza o estado do formulário
  }

  resetForm() {
    this.documento = new Documento(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }

  save() {
    this.markFormAsSubmitted();
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.documento);
      console.log("ERROS", this.momentForm.errors);
      return;
    }

    console.log("DADOS válidos", this.documento);

    this.generalService
      .execute(
        "gd-documento-expedir",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.documento
      )
      .subscribe((res: any) => {
        console.log("RESULTADO", res);
        if (res.data) {
          this.carregarLista();
          this.NotificacaoService.notificationSuccess(res.message);
          this.closeModal();
        } else {
          console.log("CAIU NO ERRO");

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

  searchDocumentByCode(code: string) {
    this.generalService
      .execute(
        `buscar-documento-por-codigo/${code}`,
        GeneralConstants.CRUD_OPERATIONS.GET,
        "",
        ""
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.router.navigate(["gd/tramitar-documento/", code]);
          //chamar um componente e levar o codigo
        } else {
          console.log("Documento não existe");
        }
      });
  }
}

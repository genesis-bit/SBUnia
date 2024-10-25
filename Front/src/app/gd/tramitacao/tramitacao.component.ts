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
  UntypedFormGroup,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-tramitacao",
  templateUrl: "./tramitacao.component.html",
  styleUrls: ["./tramitacao.component.css"],
})
export class TramitacaoComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("newContactModal", { static: false }) newModal?: ModalDirective;
  @ViewChild("newDocumentModal", { static: false })
  newDocumentModal?: ModalDirective;

  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  name: any;
  momentForm!: FormGroup;

  createContactForm!: UntypedFormGroup;

  tipo_documentos: any;
  acesso_documentos: any;
  prioridade_documentos: any;
  via_tramissao_documentos: any;
  documentos: any;
  documento = new Documento();

  areas: any;

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,
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
    base_area_id: "",
  };
  ngOnInit() {
    this.carregarLista();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Tramitação", active: true },
    ];

    this.carregarTipoDocumentos();
    this.carregarPrioridadeDocumentos();
    this.carregarViaTramissaoDocumentos();
    this.carregarDocumentosAcessos();

    this.carregarAreas();
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);

    this.momentForm = new FormGroup({
      codigo_documento: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator,
      ]),
    });
  }

  get codigo_documento() {
    return this.momentForm.get("codigo_documento")!;
  }
  carregarTipoDocumentos() {
    this.generalService
      .execute(`gd-documento-tipo`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.tipo_documentos = res.data;
          }
        }
      });
  }

  carregarPrioridadeDocumentos() {
    this.generalService
      .execute(`gd-documento-prioridade`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.prioridade_documentos = res.data;
          }
        }
      });
  }

  carregarDocumentosAcessos() {
    this.generalService
      .execute(`gd-documento-acesso`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.acesso_documentos = res.data;
          }
        }
      });
  }
  carregarViaTramissaoDocumentos() {
    this.generalService
      .execute(
        `gd-documento-via-transmissao`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.via_tramissao_documentos = res.data;
          }
        }
      });
  }

  carregarAreas() {
    this.generalService
      .execute(`gd-areas`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.areas = res.data;
          }
        }
      });
  }
  pesquisar() {
    this.filtro.page = 1;

    console.log("FILTRO----",)

    if (this.filtro.gd_documento_acesso_id === null) {
      this.filtro.gd_documento_acesso_id = "";
    }
    if (this.filtro.gd_documento_via_transmissao_id === null) {
      this.filtro.gd_documento_via_transmissao_id = "";
    }
    if (this.filtro.gd_prioridade_documento_id === null) {
      this.filtro.gd_prioridade_documento_id = "";
    }
    if (this.filtro.gd_tipo_documento_id === null) {
      this.filtro.gd_tipo_documento_id = "";
    }
    if (this.filtro.base_area_id === null) {
      this.filtro.base_area_id = "";
    }

    if (this.filtro.estado === null) {
      this.filtro.estado = "";
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

  carregarLista() {
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&estado=${this.filtro.estado}&gd_documento_via_transmissao_id=${this.filtro.gd_documento_via_transmissao_id}&gd_prioridade_documento_id=${this.filtro.gd_prioridade_documento_id}&gd_documento_acesso_id=${this.filtro.gd_documento_acesso_id}&gd_tipo_documento_id=${this.filtro.gd_tipo_documento_id}&codigo_documento=${this.filtro.name_code}&base_area_id=${this.filtro.base_area_id}`;

    this.generalService
      .execute(
        `buscar-documento-tramitacao`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        console.log("RESULTADO DA TRAMITAÇÃO", res);

        if (res.data) {
          this.documentos = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  editDocumentByCode(code: string) {
    this.router.navigate(["gd/tramitar-documento/", code]);
    //chamar um componente e levar o codigo
  }
  despachoDocumentByCode(code: string) {
    this.router.navigate(["gd/tramitacao-despacho/", code]);
    //chamar um componente e levar o codigo
  }

  tramitacaoDetalhes(code: string) {
    this.router.navigate(["gd/tramitacao-detalhes/", code]);
  }

  searchDocumentByCode(code: string) {
    this.markFormAsSubmitted();

    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.documento);
      console.log("ERROS", this.momentForm.errors);
      return;
    }
    console.log("DADOS válidos", this.documento);
    this.generalService
      .execute(
        `confirmar-recepcao-documento/${code}`,
        GeneralConstants.CRUD_OPERATIONS.GET,
        "",
        ""
      )
      .subscribe((res: any) => {
        if (res.data) {
          //  this.router.navigate(["gd/tramitar-documento/", code]);
          this.carregarLista();
          this.closeModal();
          //chamar um componente e levar o codigo
        } else {
          console.log("Documento não existe");
        }
      });
  }

  openModal() {
    this.resetForm();
    this.newDocumentModal?.show();
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

  closeModal() {
    this.resetForm();
    this.newDocumentModal?.hide();
  }
}

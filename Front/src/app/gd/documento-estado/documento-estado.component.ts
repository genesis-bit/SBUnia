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

import { Documento_estado } from "../model/documento-estado";

@Component({
  selector: "app-documento-estado",
  templateUrl: "./documento-estado.component.html",
  styleUrls: ["./documento-estado.component.css"],
})
export class DocumentoEstadoComponent {
  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("newContactModal", { static: false })
  newContactModal?: ModalDirective;
  // @ViewChild("newContactModal", { static: false }) newModal?: ModalDirective;
  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;

  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  name: any;

  createContactForm!: UntypedFormGroup;

  documento_estados: any;
  documento_estado = new Documento_estado();

  tipo_documentos: any;
  gd_estados: any;
  via_transmissao: any;
  ordem_referencias: any;
  documentos: any;
  entidades_acreditadas: any;

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService
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
  ngOnInit() {
    this.carregarLista();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Documento-Estados", active: true },
    ];
    this.carregarTipoDocumentos();
    this.carregarViaTransmissao();
    this.carregarEstadoDocumento();
    this.carregarOrdemReferencia();
    this.carregarDocumentos();
    this.carregarEntidadeAcreditada();
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
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}`;
    this.generalService
      .execute(
        `gd-documento-estado`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.documento_estados = res.data.data;
          this.filtro.total_itens = res.data.meta.total;

          this.documento_estados.forEach((documento: any) => {
            if (documento.data_entrada) {
              documento.data_entrada = String(documento.data_entrada).substring(
                0,
                10
              );
            }

            if (documento.data_saida) {
              documento.data_saida = String(documento.data_saida).substring(
                0,
                10
              );
            }

            if (documento.data_documento) {
              documento.data_documento = String(
                documento.data_documento
              ).substring(0, 10);
            }
          });
        }
      });
  }
  carregarTipoDocumentos() {
    this.generalService
      .execute(`gd-documento-tipo`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.tipo_documentos = res.data;
        }
      });
  }

  carregarDocumentos() {
    this.generalService
      .execute(`gd-documento`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.documentos = res.data;
        }
      });
  }

  carregarViaTransmissao() {
    this.generalService
      .execute(
        `gd-documento-via-transmissao`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.via_transmissao = res.data;
        }
      });
  }

  carregarEstadoDocumento() {
    this.generalService
      .execute(`gd-estado`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.gd_estados = res.data;
        }
      });
  }
  carregarOrdemReferencia() {
    this.generalService
      .execute(`gd-ordem-referencia`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.ordem_referencias = res.data;
        }
      });
  }

  carregarEntidadeAcreditada() {
    this.generalService
      .execute(
        `gd-documento-entidade-acreditada`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.entidades_acreditadas = res.data;
        }
      });
  }

  save() {
    this.generalService
      .execute(
        "gd-documento-estado",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.documento_estado
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.documento_estado = new Documento_estado();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  update() {
    this.generalService
      .execute(
        "gd-documento-estado",
        GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE,
        this.documento_estado
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.documento_estado = new Documento_estado();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }
  removeUser(id: any) {
    // this.deleteId = id
    this.removeItemModal?.show();
  }

  editUser(document: any) {
    this.documento_estado = document;
    this.newContactModal?.show();
  }
}

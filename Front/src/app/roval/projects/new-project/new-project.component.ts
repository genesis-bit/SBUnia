import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";

import { GeneralService } from "src/app/core/services/general.service";
import { GeneralConstants } from "src/app/core/constants/GeneralConstants";

import { NotificationService } from "src/app/core/services/notification.service";

import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from "ngx-bootstrap/modal";
import { Documento } from "../../gd/model/gd";
import { UntypedFormGroup } from "@angular/forms";
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent {
  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("newContactModal", { static: false }) newModal?: ModalDirective;

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

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
    this.route.params.subscribe((params) => {
      this.documento.codigo = params["code"];
      // Agora, 'this.codigo' contém o valor do parâmetro 'codigo' da URL.
    });
    this.carregarDocumento();
    this.carregarTipoDocumentos();
    this.carregarPrioridadeDocumentos();
    this.carregarViaTramissaoDocumentos();
    this.carregarDocumentosAcessos();
  }

  carregarDocumento() {
    this.generalService
      .execute(
        `gd-documento/${this.documento.codigo}`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        ""
      )
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.documento = res.data;
            this.documento.data_documento = this.documento.data_documento.substring(0, 10); 
            this.documento.data_despacho = this.documento.data_despacho.substring(0, 10); 
            this.documento.data_entrada = this.documento.data_entrada.substring(0, 10); 
            this.documento.data_registo = this.documento.data_registo.substring(0, 10);
          }
        }
      });
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
          this.router.navigate(["gd/registar-documento/", code]);
          //chamar um componente e levar o codigo
        } else {
          console.log("Documento não existe");
        }
      });
  }

  save() {
    this.documento.gd_estado_id = 2;
    this.generalService
      .execute(
        "gd-documento",
        GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE,
        this.documento
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          // this.carregarDocumento();
          this.router.navigate(["gd/registo"]);
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }
}


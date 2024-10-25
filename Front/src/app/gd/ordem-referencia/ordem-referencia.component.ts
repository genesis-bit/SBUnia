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
import { Ordem_referencia } from "../model/ordem-referencia";

@Component({
  selector: "app-ordem-referencia",
  templateUrl: "./ordem-referencia.component.html",
  styleUrls: ["./ordem-referencia.component.css"],
})
export class OrdemReferenciaComponent implements OnInit {
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

  ordem_referencias: any;
  ordem_referencia = new Ordem_referencia();

  documentos: any;
  comunicacao: any;

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
      { label: "Gerir Ordem de referência", active: true },
    ];

    this.carregarListaDocumento();
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
        `gd-ordem-referencia`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.ordem_referencias = res.data.data;
          this.filtro.total_itens = res.data.meta.total;

          this.ordem_referencias.forEach((ordem: any) => {
            ordem.data_documento = String(ordem.data_documento).substring(
              0,
              10
            );
          });
        }
      });
  }
  carregarListaDocumento() {
    this.generalService
      .execute(
        `gd-documento`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        ""
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.documentos = res.data;
        }
      });
  }

  save() {
    this.generalService
      .execute(
        "gd-ordem-referencia",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.ordem_referencia
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.ordem_referencia = new Ordem_referencia();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  update() {
    this.generalService
      .execute(
        "gd-ordem-referencia",
        GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE,
        this.ordem_referencia
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.ordem_referencia = new Ordem_referencia();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  removeUser(id: any) {
    // this.deleteId = id
    this.removeItemModal?.show();
  }

  editUser(ordem_referencia: any) {
    this.ordem_referencia = ordem_referencia;
    this.newContactModal?.show();
  }
}

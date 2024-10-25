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
import { PdfService } from "src/app/core/services/pdf.service";
import { zebraPrint } from "src/app/core/services/zebraPrint.service";
import { Ocorrencia_tipo } from "../model/ocorrencia_tipo";

import {
  UntypedFormGroup,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-ocorrencias-tipo",
  templateUrl: "./ocorrencias-tipo.component.html",
  styleUrls: ["./ocorrencias-tipo.component.css"],
})
export class OcorrenciasTipoComponent {
  momentForm!: FormGroup;

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

  tipo_documentos: any;
  ocorrencias_tipos: any;
  ocorrencia_tipo = new Ocorrencia_tipo();

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,

    private PdfService: PdfService,
    private zebraPrintZervice: zebraPrint
  ) {}

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

  clientes: any;

  estadoList = [
    {
      id: 0,
      nome: "Inativo",
    },
    { id: 1, nome: "Ativo" },
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
      { label: "Gerir Tipos de ocorrências", active: true },
    ]; 




    this.momentForm = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      estado: new FormControl("", [Validators.required]),
      cor: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
    });
  }

  get nome() {
    return this.momentForm.get("nome")!;
  }

  get estado() {
    return this.momentForm.get("estado")!;
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
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&nome_code=${this.filtro.name_code}`;
    this.generalService
      .execute(   `ocorrencias-tipos`,  GeneralConstants.CRUD_OPERATIONS.READ,"","",params)  .subscribe((res: any) => {
        if (res.data) {
          this.ocorrencias_tipos = res.data.data;  
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }
 
 

  carregarTipoOcorrencias() { 
    this.generalService
      .execute(`ocorrencias-tipos`,  GeneralConstants.CRUD_OPERATIONS.READ)  .subscribe((res: any) => {
        if (res.data) {
          this.ocorrencias_tipos = res.data;   
        }
      });
  }
 
 
 
  ImprimirTicket(data: any) {
    this.dado_code_barra = data;
    console.log(data);
    //  this.zebraPrintZervice.printTeste(data)
    //  this.print(data)

    this.PdfService.ticketDocumentoPdf(data);
  }

  save() {
 
    this.generalService
      .execute(`ocorrencias-tipos`,   GeneralConstants.CRUD_OPERATIONS.INSERT,    this.ocorrencia_tipo  )
      .subscribe((res: any) => {  
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista(); 
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  update() {
    this.generalService
      .execute(
        `ocorrencias-tipos/${this.ocorrencia_tipo.id}`,
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        // this.documento
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");

        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          // this.documento = new Documento();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  } // Delete User
  removeUser(id: any) {
    // this.deleteId = id
    this.removeItemModal?.show();
  }

  editar(data: any) {
    this.ocorrencia_tipo = data;
    this.modalFormulario?.show();
  }

  getCorEstadoContrato(dado: any) {
    let cor = "";

    if (Number(dado) == 1) cor = "#005e0d";
    else if (Number(dado) == 2) cor = "#D81616";
    else cor = "#99AA99";

    return cor;
  }
  getCorEstadoMigracao(dado: any) {
    let cor = "";

    if (Number(dado) == 1) cor = "#005e0d";
    else cor = "#D81616";

    return cor;
  }

 
}

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
import { Estado } from "../model/estado";

import {
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-estados",
  templateUrl: "./estados.component.html",
  styleUrls: ["./estados.component.css"],
})
export class EstadosComponent {
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
  estados: any;
  estado_model = new Estado();

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
    { id: 0, nome: "Inativo" },
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
      { label: "Gerir Estados de ocorrência", active: true },
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

  get cor() {
    return this.momentForm.get("cor");
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
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&nome_code=${this.filtro.nome_code}`;
    this.generalService
      .execute(
        `ocorrencias-estados`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          console.log(res);
          this.estados = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  save() {
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.estado_model);
      console.log("ERROS", this.momentForm.value);
      return;
    }
    console.log("DADOS válidos", this.estado_model);

    this.generalService
      .execute(
        "ocorrencias-estados",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.estado_model
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");
        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.estado_model = new Estado();
          this.momentForm.reset();
          Object.keys(this.momentForm.controls).forEach((controlName) => {
            this.momentForm.controls[controlName].setErrors(null);
          });
          this.modalFormulario?.hide();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }
  removeUser(id: any) {
    // this.deleteId = id
    this.removeItemModal?.show();
  }

  editar(data: any) {
    this.estado_model = data;
    this.modalFormulario?.show();
  }

  getCorEstado(dado: any) {
    let cor = "";
    if (Number(dado) == 1) cor = "#005e0d";
    else if (Number(dado) == 0) cor = "#D81616";
    else cor = "#99AA99";
    return cor;
  }
}

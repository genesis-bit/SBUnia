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
import { ViaTransmissao } from "../model/viaTransmissao";

import {
  UntypedFormGroup,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-via-transmissao',
  templateUrl: './via-transmissao.component.html',
  styleUrls: ['./via-transmissao.component.css']
})
export class ViaTransmissaoComponent {
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

  // editar: boolean;

  viaTransmissoes: any;
  viaTransmissao = new ViaTransmissao();

  estadoList = [
    { id: 0, nome: "Inativo" },
    { id: 1, nome: "Ativo" },
  ];

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,

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
  ngOnInit() {
    this.carregarLista();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Via de transmissão", active: true },
    ];

    this.momentForm = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      estado: new FormControl("", [Validators.required]),
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
    console.log("NOME",this.filtro.nome_code)
    console.log("NAME",this.filtro.name_code)
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&nome_code=${this.filtro.nome_code}`;
    this.generalService
      .execute(
        `ocorrencias-via-transmissoes`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        console.log("RESULTADO",res)
        if (res.data) {
          console.log(res);
          this.viaTransmissoes = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  save() {
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.viaTransmissao);
      console.log("ERROS", this.momentForm.errors);
      return;
    }
    console.log("DADOS válidos", this.viaTransmissao);

    this.generalService
      .execute(
        "ocorrencias-via-transmissoes",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.viaTransmissao
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");

        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.viaTransmissao = new ViaTransmissao();
          this.momentForm.reset();
          Object.keys(this.momentForm.controls).forEach((controlName) => {
            this.momentForm.controls[controlName].setErrors(null);
          });
          this.modalFormulario?.hide()
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

  editar(dados: any) {
    this.viaTransmissao = dados;
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

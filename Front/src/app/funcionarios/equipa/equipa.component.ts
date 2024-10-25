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
import { Equipa } from "../model/equipa";

import {
  UntypedFormGroup,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-equipa",
  templateUrl: "./equipa.component.html",
  styleUrls: ["./equipa.component.css"],
})
export class EquipaComponent {
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

  pessoa: any;

  provincias: any;
  natureza_ocorrencia = [
    { id: 1, nome: "Particular" },
    { id: 2, nome: "Empresa" },
  ];

  equipas: any;
  equipa = new Equipa();

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
    this.carregarProvincia();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Equipas", active: true },
    ];

    this.momentForm = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      descricao: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      base_provincia_id: new FormControl("", [Validators.required]),

    });
  }

  get nome() {
    return this.momentForm.get("nome")!;
  }

  get descricao() {
    return this.momentForm.get("descricao")!;
  }

  get base_provincia_id() {
    return this.momentForm.get("base_provincia_id")!;
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
      .execute(`equipas`, GeneralConstants.CRUD_OPERATIONS.READ, "", "", params)
      .subscribe((res: any) => {
        if (res.data) {
          this.equipas = res.data.data;
          // console.log("Equipas", res);
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  carregarProvincia() {
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}`;
    this.generalService
      .execute(`base-provincias`, GeneralConstants.CRUD_OPERATIONS.READ, "", "", params)
      .subscribe((res: any) => {
        if (res.data) {
          this.provincias = res.data.data;
          // console.log("Equipas", res);
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  // ImprimirTicket(data: any) {
  //   this.dado_code_barra = data;
  //   console.log(data);
  //   //  this.zebraPrintZervice.printTeste(data)
  //   //  this.print(data)

  //   this.PdfService.ticketDocumentoPdf(data);
  // }

  save() {
    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.equipa);
      console.log("ERROS", this.momentForm.errors);
      return;
    }
    console.log("DADOS válidos", this.equipa);

    this.generalService
      .execute("equipas", GeneralConstants.CRUD_OPERATIONS.INSERT, this.equipa)
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");
        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.modalFormulario?.hide();
          // this.equipa = new Equipa();
          this.momentForm.reset();
          Object.keys(this.momentForm.controls).forEach((controlName) => {
            this.momentForm.controls[controlName].setErrors(null);
          });
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  update() {
    this.generalService
      .execute("equipas", GeneralConstants.CRUD_OPERATIONS.INSERT, this.equipa)
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");

        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.equipa = new Equipa();
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

  editar(equipa: any) {
    this.equipa = equipa;
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

  print(data): void {
    let printContents, popupWin;
    printContents = document.getElementById("print-section").innerHTML;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
        <html>
          <head>
            <title>Print tab</title>
            <style>
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()" style="width: 100px; height: 60px; font-size:16px   b">

      ${data.codigo_documento}


      </body>
        </html>`);
    popupWin.document.close();
  }
}

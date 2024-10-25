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
import { EquipaFuncionario } from "../model/equipaFuncionario";

import {
  UntypedFormGroup,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-escala",
  templateUrl: "./escala.component.html",
  styleUrls: ["./escala.component.css"],
})
export class EscalaComponent {
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

  equipas: any;
  funcionarios: any;
  responsavelList = [
    {
      id: 0,
      nome: "Membro",
    },
    {
      id: 1,
      nome: "Responsável",
    },
  ];

  natureza_ocorrencia = [
    { id: 1, nome: "Particular" },
    { id: 2, nome: "Empresa" },
  ];

  equipasFuncionarios: any;
  equipaFuncionario = new EquipaFuncionario();

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
    // this.carregarLista();
    this.carregarEquipas();
    this.carregarFuncionarios();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Equipas", active: true },
    ];

    this.momentForm = new FormGroup({
      id: new FormControl(""),
      equipa_id: new FormControl("", [Validators.required]),
      rh_funcionario_id: new FormControl("", [Validators.required]),
      responsavel: new FormControl("", [Validators.required]),
    });
  }

  get equipa_id() {
    return this.momentForm.get("equipa_id")!;
  }

  get rh_funcionario_id() {
    return this.momentForm.get("rh_funcionario_id")!;
  }

  get responsavel() {
    return this.momentForm.get("responsavel")!;
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

    console.log("PASSOU AQUI.........")

    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}`;
    this.generalService
      .execute(
        `equipas-funcionarios`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.equipasFuncionarios = res.data.data;
          console.log("Equipas-Funcionarios", res);
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  carregarEquipas() {
    // let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}`;
    this.generalService
      .execute(`equipas`, GeneralConstants.CRUD_OPERATIONS.READ, "", "")
      .subscribe((res: any) => {
        if (res.data) {
          this.equipas = res.data;
          console.log("Equipas", res);
          // this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  carregarFuncionarios() {
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}`;
    this.generalService
      .execute(
        `rh-funcionarios`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.funcionarios = res.data.data;
          console.log("Funcionarios", res);
          // this.filtro.total_itens = res.data.meta.total;
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
      console.log("Dados inválidos", this.equipaFuncionario);
      console.log("ERROS", this.momentForm.errors);
      return;
    }
    console.log("DADOS válidos", this.equipaFuncionario);

    this.generalService
      .execute(
        "equipas",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.equipaFuncionario
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");
        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
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
      .execute(
        "equipas",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.equipaFuncionario
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");

        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.equipaFuncionario = new EquipaFuncionario();
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

  editar(equipaFuncionario: any) {
    this.equipaFuncionario = equipaFuncionario;
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

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
import { Funcionario } from "../model/funcionario";

import {
  UntypedFormGroup,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-funcionario",
  templateUrl: "./funcionario.component.html",
  styleUrls: ["./funcionario.component.css"],
})
export class FuncionarioComponent {
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

  pessoas: any;
  municipios: any;
  categorias: any;

  natureza_ocorrencia = [
    { id: 1, nome: "Particular" },
    { id: 2, nome: "Empresa" },
  ];

  funcionarios: any;
  funcionario = new Funcionario();

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,

    private PdfService: PdfService,
    private zebraPrintZervice: zebraPrint
  ) {}

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

  estadoList = [
    {
      id: 1,
      nome: "Iniciado",
    },
    {
      id: 2,
      nome: "Atendido",
    },
    {
      id: 3,
      nome: "Falso",
    },
  ];

  generoList = [
    { id: "M", nome: "Masculino" },
    { id: "F", nome: "Femenino" },
  ];

  estadoCivilList = [
    { id: "CASADO", nome: "Casado" },
    { id: "SOLTEIRO", nome: "Solteiro" },
    { id: "VIUVO", nome: "Viuvo" },
    { id: "VIUVA", nome: "Viuva" },
    { id: "DIVORCIADO", nome: "Divorciado" },
  ];

  tipoIdentificacaoList = [
    { id: "BILHETE", nome: "Bilhete" },
    { id: "PASSAPORTE", nome: "Passaporte" },
  ];

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
    this.carregarPessoas();
    this.carregarCategorias();
    this.carregarMunicipios();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Ocorrências", active: true },
    ];

    this.momentForm = new FormGroup({
      id: new FormControl(""),
      user_id: new FormControl(""),
      nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      ndi: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),

      genero: new FormControl("", [Validators.required]),
      estado_civil: new FormControl("", [Validators.required]),
      tipo_identificacao: new FormControl("", [Validators.required]),

      data_nascimento: new FormControl("", [Validators.required]),
      base_municipio_id: new FormControl("", [Validators.required]),
      endereco: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),

      data_emissao: new FormControl("", [Validators.required]),
      banco: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      mae: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      pai: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),

      telefone_principal: new FormControl("", [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(255),
      ]),
      telefone_alternativo: new FormControl("", [Validators.maxLength(255)]),
      outro_contacto: new FormControl("", [Validators.maxLength(255)]),
      rh_categoria_id: new FormControl("", [Validators.required]),
    });
  }

  get nome() {
    return this.momentForm.get("nome")!;
  }

  get ndi() {
    return this.momentForm.get("ndi")!;
  }

  get genero() {
    return this.momentForm.get("genero")!;
  }

  get estado_civil() {
    return this.momentForm.get("estado_civil")!;
  }

  get tipo_identificacao() {
    return this.momentForm.get("tipo_identificacao")!;
  }

  get endereco() {
    return this.momentForm.get("endereco")!;
  }

  get data_nascimento() {
    return this.momentForm.get("data_emissao")!;
  }

  get data_emissao() {
    return this.momentForm.get("data_emissao")!;
  }

  get base_municipio_id() {
    return this.momentForm.get("base_municipio_id")!;
  }

  get banco() {
    return this.momentForm.get("banco")!;
  }

  get mae() {
    return this.momentForm.get("mae")!;
  }

  get pai() {
    return this.momentForm.get("pai")!;
  }

  get telefone_principal() {
    return this.momentForm.get("telefone_principal")!;
  }

  get telefone_alternativo() {
    return this.momentForm.get("telefone_alternativo")!;
  }

  get outro_contacto() {
    return this.momentForm.get("outro_contacto")!;
  }

  get rh_categoria_id() {
    return this.momentForm.get("rh_categoria_id")!;
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
        `rh-funcionarios`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.funcionarios = res.data.data;
          console.log("Funcionários", res.data);
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }
  carregarCategorias() {
    // let params = `page=${this.filtro.page}&pageSize=&search=`;

    console.log("Categorias: passou aqui");
    this.generalService
      .execute(`rh-categorias`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.categorias = res.data;
          // console.log("CATEGORIA----", res.data);
        }
      });

  }
  carregarMunicipios() {
    this.generalService
      .execute(`base-municipios`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          this.municipios = res.data;
          console.log("MUNICIPIOS",res)
        }
      });
  }
  carregarPessoas() {
    this.generalService
      .execute(`base-pessoas`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          if (res.data) {
            this.pessoas = res.data.data;
            console.log("PESSOAS", res);
            console.log("LISAT DE PESSOAS", res);
          }
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
      console.log("Dados inválidos", this.funcionario);
      console.log("ERROS", this.momentForm.errors);
      return;
    }
    console.log("DADOS válidos", this.funcionario);
    // this.ocorrencia.base_pessoa_id = 1;
    // this.ocorrencia.ocorrencia_local_solicitacao_id = 1
    // this.ocorrencia.ocorrencia_estado_id = 1;
    this.funcionario.user_id =1;
    console.log(this.funcionario);
    this.generalService
      .execute(
        "rh-funcionarios",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.funcionario
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");
        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          // this.funcionario = new Funcionario();
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
        "gd-documento",
        GeneralConstants.CRUD_OPERATIONS.INSERT
        // this.documento
      )
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");

        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.funcionario = new Funcionario();
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

  editar(funcionario: any) {
    this.funcionario = funcionario;
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

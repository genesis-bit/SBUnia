

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
  import { Router } from "@angular/router";
  @Component({
    selector: 'app-ocorrencias-configuracao',
    templateUrl: './ocorrencias-configuracao.component.html',
    styleUrls: ['./ocorrencias-configuracao.component.css']
  })
  export class OcorrenciasConfiguracaoComponent {


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
    Estado = new Estado();

    constructor(
      private router: Router,
      private modalService: BsModalService,
      private generalService: GeneralService,
      private NotificacaoService: NotificationService,

      private PdfService: PdfService,
      private zebraPrintZervice: zebraPrint
    ) { }

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
      this.breadCrumbItems = [
        { label: "Roval" },
        { label: "Gerir Estados de ocorrência", active: true },
      ];

    }


    estado() {
      this.router.navigate(['/ocorrencia/estados']);
    }

    tipoOcorrencia() {
      this.router.navigate(['/ocorrencia/ocorrencias-tipo']);
    }
    tipoActividade() {
      this.router.navigate(['/ocorrencia/ocorrencias-atividades-tipo']);
    }
    actividade() {
      this.router.navigate(['/ocorrencia/ocorrencias-atividades']);
    }
    produto() {
      this.router.navigate(['/ocorrencia/produtos']);
    }
    provincia() {
      this.router.navigate(['/ocorrencia/provincias']);
    }
    municipio() {
      this.router.navigate(['/ocorrencia/municipios']);
    }

    localSolicitacao(){
      this.router.navigate(['/inema/local-solicitacao'])
    }
    baseArea(){
      this.router.navigate(['/inema/ocorrencia-base-area'])
    }
    baseEstrutura(){
      this.router.navigate(['/inema/ocorrencia-base-estrutura'])
    }


  }


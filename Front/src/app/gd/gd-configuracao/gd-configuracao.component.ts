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

import {
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-gd-configuracao',
  templateUrl: './gd-configuracao.component.html',
  styleUrls: ['./gd-configuracao.component.css']
})
export class GdConfiguracaoComponent {

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
      { label: "Configurações do GD", active: true },
    ];

  }


  TipoDocumento() {
    this.router.navigate(['/gd/tipo-documento']);
  }

  Acesso() {
    this.router.navigate(['/gd/acesso-documento']);
  }
  Prioridade() {
    this.router.navigate(['/gd/prioridade-documento']);
  }
  ViaTransmissao() {
    this.router.navigate(['/gd/via-transmissao-documento']);
  }
  Estado() {
    this.router.navigate(['/gd/estado']);
  }
  DocumentoAtividade() {
    this.router.navigate(['/gd/documento-atividade']);
  }
  DocumentoDespacho() {
    this.router.navigate(['/gd/documento-despacho']);
  }

  Comunicacao(){
    this.router.navigate(['/gd/documento-comunicacao'])
  }
  
}


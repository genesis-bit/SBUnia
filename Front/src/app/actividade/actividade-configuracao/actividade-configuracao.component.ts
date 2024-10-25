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
  selector: 'app-actividade-configuracao',
  templateUrl: './actividade-configuracao.component.html',
  styleUrls: ['./actividade-configuracao.component.css']
})
export class ActividadeConfiguracaoComponent {

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



  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Configurações das Actividades", active: true },
    ];

  }


  TarefaEstado() {
    this.router.navigate(['/actividade/actividade-tarefa-estado']);
  }
  AreaActividade() {
    this.router.navigate(['/actividade/actividade-area']);
  }

  TarefaTipo() {
    this.router.navigate(['/actividade/actividade-tarefa-tipo']);
  }
  TipoActividade() {
    this.router.navigate(['/actividade/actividade-tipo']);
  }
 
  
}



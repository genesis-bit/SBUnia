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

import { Funcionario } from "../model/funcionario";
import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from "ngx-bootstrap/modal";

import {
  FormControl,
  FormGroup,
  Validators,
  UntypedFormGroup,
} from "@angular/forms";

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent {
  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("newContactModal", { static: false })
  newContactModal?: ModalDirective; 

  @ViewChild("newDocumentModal", { static: false })
  newDocumentModal?: ModalDirective;

  @ViewChild("modalFormulario", { static: false })
  modalFormulario?: ModalDirective;

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;

  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  name: any;

  momentForm!: FormGroup;

  createContactForm!: UntypedFormGroup;
  recoverOrRemoveItem: "remove" | "recover";
  editar: boolean;

  funcionarios: any;
  funcionario = new Funcionario();



  municipios: any;
  //funcionario_edit = new funcionario();
  categorias: any;
  base_pessoas: any;
  base_areas: any;

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService
  ) {}

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

  generoList = [
    { id: "M", nome: "Masculino" },
    { id: "F", nome: "Femenino" },
  ];

  estadoCivilList = [
    { id: "CASADO", nome: "Casado/a" },
    { id: "SOLTEIRO", nome: "Solteiro/a" },
    { id: "VIUVO", nome: "Viuvo/a" },
    { id: "DIVORCIADO", nome: "Divorciado/a" },
  ];

  tipoIdentificacaoList = [
    { id: "BILHETE", nome: "Bilhete" },
    { id: "PASSAPORTE", nome: "Passaporte" },
  ];

  filtro = {
    name_code: "",
    area_code:"",
    categoria_code:"",
    pessoa_code:"",
    estado: 1,
    page: 1,
    pagesize: 5,
    total_itens: 0,
    selectValue: "",
    cliente: "",
    nome_code: "",
  };

  ngOnInit() {
    this.carregarLista();
    this.carregarArea();
    this.carregarCategoria();
    this.carregarPessoa();
    this.carregarMunicipios();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir Funcionários", active: true },
    ];

    this.validacao();
  } 
  get rh_categoria_id() {
    return this.momentForm.get("rh_categoria_id")!;
  }
  get base_area_id() {
    return this.momentForm.get("base_area_id")!;
  }
  get estado() {
    return this.momentForm.get("estado")!;
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
  get username() {
    return this.momentForm.get("username")!;
  }
  get email() {
    return this.momentForm.get("email")!;
  }



  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);
    this.momentForm = new FormGroup({
      //Validacao user
      email: new FormControl("",[Validators.required, Validators.email,noWhitespaceValidator]),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator
      ]),
      //validacao funcionario
      rh_categoria_id: new FormControl("", [Validators.required]),
      base_area_id: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
      //validacao pessoa
      nome: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator
      ]),
      ndi: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        noWhitespaceValidator
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
        noWhitespaceValidator
      ]),

      data_emissao: new FormControl("", [Validators.required]),
      banco: new FormControl("", [
        Validators.maxLength(255),
        noWhitespaceValidator
      ]),
      mae: new FormControl("", [
        Validators.maxLength(255),
        noWhitespaceValidator
      ]),
      pai: new FormControl("", [
        Validators.maxLength(255),
        noWhitespaceValidator
      ]),

      telefone_principal: new FormControl("", [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(255),
        noWhitespaceValidator
      ]),
      telefone_alternativo: new FormControl("", [Validators.maxLength(255),noWhitespaceValidator]),
      outro_contacto: new FormControl("", [Validators.maxLength(255),noWhitespaceValidator]),
    });
    
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

  nextForm(){
    this.modalFormulario.hide();
    this.newDocumentModal.show()
  }
  carregarLista() {
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}&estado=${this.filtro.estado}`;
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
          console.log("Funcionario",res.data)
          this.funcionarios = res.data.data;
          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  carregarPessoa() {
    this.generalService
      .execute(`users`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          console.log(res.data);
          this.base_pessoas = res.data;
        }
      });
  }

  carregarArea() {
    this.generalService
      .execute(`base-areas`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          console.log(res.data);
          this.base_areas = res.data;
        }
      });
  }

  carregarCategoria() {
    this.generalService
      .execute(`rh-categorias`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {
          console.log(res.data);
          this.categorias = res.data;
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

  save() {
    this.markFormAsSubmitted();

    if (this.momentForm.invalid) {
      console.log("Dados inválidos", this.funcionario);
      console.log("ERROS", this.momentForm.errors);
      return;
    }
    console.log("Validos",this.funcionario)
    this.generalService
      .execute(
        "rh-funcionarios",
        GeneralConstants.CRUD_OPERATIONS.INSERT,
        this.funcionario
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.carregarLista();
          this.NotificacaoService.notificationSuccess(res.message);
          this.closeModal();
        } else {
          console.log("sms de erro", res)
          let errorMessages = [];
          if (res.message && res.message.erro && res.message.erro.errors) {
            res.message.erro.errors.forEach((e) => {
              errorMessages.push(e.message);
              console.log("ERRO", errorMessages);
            });
          }
          const errorMessagesString = errorMessages.join(",");
          console.log("Mensagem de erro", errorMessagesString);
          this.NotificacaoService.notificationError(errorMessagesString);
        }
      });
  }

  questionsToremoveItem(data: any, recoverOrRemoveItem: "recover" | "remove") {
    this.funcionario = data;
    this.recoverOrRemoveItem = recoverOrRemoveItem;
    this.removeItemModal?.show();
  }

  removeItem() {
    if (this.recoverOrRemoveItem === "recover") {
      this.funcionario.estado = 1;
    }

    if (this.recoverOrRemoveItem === "remove") {
      this.funcionario.estado = 0;
    }
    this.save();
    console.log("deletar este item", this.funcionario);
    this.removeItemModal?.hide();
  }

  editUser(document: any, edit: boolean) {
    this.momentForm.get("estado").disable();
    this.funcionario = { ...document };
    this.PreencherFormEditara(document);
    this.editar = edit;
    console.log("Funcionar a editar", this.funcionario);
    this.modalFormulario?.show();
    console.log("")
  }

  PreencherFormEditara(data: any){
    this.funcionario.nome = data.pessoa?.nome;
    this.funcionario.ndi = data.pessoa?.ndi;
    this.funcionario.user_pessoa_id = data.pessoa?.user_pessoa_id;
    this.funcionario.genero = data.pessoa?.genero;
    this.funcionario.estado_civil = data.pessoa?.estado_civil;
    this.funcionario.tipo_identificacao = data.pessoa?.tipo_identificacao;
    this.funcionario.data_nascimento = data.pessoa?.data_nascimento.substring(0, 10);;
    this.funcionario.base_municipio_id = data.pessoa?.base_municipio_id;
    this.funcionario.endereco = data.pessoa?.endereco;
    this.funcionario.data_emissao = data.pessoa?.data_emissao.substring(0, 10);;
    this.funcionario.banco = data.pessoa?.banco;
    this.funcionario.mae = data.pessoa?.mae;
    this.funcionario.pai = data.pessoa?.pai;
    this.funcionario.telefone_principal = data.pessoa?.telefone_principal;
    this.funcionario.outro_contacto = data.pessoa?.outro_contacto;
    this.funcionario.telefone_alternativo = data.pessoa?.telefone_alternativo;
    this.funcionario.base_pessoa_id = data.pessoa?.id;
  }

  openModal(_new: boolean) {
    this.momentForm.get("estado").enable();
    this.editar = _new;
    this.resetForm();
    //this.newDocumentModal?.show();
    this.modalFormulario?.show();
  }

  closeModal() {
    this.resetForm();
    this.newDocumentModal?.hide();
  }

  markFormAsSubmitted() {
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      const control = this.momentForm.get(controlName);
      control?.updateValueAndValidity(); // Atualiza o estado do controle
    });
    this.momentForm.updateValueAndValidity(); // Atualiza o estado do formulário
  }

  resetForm() {
    this.funcionario = new Funcionario(); // Reinstancia o modelo
    this.momentForm.reset(); // Reseta os valores do formulário
    // Itera sobre os controles do formulário para limpar mensagens de erro e marcar como não tocado e limpo
    Object.keys(this.momentForm.controls).forEach((controlName) => {
      this.momentForm.controls[controlName].setErrors(null);
    });
  }
}



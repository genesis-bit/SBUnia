import { Component } from '@angular/core';
import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
import { GeneralService } from 'src/app/core/services/general.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PrateleiraAcervo } from '../model/prateleira_acervo';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prateleira',
  templateUrl: './prateleira.component.html',
  styleUrls: ['./prateleira.component.css']
})
export class PrateleiraComponent {
  breadCrumbItems: Array<{}>;

  prateleiras: any;
  acervos: any;
  prateleiraAcervo = new PrateleiraAcervo();
  nomeSelected : any;
  submitted: boolean = false;

  momentForm!: FormGroup;

  modalRef?: BsModalRef;

  constructor(private generalService: GeneralService, private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'home' }, { label: 'Prateleiras', active: true }];
    this.ListaPrateleiras();
    this.ListaAcervo();
    this.validacao();
  }

  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);
    this.momentForm = new FormGroup({    
      acervo_id: new FormControl("", [Validators.required]),
      quantidade: new FormControl("", [Validators.required, Validators.min(1), Validators.max(20)]),
      posicao1: new FormControl("", [Validators.required, Validators.min(0),Validators.max(150), noWhitespaceValidator]),
      posicao2: new FormControl("", [Validators.min(0),Validators.max(150),noWhitespaceValidator]),
    });

  }

  get form() {
    return this.momentForm.controls;
  }

  salvarPrateleiraAcervo(){
    this.submitted = true;
    if (this.momentForm.invalid) {
      return;
    } this.generalService.execute('prateleira-acervos', GeneralConstants.CRUD_OPERATIONS.INSERT, this.prateleiraAcervo).
    subscribe({
      next: (data: any) => {          
        this.ListaPrateleiras();
        this.ListaAcervo();
        this.prateleiraAcervo = new PrateleiraAcervo();
        this.modalService.hide();
        this.mensagem('Acervo Adicionado na prateleira')
      },
      error: (erro) => {  }
    });
  }

  mensagem(sms: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: sms,
      showConfirmButton: false,
      timer: 2000
    });
  }

  ListaPrateleiras() {
    this.generalService.execute('prateleiras', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.prateleiras = data.data;
      });
  }

  ListaAcervo() {
    this.generalService.execute('acervo-out-prateleira', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.acervos = data.data;
      });
  }


  openModal(content: any, nome: string, id: any) {
    this.nomeSelected = nome;
    this.submitted = false;
    this.prateleiraAcervo.prateleira_id = id;
    this.modalRef = this.modalService.show(content, { class: 'modal-lg modal-dialog-centered' });
  }
}



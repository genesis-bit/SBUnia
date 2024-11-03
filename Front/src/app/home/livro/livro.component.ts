
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { fetchJobgridData } from 'src/app/store/Job/job.action';
import { selecDatagrid } from 'src/app/store/Job/job-selector';

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
import Swal from 'sweetalert2';
import { Acervo } from '../model/acervo';
import { PrateleiraAcervo } from '../model/prateleira_acervo';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {
  searchterm: any
  modalRef?: BsModalRef;
  endItem: any
  // bread crumb items
  breadCrumbItems: Array<{}>;
  public isCollapsed: boolean = true;
  submitted: boolean = false;
  // Table data
  content?: any;
  grids: any;
  gridata: any
  page: 1;
  term: any

  momentForm!: FormGroup;
  acervos: any;
  acervo = new Acervo();
  categorias: any;
  tipo_acervos: any;
  prateleiras: any;

  prateleiraAcervo = new PrateleiraAcervo();

  labelAcervo = 'Adicionar Acervo';




  constructor(private modalService: BsModalService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Livros', active: true }];

    this.validacao();
    this.ListaTipoAcervo();
    this.ListaCategoria();
    this.ListaAcervo();
    this.ListaPrateleira()
  }

  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);
    this.momentForm = new FormGroup({
      id: new FormControl(""),
      titulo: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(60), noWhitespaceValidator]),
      ator: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(50), noWhitespaceValidator]),
      editora: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50), noWhitespaceValidator]),
      tipo_acervo_id: new FormControl("", [Validators.required]),
      ano_edicao: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(4), noWhitespaceValidator]),
      categoria_id: new FormControl("", [Validators.required]),
      observacao: new FormControl("", [Validators.minLength(4), Validators.maxLength(200), noWhitespaceValidator]),

      prateleira_id: new FormControl(""),
      quantidade: new FormControl("", [Validators.min(1), Validators.max(20)]),
      posicao1: new FormControl("", [noWhitespaceValidator]),
      posicao2: new FormControl("", [noWhitespaceValidator]),
    });

  }

  get form() {
    return this.momentForm.controls;
  }

  salvarAcervo() {
    this.submitted = true;
    if (this.momentForm.invalid) {
      return;
    }
    this.generalService.execute('acervos', this.acervo.id ? GeneralConstants.CRUD_OPERATIONS.UPDATE : GeneralConstants.CRUD_OPERATIONS.INSERT, this.acervo).
      subscribe({
        next: (data: any) => {
          if ((this.prateleiraAcervo?.prateleira_id != undefined) && (this.prateleiraAcervo?.quantidadeAcervos != undefined) && (this.prateleiraAcervo?.posicao1 != undefined)){
            this.prateleiraAcervo.acervo_id = data.id;
            this.salvarPrateleiraAcervo();
          }
          this.mensagem(this.acervo.id ? 'Acervo Editado com sucesso' : 'Acervo Adicionado com sucesso')
          this.acervo = new Acervo();
          this.ListaAcervo();
          this.modalService.hide();
        },
        error: (erro) => { console.log("erro", erro) }
      });
    this.submitted = false;
  }

  salvarPrateleiraAcervo() {
   console.log("PRAT_ACER", this.prateleiraAcervo)
    this.generalService.execute('prateleira-acervos', this.prateleiraAcervo.id ? GeneralConstants.CRUD_OPERATIONS.UPDATE : GeneralConstants.CRUD_OPERATIONS.INSERT, this.prateleiraAcervo).
      subscribe({
        next: (data: any) => {          
          //this.mensagem(this.acervo.titulo+' Adicionado na prateleira')
        },
        error: (erro) => { console.log("erro", erro) }
      });
    this.submitted = false;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.acervo = new Acervo();
    this.prateleiraAcervo = new PrateleiraAcervo();
    this.labelAcervo = 'Adicionar Acervo';
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-lg' });
  }

  ListaAcervo() {
    this.generalService.execute('acervos', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.acervos = data.data;
        console.log("ACervos", this.acervos)
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

  editarAcervo(data: any, modal: any) {
    this.acervo = data;
    this.modalRef = this.modalService.show(modal, { class: 'modal-lg' });
    this.labelAcervo = 'Editar Acervo';
  }

  DeletarAcervo(acervo: Acervo) {
    Swal.fire({
      title: 'Deletar ' + acervo?.titulo + '?',
      //text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Confirmar!'
    }).then(result => {
      if (result.value) {
        this.generalService.execute('acervos', GeneralConstants.CRUD_OPERATIONS.DELETE, acervo).
          subscribe((data: any) => {
            this.ListaAcervo();
            this.mensagem('Acervos Eliminado com sucesso')
          });
        //Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  ListaCategoria() {
    this.generalService.execute('categorias', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.categorias = data.data;
      });
  }

  ListaPrateleira() {
    this.generalService.execute('prateleiras', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.prateleiras = data.data;
      });
  }

  ListaTipoAcervo() {
    this.generalService.execute('tipo-acervos', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.tipo_acervos = data.data;
      });
  }

  // pagechanged
  pageChanged(event: any) {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.grids = this.gridata.slice(startItem, this.endItem)
  }

  // fiter job
  searchJob() {
    if (this.term) {
      this.grids = this.gridata.filter((data: any) => {
        return data.title.toLowerCase().includes(this.term.toLowerCase())
      })
    } else {
      this.grids = this.gridata
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;
    if (this.term && this.grids.length === 0) {
      paginationElement.style.display = 'none';
    } else {
      paginationElement.style.display = 'block';
    }
  }
  // location
  Location() {
    if (this.term) {
      this.grids = this.gridata.filter((el: any) => {
        return el.location.toLowerCase().includes(this.term.toLowerCase())
      });
    } else {
      this.grids = this.gridata
    }
  }
}


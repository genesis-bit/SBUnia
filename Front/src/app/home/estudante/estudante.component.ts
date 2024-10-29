import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Store } from '@ngrx/store';
import { fetchprojectData } from 'src/app/store/ProjectsData/project.actions';
import { selectData } from 'src/app/store/ProjectsData/project-selector';

import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';

import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Estudante } from '../model/estudante';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent implements OnInit {
  totalItems = 12
  // bread crumb items
  breadCrumbItems: Array<{}>;
  total$: any
  page: any = 1;
  endItem: any = 12;
  returnedArray: any;
  projectlist: any

  modalRef?: BsModalRef;

  submitted = false;

  cursos: any;
  universidades: any;
  generos: any;
  estudantes: any;

  estudante = new Estudante();

  labelEstudante = 'Adicionar Estudante';

  momentForm!: FormGroup;

  constructor(public store: Store, private modalService: BsModalService, private generalService: GeneralService) { }


  openModal(content: any) {
    this.submitted = false;
    this.labelEstudante = 'Adicionar Estudante';
    this.estudante = new Estudante();
    this.modalRef = this.modalService.show(content, { class: 'modal-lg modal-dialog-centered' });
  }

  openModalEditar(data: any, content: any) {
    this.submitted = false;
    this.momentForm.get('email').disable();
    this.labelEstudante = 'Editar Estudante';
    this.estudante = data;
    this.modalRef = this.modalService.show(content, { class: 'modal-lg modal-dialog-centered' });
  }


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Estudantes', active: true }];

    this.store.dispatch(fetchprojectData());
    this.store.select(selectData).subscribe(data => {
      this.projectlist = data
      this.returnedArray = data
      this.projectlist = this.returnedArray.slice(0, 6);
    });

    this.validacao();
    this.ListaCurso();
    this.ListaUniversidade();
    this.ListaEstudante();
    this.ListaGenero();
  }

  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);
    this.momentForm = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(50), noWhitespaceValidator]),
      email: new FormControl("", [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(50), noWhitespaceValidator]),
      telefone: new FormControl("", [Validators.minLength(9), Validators.maxLength(20), noWhitespaceValidator]),
      bilhete: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20), noWhitespaceValidator]),
      curso: new FormControl("", [Validators.required]),
      genero: new FormControl("", [Validators.required]),
      instituicao: new FormControl("", [Validators.required])
    });
  }

  get form() {
    return this.momentForm.controls;
  }

  salvarEstudante() {
    this.submitted = true;
    if (this.momentForm.invalid) {
      return;
    }
    this.estudante.tipo_cliente_id = 1;
    //this.estudante.ndi = this.estudante.bilhete;
    this.generalService.execute('clientes', this.estudante.id ? GeneralConstants.CRUD_OPERATIONS.UPDATE : GeneralConstants.CRUD_OPERATIONS.INSERT, this.estudante).
      subscribe({
        next: (data: any) => {
          console.log("resposta", data)
          this.mensagem(this.estudante.id ? 'Estudante Editado com sucesso' : 'Estudante Adicionado com sucesso')
          this.labelEstudante = 'Adicionar Estudante';
          this.estudante = new Estudante();
          this.modalService.hide();
          this.ListaEstudante();
        },
        error: (erro) => { console.log("erro", erro)}
      });
    this.submitted = false;
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

  ListaEstudante() {
    this.generalService.execute('clientes', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.estudantes = data.data;
      });
  }

  ListaCurso() {
    this.generalService.execute('cursos', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.cursos = data.data;
      });
  }
  ListaGenero() {
    this.generalService.execute('generos', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.generos = data.data;
      });
  }
  ListaUniversidade() {
    this.generalService.execute('universidades', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.universidades = data.data;
      });
  }

  DeletarEstudante(estudante: Estudante) {
    Swal.fire({
      title: 'Deletar ' + estudante.nome + '?',
      //text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Confirmar!'
    }).then(result => {
      if (result.value) {
        this.generalService.execute('clientes', GeneralConstants.CRUD_OPERATIONS.DELETE, estudante).
          subscribe((data: any) => {
            this.ListaEstudante();
            this.mensagem('Estudante Eliminado com sucesso')
          });
        //Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.projectlist = this.returnedArray.slice(startItem, this.endItem);
  }
}

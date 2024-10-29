import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Store } from '@ngrx/store';
import { fetchprojectData } from 'src/app/store/ProjectsData/project.actions';
import { selectData } from 'src/app/store/ProjectsData/project-selector';

import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';

import { FormControl, FormGroup, Validators } from "@angular/forms";

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

  submitted= false;

  cursos: any;
  universidades: any;

  momentForm!: FormGroup;

  constructor(public store: Store, private modalService: BsModalService, private generalService: GeneralService) { }


  openModal(content: any) {
    //this.submitted = false;
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
    this.ListaUniveridade();
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

  salvarEstudante(){
    this.submitted = true;
  }

  ListaCurso() {
    this.generalService.execute('cursos', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.cursos = data.data;
      });
  }
  ListaUniveridade() {
    this.generalService.execute('universidades', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.universidades = data.data;
      });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.projectlist = this.returnedArray.slice(startItem, this.endItem);
  }
}

import { Component } from '@angular/core';
import { vacancyData } from './data';

import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';

import { FormControl, FormGroup, Validators } from "@angular/forms";

import Swal from 'sweetalert2';

import { Universidade } from '../model/universidade';
import { Curso } from '../model/curso';
import { Categoria } from '../model/categoria';
import { Prateleira } from '../model/prateleira';

@Component({
  selector: 'app-ferramentas',
  templateUrl: './ferramentas.component.html',
  styleUrls: ['./ferramentas.component.css']
})
export class FerramentasComponent {

  vacancyData: any;
  universidade = new Universidade();
  curso = new Curso();
  categoria = new Categoria();
  prateleira = new Prateleira();

  cursos: any;
  universidades: any;
  categorias: any;
  prateleiras: any;
  momentForm!: FormGroup;
  display:string='universidade';

  private _fetchData() {
    this.vacancyData = vacancyData;
  }

  submitted = false;
  labelUniversidade = 'Adicionar Universidade';
  labelCurso = 'Adicionar Curso';
  labelCategoria = 'Adicionar Curso';
  labelPrateleira = 'Adicionar Prateleira';

  propriedadeTabela={
    inicio: 0,
    fim: 0,
    total: 0,
    pagina:0
  }

  alterDisplay(dados: string){
    this.display = dados;
    dados != 'Universidades'?this.momentForm.get('sigla').disable(): this.momentForm.get("sigla").enable();
    dados != 'Prateleiras'?this.momentForm.get('observacao').disable(): this.momentForm.get("observacao").enable();
    this.submitted = false;
    // switch (dados) {
    //   case 'Universidades': this.ListaUniversidade();  break;      
    //   case 'Cursos da Instituição': this.ListaCurso(); break;
    //   case 'Categorias de Livro': this.ListaCategoria(); break;
    //   case 'Prateleiras': this.ListaPrateleira(); break;
    //   default: console.log("invalido"); break;
    // }    
  }

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this._fetchData();
    this.validacao();
    this.ListaCategoria();
    this.ListaCurso();
    this.ListaPrateleira();
    this.ListaUniversidade();
  }

  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);
    this.momentForm = new FormGroup({
      id: new FormControl(""),
      descricao: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50), noWhitespaceValidator]),
      sigla: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30), noWhitespaceValidator]),
      observacao: new FormControl("", [Validators.minLength(2), Validators.maxLength(200), noWhitespaceValidator])
    });
  }

  get formUni() {
    return this.momentForm.controls;
  }


  salvarUniversidade() {
    this.submitted = true;
    if (this.momentForm.invalid) {
      return;
    }
    this.generalService.execute('universidades', this.universidade.id ? GeneralConstants.CRUD_OPERATIONS.UPDATE : GeneralConstants.CRUD_OPERATIONS.INSERT, this.universidade).
      subscribe((data: any) => {
        this.mensagem(this.universidade.id ? 'Universidade Editado com sucesso' : 'Universidade Adicionado com sucesso')
        this.universidade = new Universidade();
        this.labelUniversidade = 'Adicionar Universidade';
        this.ListaUniversidade();
      });
    this.submitted = false;
  }

  ListaUniversidade() {
    this.generalService.execute('universidades', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        console.log(data)
        this.universidades = data.data;
        this.propriedadeTabela.fim = data.to;
        this.propriedadeTabela.inicio = data.from;
        this.propriedadeTabela.total = data.total;
        this.propriedadeTabela.pagina = data.last_page;
      });
  }
  DeletarUniversidade(universidade: Universidade) {
    Swal.fire({
      title: 'Deletar ' + universidade.descricao + '?',
      //text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Confirmar!'
    }).then(result => {
      if (result.value) {
        this.generalService.execute('universidades', GeneralConstants.CRUD_OPERATIONS.DELETE, universidade).
          subscribe((data: any) => {
            this.ListaUniversidade();
            this.mensagem('Universidade Eliminado com sucesso')
          });
        //Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  mensagem(sms: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: sms,
      showConfirmButton: false,
      timer: 1500
    });
  }
  tables$: any;

  EditarUniversidade(data: Universidade) {
    this.universidade = { ...data };
    this.labelUniversidade = 'Editar Universidade';
  }

  LimparUniversidade() {
    this.universidade = new Universidade();
    this.labelUniversidade = 'Adicionar Universidade';
    this.submitted = false;
  }

  salvarCurso() {
    this.submitted = true;
    if (this.momentForm.invalid) {
      return;
    }
    this.generalService.execute('cursos', this.curso.id ? GeneralConstants.CRUD_OPERATIONS.UPDATE : GeneralConstants.CRUD_OPERATIONS.INSERT, this.curso).
      subscribe((data: any) => {
        this.mensagem(this.curso.id ? 'Curso Editado com sucesso' : 'Curso Adicionado com sucesso')
        this.labelCurso = 'Adicionar Curso';
        this.curso = new Curso();
        this.ListaCurso();
      });
    this.submitted = false;
  }
  ListaCurso() {
    this.generalService.execute('cursos', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.cursos = data.data;
        this.propriedadeTabela.fim = data.to;
        this.propriedadeTabela.inicio = data.from;
        this.propriedadeTabela.total = data.total;
        this.propriedadeTabela.pagina = data.last_page;
      });
  }
  DeletarCurso(curso: Curso) {
    Swal.fire({
      title: 'Deletar ' + curso.descricao + '?',
      //text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Confirmar!'
    }).then(result => {
      if (result.value) {
        this.generalService.execute('cursos', GeneralConstants.CRUD_OPERATIONS.DELETE, curso).
          subscribe((data: any) => {
            this.ListaCurso();
            this.mensagem('curso Eliminado com sucesso')
          });
        //Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }  
  EditarCurso(data: Curso) {
    this.curso = { ...data };
    this.labelCurso = 'Editar Curso';
  }
  LimparCurso() {
    this.curso = new Curso();
    this.labelCurso = 'Adicionar Curso';
    this.submitted = false;
  }

  salvarCategoria() {
    this.submitted = true;
    if (this.momentForm.invalid) {
      return;
    }
    this.generalService.execute('categorias', this.categoria.id ? GeneralConstants.CRUD_OPERATIONS.UPDATE : GeneralConstants.CRUD_OPERATIONS.INSERT, this.categoria).
      subscribe((data: any) => {
        this.mensagem(this.categoria.id ? 'Categoria Editado com sucesso' : 'Categoria Adicionado com sucesso')
        this.labelCategoria = 'Adicionar Categoria';
        this.categoria = new Categoria();
        this.ListaCategoria();
      });
    this.submitted = false;
  }
  ListaCategoria() {
    this.generalService.execute('categorias', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.categorias = data.data;
        this.propriedadeTabela.fim = data.to;
        this.propriedadeTabela.inicio = data.from;
        this.propriedadeTabela.total = data.total;
        this.propriedadeTabela.pagina = data.last_page;
      });
  }
  DeletarCategoria(categoria: Categoria) {
    Swal.fire({
      title: 'Deletar ' + categoria.descricao + '?',
      //text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Confirmar!'
    }).then(result => {
      if (result.value) {
        this.generalService.execute('categorias', GeneralConstants.CRUD_OPERATIONS.DELETE, categoria).
          subscribe((data: any) => {
            this.ListaCategoria();
            this.mensagem('Categoria Eliminado com sucesso')
          });
        //Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }  
  EditarCategoria(data: Categoria) {
    this.categoria = { ...data };
    this.labelCategoria = 'Editar Categoria';
  }
  LimparCategoria() {
    this.categoria = new Categoria();
    this.labelCategoria = 'Adicionar Categoria';
    this.submitted = false;
  }
  salvarPrateleira() {
    this.submitted = true;
    if (this.momentForm.invalid) {
      return;
    }
    this.generalService.execute('prateleiras', this.prateleira.id ? GeneralConstants.CRUD_OPERATIONS.UPDATE : GeneralConstants.CRUD_OPERATIONS.INSERT, this.prateleira).
      subscribe((data: any) => {
        this.mensagem(this.prateleira.id ? 'Prateleira Editado com sucesso' : 'Prateleira Adicionado com sucesso')
        this.labelPrateleira = 'Adicionar Prateleira';
        this.prateleira = new Prateleira();
        this.ListaPrateleira();
      });
    this.submitted = false;
  }
  ListaPrateleira() {
    this.generalService.execute('prateleiras', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.prateleiras = data.data;
        this.propriedadeTabela.fim = data.to;
        this.propriedadeTabela.inicio = data.from;
        this.propriedadeTabela.total = data.total;
        this.propriedadeTabela.pagina = data.last_page;
      });
  }
  DeletarPrateleira(prateleira: Prateleira) {
    Swal.fire({
      title: 'Deletar ' + prateleira.descricao + '?',
      //text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Confirmar!'
    }).then(result => {
      if (result.value) {
        this.generalService.execute('prateleiras', GeneralConstants.CRUD_OPERATIONS.DELETE, prateleira).
          subscribe((data: any) => {
            this.ListaPrateleira();
            this.mensagem('Prateleira Eliminado com sucesso')
          });
        //Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }  
  EditarPrateleira(data: Prateleira) {
    this.prateleira = { ...data };
    this.labelPrateleira = 'Editar Prateleira';
  }
  LimparPrateleira() {
    this.prateleira = new Prateleira();
    this.labelPrateleira = 'Adicionar Prateleira';
    this.submitted = false;
  }

}

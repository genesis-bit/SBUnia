import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';

import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Emprestimo } from '../model/emprestimo';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { addJoblist, fetchJoblistData, updateJoblist } from 'src/app/store/Job/job.action';
import { selectData } from 'src/app/store/Job/job-selector';
import { Acervo } from '../model/acervo';
import { Devolucao } from '../model/devolucao';
import { dataTool } from 'echarts';
@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.css']
})
export class EmprestimoComponent implements OnInit {

  searchTerm: any;
  modalRef?: BsModalRef;
  page: any = 1;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  submitted: boolean = false;
  endItem: any;
  term: any
  // Table data
  content?: any;
  lists?: any;
  total: Observable<number>;
  currentPage: any;
  joblist: any;
  searchResults: any;

  momentForm!: FormGroup;

  emprestimo = new Emprestimo();
  devolucao = new Devolucao();
  bilhete?: string;// guarda o valor do bilhete selecionado
  acervoSelected = { categoria: '', autor: '', ano: '', editora: '' };
  emprestimos: any;
  clientes: any;
  acervos: any;
  hoje = new Date().toISOString().substring(0, 10);

  validacao() {
    this.momentForm = new FormGroup({
      id: new FormControl(""),
      dataPrevistaEntrega: new FormControl("", [Validators.required]),
      cliente_id: new FormControl("", [Validators.required]),
      acervo_id: new FormControl("", [Validators.required]),
      bilhete: new FormControl("", [Validators.required])
    });
  }

  get form() {
    return this.momentForm.controls;
  }

  salvarEmprestimo() {
    this.submitted = true;
    if (this.momentForm.invalid) {
      return;
    }
    this.generalService.execute('emprestimos', this.emprestimo.id ? GeneralConstants.CRUD_OPERATIONS.UPDATE : GeneralConstants.CRUD_OPERATIONS.INSERT, this.emprestimo).
      subscribe({
        next: (data: any) => {
          console.log("resposta", data)
          this.mensagem(this.emprestimo.id ? 'Solicitação Editado com sucesso' : 'Solicitação Adicionado com sucesso')

          this.emprestimo = new Emprestimo();
          this.modalService.hide();
          this.ListaEmprestimo();
        },
        error: (erro) => { console.log("erro", erro) }
      });
    this.submitted = false;
  }

  constructor(private modalService: BsModalService, public store: Store, private generalService: GeneralService) {
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Jobs' }, { label: 'Jobs List', active: true }];

    // store data
    this.store.dispatch(fetchJoblistData());
    this.store.select(selectData).subscribe(data => {
      this.lists = data
      this.joblist = data;
      this.lists = this.joblist.slice(0, 8)
    });

    this.validacao();
    this.ListaAcervo();
    this.ListaEmprestimo();
    this.ListaCliente();
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

  /**
  * Open modal
  * @param content modal content
  */
  openViewModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  UpdateBilhete() {
    let bilhete = this.clientes.filter((data) => data.id == this.emprestimo.cliente_id)[0].bilhete;
    this.bilhete = bilhete;
  }

  ListaEmprestimo() {
    this.generalService.execute('emprestimos', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.emprestimos = data.data;
        console.log("emprestimos", data)
      });
  }

  ListaCliente() {
    this.generalService.execute('clientes', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.clientes = data.data;
      });
  }

  ListaAcervo() {
    this.generalService.execute('prateleira-acervos', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.acervos = data.data;
        console.log(this.acervos)
      });
  }


  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.lists.forEach((x: { state: any; }) => x.state = ev.target.checked)
  }

  // Delete Data
  Adddevolucao(data: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Devolução ' + data?.acervo?.titulo,
        input: 'textarea',
        inputPlaceholder: 'Observação...',
        //text: 'You won\'t be able to revert this!',
        //icon: 'warning',
        confirmButtonText: 'Confirmar Devolução!',
        cancelButtonText: 'Cancelar!',
        showCancelButton: true
      })
      .then(result => {
        if (result.isConfirmed) {
          this.devolucao.id = data.id;
          this.devolucao.observacao = result.value;
          this.generalService.execute("devolucoes", GeneralConstants.CRUD_OPERATIONS.INSERT, this.devolucao)
            .subscribe((res) => {
              this.ListaEmprestimo();
            });
        }
      });
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.acervoSelected.categoria = '';
    this.bilhete = '';
    this.submitted = false;
    this.emprestimo = new Emprestimo();
    this.emprestimo.dataPrevistaEntrega = this.hoje;
    console.log(this.emprestimo.dataPrevistaEntrega)
    this.modalRef = this.modalService.show(content, { class: 'modal-lg modal-dialog-centered' });
  }

  showDetalhes() {
    let data = this.acervos.filter((data) => data.acervo_id == this.emprestimo.acervo_id)[0];
    this.acervoSelected.ano = data?.acervo?.ano_edicao;
    this.acervoSelected.autor = data?.acervo?.ator;
    this.acervoSelected.categoria = data?.categoria?.descricao;
    this.acervoSelected.editora = data?.acervo?.editora;
  }


  /**
  * Save user
  */
  saveUser() {

  }

  /**}
   * Open Edit modal
   * @param content modal content
   */
  editDataGet(id: any, content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Order';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.joblist.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.status.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.type.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.date.toLowerCase().includes(this.searchTerm.toLowerCase())

    })
    this.lists = this.searchResults.slice(0, 8)
  }
  // pagination
  pageChanged(event: any) {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.lists = this.joblist.slice(startItem, this.endItem)
  }

  // fiter job
  searchJob() {
    if (this.term) {
      this.lists = this.joblist.filter((data: any) => {
        return data.title.toLowerCase().includes(this.term.toLowerCase())
      })
    } else {
      this.lists = this.joblist
    }

  }

  selectstatus() {
    var status = (document.getElementById('idStatus') as HTMLInputElement).value;
    if (status) {
      this.lists = this.joblist.filter((es: any) => {
        return es.status === status
      })
    } else {
      this.lists = this.joblist
    }

  }

  selectType() {
    var type = (document.getElementById('idType') as HTMLInputElement).value;
    if (type) {
      this.lists = this.joblist.filter((es: any) => {
        return es.type === type
      })
    } else {
      this.lists = this.joblist
    }
  }
}


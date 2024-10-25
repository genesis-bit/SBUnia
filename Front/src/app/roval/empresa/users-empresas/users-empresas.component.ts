 

  import { Component, ViewChild, OnInit, ElementRef, TemplateRef } from '@angular/core';

  import { GeneralService } from 'src/app/core/services/general.service';
  import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
  
  import { Licenca } from 'src/app/roval/licenca/model/licenca';
  
  import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { UntypedFormGroup } from '@angular/forms';
  
  @Component({
    selector: 'app-users-empresas',
    templateUrl: './users-empresas.component.html',
    styleUrls: ['./users-empresas.component.css']
  })
  export class UsersEmpresasComponent {
  
    // bread crumb items
    breadCrumbItems: Array<{}>;
    @ViewChild('search') search: ElementRef;
  

    @ViewChild('newContactModal', { static: false }) newContactModal?: ModalDirective; 
    @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
    deleteId: any;
    modalRef?: BsModalRef;
    config: any = {
      backdrop: true,
      ignoreBackdropClick: true
    };
    name: any;
  
    licenca = new Licenca();
  
    createContactForm!: UntypedFormGroup;
    submitted = false;
    contacts: any;
    files: File[] = [];
    endItem: any
  
  
    data_users: any
  
  
    constructor(private modalService: BsModalService, private generalService: GeneralService) { }
  
  
    tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];
  
    clientes: any
    estados = [
      { id: "", 'nome': 'Todos' },
      { id: "1", 'nome': 'Activos' },
      { id: "0", 'nome': 'Inactivos' },  
  
    ]
  
    filtro = {
      name_code: '',
      
      estado: '1',
      page: 1,
      pagesize: 5,
      total_itens: 0,
      selectValue: "",
      cliente: "",
      nome_code: ""
    };
    ngOnInit() {
      this.carregarLista();
      this.breadCrumbItems = [{ label: 'Roval' }, { label: 'Gerir Utilizadores', active: true }];
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
  
  
    carregarLista() {
  
      console.log(this.filtro)
      let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&name_code=${this.filtro.name_code}&estado=${this.filtro.estado}`;
      this.generalService.execute(`users`, GeneralConstants.CRUD_OPERATIONS.READ, '', '', params)
        .subscribe((res: any) => {
          if (res.data) {
  
            console.log(res.data)
            this.data_users = res.data.data
            this.filtro.total_itens = res.data.meta.total
          }
        });
    }
  
  
  
    salvar() {
      if (this.licenca?.id)
        this.actualizar()
      else
        this.salvarNovo()
    }
    salvarNovo() {
      this.generalService
        .execute('licencas', GeneralConstants.CRUD_OPERATIONS.INSERT, this.licenca).subscribe((res: any) => {
          console.log(res);
          if (res.data) {
            this.modalRef?.hide()
            this.carregarLista()
          }
        });
    }
    actualizar() {
      this.generalService.execute('licencas', GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE, this.licenca).subscribe((res: any) => {
        if (res.data) {
          this.modalRef?.hide()
          this.carregarLista()
        }
      });
    }
  
    // Save User
    saveUser() {

    }
  
    openModal(content: any) {
      this.modalRef = this.modalService.show(content);
    }
  
  
  
    /**
   * Open modal
   * @param content modal content
   */
    varyingModal(template: TemplateRef<any>, name: any) {
  
      this.licenca = new Licenca()
      this.name = name
      this.modalRef = this.modalService.show(template, this.config);
    }

        // Delete User
        removeUser(id: any) {
          this.deleteId = id
          this.removeItemModal?.show();
        }
      
        confirmDelete(id: any) {
        //  this.store.dispatch(deleteuserlist({ id: this.deleteId }));
          this.removeItemModal?.hide();
        }
      
      // File Upload
      imageURL: string | undefined;
      fileChange(event: any) {
        let fileList: any = (event.target as HTMLInputElement);
        let file: File = fileList.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.imageURL = reader.result as string;
          document.querySelectorAll('#member-img').forEach((element: any) => {
            element.src = this.imageURL;
          });
          this.createContactForm.controls['profile'].setValue(this.imageURL);
        }
        reader.readAsDataURL(file)
      }

      
    // Edit User
    editUser(id: any) {
      this.submitted = false;
      this.newContactModal?.show()
      var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
      modelTitle.innerHTML = 'Edit Profile';
      var updateBtn = document.getElementById('addContact-btn') as HTMLAreaElement;
      updateBtn.innerHTML = "Update";
    //  this.createContactForm.patchValue(this.contactsList[id]);
    }
    

  }
  
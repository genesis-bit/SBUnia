import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Bibliotecario } from '../model/bibliotecario';
import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bibliotecario',
  templateUrl: './bibliotecario.component.html',
  styleUrls: ['./bibliotecario.component.css']
})
export class BibliotecarioComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  modalRef?: BsModalRef;

  momentForm!: FormGroup;
  bibliotecario = new Bibliotecario();
  bibliotecarios: any;
  generos: any;
  url = '';

  labelBibliotecario='Adicionar Bibliotecário';

  submitted = false;

  constructor(private modalService: BsModalService, private generalService: GeneralService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Bibliotecarios', active: true }];
    this.validacao();
    this.ListaGenero();
    this.ListaBibliotecario();
    this.getRotaBase();
  }

  //Rota para buscar url das fotos
  getRotaBase(){ 
    this.generalService.execute('url_base', GeneralConstants.CRUD_OPERATIONS.READ)
    .subscribe((rota)=>{ this.url = rota.url;});
  }

  validacao() {
    const noWhitespaceValidator = Validators.pattern(/^(?!\s*$).+/);
    this.momentForm = new FormGroup({
      id: new FormControl(""),
      nome: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(50), noWhitespaceValidator]),
      email: new FormControl("", [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(50), noWhitespaceValidator]),
      telefone: new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(20), noWhitespaceValidator]),
      bilhete: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20), noWhitespaceValidator]),
      ndi: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20), noWhitespaceValidator]),
      genero: new FormControl("", [Validators.required]),
    });
  }

  ListaBibliotecario() {
    this.generalService.execute('bibliotecarios', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.bibliotecarios = data.data;
        console.log("lista bibliotecario", this.bibliotecarios)
      });
  }

  get form() {
    return this.momentForm.controls;
  }

  salvarBibliotecario() {
    this.submitted = true;
    if (this.momentForm.invalid) {
      return;
    }
    let SendDate: any = this.bibliotecario;
    if(this.foto != null){
        SendDate = this.PreencherFormData();
    }
    this.generalService.execute('bibliotecarios', this.bibliotecario.id ? GeneralConstants.CRUD_OPERATIONS.UPDATE : GeneralConstants.CRUD_OPERATIONS.INSERT, SendDate).
      subscribe({
        next: (data: any) => {
          this.mensagem(this.bibliotecario.id ? 'Bibliotecario Editado com sucesso' : 'Bibliotecário Adicionado com sucesso')
          this.bibliotecario = new Bibliotecario();
          this.ListaBibliotecario();
          this.foto = null;
          this.modalService.hide();
        },
        error: (erro) => { console.log("erro", erro) }
      });
    this.submitted = false;
  }

  PreencherFormData(){
    const formData = new FormData();
    formData.append('foto', this.foto);    
    formData.append('id', this.bibliotecario.id+'');
    formData.append('email', this.bibliotecario.email);
    formData.append('nome', this.bibliotecario.nome);
    formData.append('bilhete', this.bibliotecario.bilhete);
    formData.append('ndi', this.bibliotecario.ndi);
    formData.append('telefone', this.bibliotecario.telefone);
    formData.append('genero_id', this.bibliotecario.genero_id+'');
    return formData;
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

  ListaGenero() {
    this.generalService.execute('generos', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.generos = data.data;
      });
  }

  openModal(content) {
    this.foto = null;
    this.momentForm.get('email').enable();
    this.labelBibliotecario='Adicionar Bibliotecário';
    this.bibliotecario = new Bibliotecario();
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-lg modal-dialog-centered' });
  }

  editarModal(data, content){
    this.labelBibliotecario='Editar Bibliotecário';
    this.momentForm.get('email').disable();
    this.bibliotecario = data;
    this.modalRef = this.modalService.show(content, { class: 'modal-lg modal-dialog-centered' });
  }

  // File Upload
  foto: File | null = null;
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    this.foto = fileList.files[0];
    //Mostrando a imagem no front
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll("#member-img").forEach((element: any) => {
        element.src = this.imageURL;
      });
    };
    reader.readAsDataURL(this.foto);



  }
}

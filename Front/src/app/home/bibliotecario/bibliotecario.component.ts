  import { Component, OnInit } from '@angular/core';
  import { fetchInvoiceListData } from 'src/app/store/Invoices/invoice.action';
  import { Store } from '@ngrx/store';
  import { selectData } from 'src/app/store/Invoices/invoice-selector';
  import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
  import { FormControl, FormGroup, Validators } from "@angular/forms";
  import { Bibliotecario } from '../model/bibliotecario';
  import { GeneralService } from 'src/app/core/services/general.service';
  import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
@Component({
  selector: 'app-bibliotecario',
  templateUrl: './bibliotecario.component.html',
  styleUrls: ['./bibliotecario.component.css']
})
export class BibliotecarioComponent implements OnInit {
  
    // bread crumb items
    breadCrumbItems: Array<{}>;
  
    invoicelists: any
    modalRef?: BsModalRef;

    momentForm!: FormGroup;
    bibliotecario = new Bibliotecario();
    generos: any;

    submitted = false;
  
    constructor(public store: Store, private modalService: BsModalService, private generalService: GeneralService) { }
  
    ngOnInit() {
      this.breadCrumbItems = [{ label: 'Home' }, { label: 'Bibliotecarios', active: true }];
  
      this.store.dispatch(fetchInvoiceListData());
      this.store.select(selectData).subscribe(data => {
        this.invoicelists = data;
      })

      this.validacao();
      this.ListaGenero();
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
  
    get form() {
      return this.momentForm.controls;
    }

    salvarBibliotecario(){
      this.submitted = true;
      if (this.momentForm.invalid) {
        return;
      }
      this.submitted = false;
    }

    ListaGenero() {
      this.generalService.execute('generos', GeneralConstants.CRUD_OPERATIONS.READ).
        subscribe((data: any) => {
          this.generos = data.data;
        });
    }

    openModal(content){
      this.bibliotecario = new Bibliotecario();
      this.submitted = false;
      this.modalRef = this.modalService.show(content, { class: 'modal-lg modal-dialog-centered' });
    }

      // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll("#member-img").forEach((element: any) => {
        element.src = this.imageURL;
      });
      //this.createContactForm.controls["profile"].setValue(this.imageURL);
    };
    reader.readAsDataURL(file);
  }
  }
  
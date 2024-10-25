import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";

import { Router } from "@angular/router";

import { GeneralService } from "src/app/core/services/general.service";
import { GeneralConstants } from "src/app/core/constants/GeneralConstants";

import { NotificationService } from "src/app/core/services/notification.service";

import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from "ngx-bootstrap/modal";
import { UntypedFormGroup } from "@angular/forms";
import { Task } from "../model/task";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  breadCrumbItems: Array<{}>;
  @ViewChild("search") search: ElementRef;

  @ViewChild("newContactModal", { static: false }) newModal?: ModalDirective;

  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  name: any;

  createContactForm!: UntypedFormGroup;

  tasks: any;
  task = new Task();

  time_unit = [
    {
      id: 1,
      nome: "Hora(s)",
    },
    {
      id: 2,
      nome: "Dia(s)",
    },
    {
      id: 3,
      nome: "Mes(s)",
    },
    {
      id: 4,
      nome: "ano(s)",
    },
  ];

  employee = [
    {
      id: 1,
      nome: "Elves João",
    },
    {
      id: 2,
      nome: "Josué Cabral",
    },
    {
      id: 3,
      nome: "Adão Proserpino",
    },
  ];

  constructor(
    private modalService: BsModalService,
    private generalService: GeneralService,
    private NotificacaoService: NotificationService,
    private router: Router
  ) {}

  tableSizes = [5, 10, 20, 50, 100, 200, 500, 1000];

  filtro = {
    name_code: "",
    estado: "1",
    page: 1,
    pagesize: 5,
    total_itens: 0,
    selectValue: "",
    cliente: "",
    nome_code: "",
  };
  ngOnInit() {
    this.carregarLista();
    this.breadCrumbItems = [
      { label: "Roval" },
      { label: "Gerir tarefas", active: true },
    ];
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
    console.log("PASSOU AQUI")
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}`;
    this.generalService
      .execute(`task`, GeneralConstants.CRUD_OPERATIONS.READ, "", "", params)
      .subscribe((res: any) => {
        console.log("RESULTADO:", res);
        if (res.data) {
          this.tasks = res.data.data;
          console.log("tarefas", this.tasks);
          // this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  
}


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
import { Project } from "../model/project";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
})
export class ProjectsComponent {
  breadCrumbItems: Array<{}>;

  @ViewChild("newContactModal", { static: false })
  newContactModal?: ModalDirective;

  @ViewChild("search") search: ElementRef;

  @ViewChild("newContactModal", { static: false }) newModal?: ModalDirective;

  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  name: any;

  createContactForm!: UntypedFormGroup;

  projects: any;
  project = new Project();

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
      { label: "Gerir projectos", active: true },
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
    console.log("PASSOU AQUI");
    let params = `page=${this.filtro.page}&pageSize=${this.filtro.pagesize}&search=${this.filtro.name_code}`;
    this.generalService
      .execute(`project`, GeneralConstants.CRUD_OPERATIONS.READ, "", "", params)
      .subscribe((res: any) => {
        console.log("RESULTADO:", res);
        if (res.data) {
          this.projects = res.data.data;
          // const statusMap = {
          //   started: "Iniciado",
          //   pending: "Pendente",
          //   in_progress: "Em progresso",
          //   completed: "Finalizado",
          // };

          // const statusTimeUnit = {
          //   day: "dia(s)",
          //   month: "mês(s)",
          //   week: "semana(s)",
          //   year: "ano(s)",
          //   hour: "hora(s)",
          // };

          // if (this.projects) {
          //   this.projects.forEach((element: any) => {
          //     element.status = statusMap[element.status] || element.status;
          //   });

          //   this.projects.forEach((element: any) => {
          //     element.time_unit =
          //       statusTimeUnit[element.time_unit] || element.time_unit;
          //   });
          // }

          this.filtro.total_itens = res.data.meta.total;
        }
      });
  }

  save() {
    this.project.status = "started";
    console.log("DADOS A SEEREM CADASTRADOS", this.project);
    this.generalService
      .execute("project", GeneralConstants.CRUD_OPERATIONS.INSERT, this.project)
      .subscribe((res: any) => {
        console.log("Dados cadastrado com sucesso");

        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.project = new Project();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  update() {
    console.log(this.project);
    this.generalService
      .execute(
        `project/${this.project.id}`,
        GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE,
        this.project
      )
      .subscribe((res: any) => {
        console.log(res);
        if (res.data) {
          this.NotificacaoService.notificationSuccess(res.message);
          this.carregarLista();
          this.project = new Project();
        } else {
          this.NotificacaoService.notificationError(res.message);
        }
      });
  }

  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  } // Delete User
  removeUser(id: any) {
    // this.deleteId = id
    // this.removeItemModal?.show();
  }

  editUser(project: any) {
    this.project = project;
    this.newContactModal?.show();
  }

  searchDocumentByCode(code: string) {
    this.generalService
      .execute(
        `buscar-documento-por-codigo/${code}`,
        GeneralConstants.CRUD_OPERATIONS.GET,
        "",
        ""
      )
      .subscribe((res: any) => {
        if (res.data) {
          this.router.navigate(["gd/tramitar-documento/", code]);
          //chamar um componente e levar o codigo
        } else {
          console.log("Documento não existe");
        }
      });
  }
}

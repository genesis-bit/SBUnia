import { MenuItem } from "./menu.model";

export const MENU_INEMA: MenuItem[] = [
  {
    id: 11,
    label: "HOME",
    icon: "bx-home-circle",
    link: "/",
  },

  {
    id: 1,
    label: "Gestão Administrativa",
    isTitle: true,
  },



  {
    id: 2,
    label: "Ocorrencias ",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Pre-Registo",
        link: "/ocorrencia/pre-registo-ocorrencias",
        parentId: 2,
      },

      {
        id: 3,
        label: "Ocorrencias",
        link: "/ocorrencia/ocorrencias",
        parentId: 2,
      },

      {
        id: 3,
        label: "Relatorios Geral",
        link: "/ocorrencia/relatorio-ocorrencia",
        parentId: 2,
      },

      {
        id: 3,
        label: "Configuração",
        link: "/ocorrencia/ocorrencia-configuracao",
        parentId: 2,
      },
    ],
  },

  {
    id: 2,
    label: "Patrimonio",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Patrimonio",
        link: "/patrimonio/patrimonio",
        parentId: 2,
      },
      {
        id: 3,
        label: "Estados do Patrimonio",
        link: "/patrimonio/patrimonio-estado",
        parentId: 2,
      },
      {
        id: 3,
        label: "Tipos de Patrimonio",
        link: "/patrimonio/patrimonio-tipo",
        parentId: 2,
      },

      {
        id: 3,
        label: "Areas do Patrimonio",
        link: "/patrimonio/patrimonio-area",
        parentId: 2,
      },
    ],
  },

  {
    id: 2,
    label: "Recursos Humanos",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Configuração",
        link: "/funcionarios/rhconfiguracao",
        parentId: 2,
      },
      {
        id: 3,
        label: "Funcionarios",
        link: "/funcionarios/funcionarios",
        parentId: 2,
      },
      {
        id: 3,
        label: "Gerir Equipas",
        link: "/funcionarios/equipas",
        parentId: 2,
      },
      {
        id: 3,
        label: "Gerir Escalas",
        link: "/funcionarios/escala",
        parentId: 2,
      },
      {
        id: 3,
        label: "Categorias",
        link: "/funcionarios/categorias",
        parentId: 2,
      },
    ],
  },

  {
    id: 1,
    label: "ADMIN",
    isTitle: true,
  },

  {
    id: 2,
    label: "administração",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "users",
        link: "/admin/users",
        parentId: 2,
      },
      {
        id: 3,
        label: "grupos",
        link: "/admin/groups",
        parentId: 2,
      },
      {
        id: 3,
        label: "permissios",
        link: "/admin/permissoes",
        parentId: 2,
      },
    ],
  },

  {
    id: 2,
    label: "Configurações",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "endereços",
        link: "/gd/classificacao",
        parentId: 2,
      },
      {
        id: 3,
        label: "Funcionarios",
        link: "/gd/registo",
        parentId: 2,
      },

      {
        id: 3,
        label: "Gerir Equipas",
        link: "/gd/expedicao",
        parentId: 2,
      },
      {
        id: 3,
        label: "Gerir Escalas",
        link: "/gd/correspondencia-documentos",
        parentId: 2,
      },
    ],
  },
];

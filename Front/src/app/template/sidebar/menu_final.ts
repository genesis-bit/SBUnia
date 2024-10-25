import { MenuItem } from "./menu.model";

export const MENU_TECROVAL: MenuItem[] = [
  {
    id: 11,
    label: "HOME",
    link: "/",
  },

  {
    id: 2,
    label: "Visitas",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Visitas",
        link: "/visita/visitas",
        parentId: 2,
      },
      {
        id: 3,
        label: "Visitantes",
        link: "/visita/visitantes",
        parentId: 2,
      },
      {
        id: 4,
        label: "Marcações",
        link: "/visita/visitas-marcacoes",
        parentId: 2,
      },
      {
        id: 5,
        label: "Ocorrências",
        link: "/visita/visitas-ocorrencias",
        parentId: 2,
      },
      {
        id: 6,
        label: "Tipos",
        link: "/visita/visitas-tipos",
        parentId: 2,
      }
    ]
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
    id: 4,
    label: "Correspondencia",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 1,
        label: "Correspondencia",
        link: "/correspondencia/correspondencias",
        parentId: 4,
      },
      {
        id: 4,
        label: "Classificações",
        link: "/correspondencia/correspondencia-classificacoes",
        parentId: 4
      },
      {
        id: 6,
        label: "Detalhes",
        link: "/correspondencia/correspondencia-detalhes",
        parentId: 4
      },
      {
        id: 2,
        label: "Estados ",
        link: "/correspondencia/correspondencia-estados",
        parentId: 4,
      },
      {
        id: 5,
        label: "origens",
        link: "/correspondencia/correspondencia-origems",
        parentId: 4,
      },
      {
        id: 3,
        label: "Tipos",
        link: "/correspondencia/correspondencia-tipos",
        parentId: 4,
      },

    ],
  },

  {
    id: 1,
    label: "ADMIN",
    isTitle: true,
  },

];

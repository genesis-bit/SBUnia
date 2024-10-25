import { MenuItem } from "./menu.model";

export const MENU_TECROVAL: MenuItem[] = [
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
    label: "Actividades",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Minhas Tarefas",
        link: "/actividade/minhas-tarefas",
        parentId: 2,
      },
      {
        id: 3,
        label: "Actividade Gestor",
        link: "/actividade/actividade-gestor-user",
        parentId: 2,
      },
      {
        id: 3,
        label: "Gerir Tarefas",
        link: "/actividade/tarefas",
        parentId: 2,
      },
      {
        id: 3,
        label: "Gerir Actividades",
        link: "/actividade/actividades",
        parentId: 2,
      },     
      {
        id: 3,
        label: "Configurações",
        link: "/actividade/actividade-configuracao",
        parentId: 2,
      },
    ],
  },
  {
    id: 2,
    label: "Funcionarios",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Funcionarios",
        link: "/actividade/funcionario",
        parentId: 2,
      },
      {
        id: 3,
        label: "Categoria",
        link: "/actividade/categoria",
        parentId: 2,
      }
    ]
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
    label: "Correspondencia",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Classificar",
        link: "/gd/classificacao",
        parentId: 2,
      },
      {
        id: 3,
        label: "Gerir Registos",
        link: "/gd/registo",
        parentId: 2,
      },

      {
        id: 3,
        label: "Gerir Expedição",
        link: "/gd/expedicao",
        parentId: 2,
      },
      {
        id: 3,
        label: "Situação do Documento",
        link: "/gd/documentos-situacao",
        parentId: 2,
      },
    ],
  },

  {
    id: 2,
    label: "Gestão documental",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Tramitação",
        link: "/gd/tramitacao",
        parentId: 2,
      },
      {
        id: 3,
        label: "Entidade",
        link: "/gd/entidade",
        parentId: 2,
      },

      {
        id: 3,
        label: "Documentos Por Area",
        link: "/gd/documentos-por-area",
        parentId: 2,
      },
      {
        id: 3,
        label: "Entidade Acreditada",
        link: "/gd/documento-entidade-acreditada",
        parentId: 2,
      },

      {
        id: 3,
        label: "Configuração Geral",
        link: "/gd/gd-configuracao",
        parentId: 2,
      },
      // {
      //   id: 2,
      //   label: "Configuração",
      //   icon: "bx-home-circle",
      //   subItems: [
      //     {
      //       id: 3,
      //       label: "Tipo de documento",
      //       link: "/gd/tipo-documento",
      //       parentId: 2,
      //     },
      //     {
      //       id: 3,
      //       label: "Acesso",
      //       link: "/gd/acesso-documento",
      //       parentId: 2,
      //     },
      //     {
      //       id: 3,
      //       label: "Prioridade",
      //       link: "/gd/prioridade-documento",
      //       parentId: 2,
      //     },
      //     {
      //       id: 3,
      //       label: "Via de transmissão",
      //       link: "/gd/via-transmissao-documento",
      //       parentId: 2,
      //     },
      //     {
      //       id: 3,
      //       label: "Estado",
      //       link: "/gd/estado",
      //       parentId: 2,
      //     },
      //     {
      //       id: 3,
      //       label: "Documento Atividade",
      //       link: "/gd/documento-atividade",
      //       parentId: 2,
      //     },
      //     {
      //       id: 3,
      //       label: "Documento Despacho",
      //       link: "/gd/documento-despacho",
      //       parentId: 2,
      //     },
      //     {
      //       id: 3,
      //       label: "Comunicação",
      //       link: "/gd/documento-comunicacao",
      //       parentId: 2,
      //     },
      //   ],
      // },
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
    ],
  },
];

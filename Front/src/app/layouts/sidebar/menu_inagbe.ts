import { MenuItem } from "./menu.model";

export const MENU_INAGBE: MenuItem[] = [
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
    ],
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
        link: "/gd/correspondencia-documentos",
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
        label: "Entidade Acreditada",
        link: "/gd/documento-entidade-acreditada",
        parentId: 2,
      },
      {
        id: 2,
        label: "Configuração",
        icon: "bx-home-circle",
        subItems: [
          {
            id: 3,
            label: "Tipo de documento",
            link: "/gd/tipo-documento",
            parentId: 2,
          },
          {
            id: 3,
            label: "Acesso",
            link: "/gd/acesso-documento",
            parentId: 2,
          },
          {
            id: 3,
            label: "Prioridade",
            link: "/gd/prioridade-documento",
            parentId: 2,
          },
          {
            id: 3,
            label: "Via de transmissão",
            link: "/gd/via-transmissao-documento",
            parentId: 2,
          },
          {
            id: 3,
            label: "Estado",
            link: "/gd/estado",
            parentId: 2,
          },
          {
            id: 3,
            label: "Documento Atividade",
            link: "/gd/documento-atividade",
            parentId: 2,
          },
          {
            id: 3,
            label: "Documento Despacho",
            link: "/gd/documento-despacho",
            parentId: 2,
          },
          {
            id: 3,
            label: "Comunicação",
            link: "/gd/documento-comunicacao",
            parentId: 2,
          },
        ],
      },
    ],
  },

  {
    id: 2,
    label: "INEMA",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Ocorrencias",
        link: "/inema/ocorrencias",
        parentId: 2,
      },
      {
        id: 3,
        label: "Situações",
        link: "/inema/situacoes",
        parentId: 2,
      },
      {
        id: 3,
        label: "Estados",
        link: "/inema/estados",
        parentId: 2,
      },

      {
        id: 3,
        label: "Tipos de ocorrências",
        link: "/inema/ocorrencias-tipo",
        parentId: 2,
      },

      // {
      //   id: 3,
      //   label: "Situação do Documento",
      //   link: "/inema/estados",
      //   parentId: 2,
      // },
      {
        id: 3,
        label: "Tipos de atividades de ocorrênccia",
        link: "/inema/ocorrencias-atividades-tipo",
        parentId: 2,
      },
      {
        id: 3,
        label: "Atividades de ocorrênccia",
        link: "/inema/ocorrencias-atividades",
        parentId: 2,
      },

      {
        id: 3,
        label: "Produtos",
        link: "/inema/produtos",
        parentId: 2,
      },
      {
        id: 3,
        label: "Pessoas",
        link: "/inema/pessoas",
        parentId: 2,
      },
      {
        id: 3,
        label: "Províncias",
        link: "/inema/provincias",
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
    ],
  },
];

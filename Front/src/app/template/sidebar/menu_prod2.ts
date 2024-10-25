import { MenuItem } from "./menu.model";

export const MENU_PROD: MenuItem[] = [
  {
    id: 11,
    label: "HOME",
    icon: "bx-home-circle",
    link: "/dashboard/home",
  },
  {
    id: 1,
    label: "Portal",
    isTitle: true,
  },
  {
    id: 2,
    label: "Portal  ",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Gerir Notícias",
        link: "/portal/noticias",
        parentId: 2,
      },
      {
        id: 3,
        label: "Eventos",
        link: "/portal/eventos",
        parentId: 2,
      },
      {
        id: 3,
        label: "Contactos",
        link: "/portal/contactos",
        parentId: 2,
      },
      {
        id: 3,
        label: "Sobre",
        link: "/portal/sobre",
        parentId: 2,
      },
      {
        id: 3,
        label: "Empresa",
        link: "/portal/instituicao",
        parentId: 2,
      },

      {
        id: 3,
        label: "Historial",
        link: "/portal/historial",
        parentId: 2,
      },
      {
        id: 3,
        label: "Newsletters",
        link: "/portal/newsletters",
        parentId: 2,
      },
      {
        id: 3,
        label: "Perguntas Frequentes",
        link: "/portal/perguntas-frequentes",
        parentId: 2,
      },
      {
        id: 3,
        label: "Produtos e serviços",
        link: "/portal/produtos-servicos",
        parentId: 2,
      },
      {
        id: 3,
        label: "Pacotes",
        link: "/portal/pacotes",
        parentId: 2,
      },
      {
        id: 3,
        label: "Testemunho",
        link: "/portal/testemunho",
        parentId: 2,
      },
   
    ],
  },

  {
    id: 1,
    label: "Gestão",
    isTitle: true,
  },

  {
    id: 2,
    label: "Agentes",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Agentes",
        link: "/portal/agentes",
        parentId: 2,
      },
      // {
      //   id: 3,
      //   label: "Actividades",
      //   link: "/actividade/actividades",
      //   parentId: 2,
      // },

      // {
      //   id: 3,
      //   label: "Configuração",
      //   link: "/actividade/configuracao",
      //   parentId: 2,
      // },
    ],
  },

  {
    id: 2,
    label: "Actividades",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Actividades",
        link: "/actividade/actividades",
        parentId: 2,
      },
      {
        id: 3,
        label: "Gerir Tarefas",
        link: "/actividade/tarefas",
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
        label: "Classificação",
        link: "/gd/classificacao",
        parentId: 2,
      },
      {
        id: 3,
        label: "Registo",
        link: "/gd/registo",
        parentId: 2,
      },
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

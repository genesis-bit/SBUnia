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
    label: "Gestão Administrativa",
    isTitle: true,
  },

  
  {
    id: 2,
    label: "Visitantes",
    icon: "bx-briefcase-alt-2",
    subItems: [
  
    ],
  },
 
  {
    id: 2,
    label: "Ocorrencias ",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Ocorrencias",
        link: "/ocorrencia/ocorrencias",
        parentId: 2,
      },
      
     
      {
        id: 3,
        label: "relatorio",
        link: "/ocorrencia/relatorio-ocorrencia",
        parentId: 2,
      },
    ],
  },


  {
    id: 2,
    label: "Actividades",
    icon: "bx-home-circle",
    subItems: [ 
  
      {
        id: 3,
        label: "Gerir Actividades",
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
    label: "Correspondencia",
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
    id: 1,
    label: "Recursos Humanos",
    isTitle: true,
  },

  {
    id: 2,
    label: "Funcionarios ",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Tipo",
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
    ],
  },

  {
    id: 2,
    label: "Efectividades ",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Tipo",
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
    ],
  },
  {
    id: 2,
    label: "Equipas ",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Tipo",
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
    ],
  },

  {
    id: 1,
    label: "Localidades Zonas",
    isTitle: true,
  },

  {
    id: 2,
    label: "Endereços  ",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Pais",
        link: "/gd/tipo-documento",
        parentId: 2,
      },
      {
        id: 3,
        label: "Provincia",
        link: "/gd/acesso-documento",
        parentId: 2,
      },
      {
        id: 3,
        label: "Municipio",
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
    ],
  },

  {
    id: 1,
    label: "Localidades Zonas",
    isTitle: true,
  },

  {
    id: 2,
    label: "Patrimonio  ",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 3,
        label: "Pais",
        link: "/gd/tipo-documento",
        parentId: 2,
      },
      {
        id: 3,
        label: "Provincia",
        link: "/gd/acesso-documento",
        parentId: 2,
      },
      {
        id: 3,
        label: "Municipio",
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

 
  {
    id: 1,
    label: "Portal ",
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
      // {
      //   id: 3,
      //   label: "Testemunho",
      //   link: "/portal/testemunho",
      //   parentId: 2,
      // },
    ],
  },
  {
    id: 2,
    label: "Redes Sociais  ",
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
      // {
      //   id: 3,
      //   label: "Testemunho",
      //   link: "/portal/testemunho",
      //   parentId: 2,
      // },
    ],
  },


];

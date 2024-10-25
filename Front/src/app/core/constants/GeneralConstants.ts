export class GeneralConstants {
  

    static   CRUD_OPERATIONS = {
    READ: 0,
    INSERT: 1,
    UPDATE: 2,
    INSERT_OR_UPDATE: 3,
    DELETE: 4,
    GET: 5,
  }

 
  static PAGAMENTO_SITUACAO = {
    ACEITE: 0,
    INDICIO_FRAUDE: 1,
    EM_USO: 2
  }
 
 
 
 
 
  static USER_AUTH = {
    TOKEN_KEY: 'roval_token',
    USERID_KEY: 'roval_user_id', 
    USERDB_KEY: 'roval_user_db',
    USERDBONLINE_KEY:'roval_user_db_online',
    USERNAME_KEY: 'roval_user_nome',
    USERLOGIN_KEY: 'roval_user_login',
    USERPROFILE_KEY: 'roval_user_profile',
    USERPRINT: 'roval_user_print',
    USER_FOTO:'foto',
    USER_BI:'bi',
  }

  static MENU = {
    COMERCIAL: 'comercial',
    SERVICO: 'comercial',
    RECURSOSHUMANOS: 'rh',
    GESTAODOCUMENTAL: 'gd',
    CONTABILIDADE: 'contabilidade',
    CONFIGURACAO: 'configuracao',
    ADMINISTRACAO: 'administracao',

  }


  static INSTITUICAO = {
    ENDERECO_SERVIDOR: 'roval_token',

  }
  static IMPRESSORA = {
    NOME_IMPRESSORA: 'roval_token',

  }
  static Backup_Session = {
    DATA: '20-07-2020',
    NUMERO_BIOMETRICO: '0',
    BACKUP_LOCAL: 'nao',
    BACKUP_ONLINE: 'nao',
  }
  static Acesso = {
    GROUP_KEY: 'admin_operador',
    ESTADO: '0',
    OPERADOR: '0',
    SUPERVISOR: '0',
    ADMIN: '0',
  }
}

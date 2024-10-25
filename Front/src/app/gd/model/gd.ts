export class Documento {
  id: any | undefined;
  nome: string | undefined;
  codigo_documento: any | undefined;
  gd_documento_via_transmissao_id: any | undefined;
  remetente: string | undefined;
  destinatario: string | undefined;
  descricao: string | undefined;
  classificador: any | undefined;
  data_documento: any | undefined;
  data_entrada_saida: any | undefined;
  assunto: any | undefined;
  serie: any | undefined;
  codigo_arquivista: any | undefined;
  origem_documento: any | undefined;
  estado: any | undefined;
  gd_tipo_documento_id: any | undefined;
  gd_documento_despacho_id: any | undefined;
  gd_ordem_referencia_id: any | undefined;
  base_anexo_id: any | undefined;
  gd_prioridade_documento_id: any | undefined;
  user: any | undefined;
  periodo_tratamento: any | undefined;
  despacho: any | undefined;
  icon: any | undefined;
  despacho_entidade: any | undefined;
  despacho_descricao: any | undefined;
  gd_documento_acesso_id: any | undefined;
  gd_estado_id: any | undefined;
  numero_documento: any | undefined;
  numero_registo: any | undefined;
  ano_avaliacao_id: any | undefined;

  data_despacho: any | undefined;
  telefone: any | undefined;
  email: any | undefined;

  sigla: string | undefined;
  codigo: any | undefined;

  base_area_id: any | undefined;
  user_id: any | undefined;
  funcionario_id: any | undefined;
  actividade_tipo_id: any | undefined;

  user_despacho: any | undefined;

  area_despacho: any | undefined;

  area_despacho_conhecimento: any | undefined;

  user_despacho_conhecimento: any | undefined;

  gdDocumentoAcesso: any;
  gdDocumentoViaTransmissoe: any;
  gdEstado: any;
  gdPrioridadeDocumento: any;
  gdTipoDocumento: any;

  natureza: any;

  estados_historico: any;

  base_area_conhecimento: any;
  rh_funcionario_conhecimento: any;

  rh_funcionario_despacho: any;
  base_area_despacho: any;

  // Dados da expedicao
  receptor: string;
  expedido_fisico: number;
  expedido_email: number;
  data_expedicao: any;
  notificacao_enviada: any;
}

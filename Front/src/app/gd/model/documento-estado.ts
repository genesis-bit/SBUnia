export class Documento_estado {
  id: number;
  nome: string;
  codigo_documento: number;
  via_transmissao: number;
  remetente: string;
  destinatario: string;
  data_entrada: any;
  data_saida: any;
  data_documento: any;
  base_area_id: number;
  gd_tipo_documento_id: number;
  assunto: string;
  serie: string;
  codigo_arquivista: string;
  gd_nivel_acesso_id: number;
  unidade_organica_acreditada: string;
  gd_estado_documento_id: number;
  // gd_origens_documento_id: number;
  gd_ordem_referencia_id: number;
  entidade_id: number;
}

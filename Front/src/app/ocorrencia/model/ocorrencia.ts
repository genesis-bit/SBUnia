export class Ocorrencia {
  id: number;
  base_pessoa_id: number;
  pessoa_nome: string;
  ndi: string;
  descricao: string;
  ocorrencia_tipo_id: number;
  ocorrencia_estado_id: number;
  ocorrencia_situacao_id: number;
  ocorrencia_via_transmissao_id: number;
  base_municipio_id: number;
  base_provincia_id: number;
  ocorrencia_natureza: number;

  ocorrencia_local_solicitacao_id: number;
  data_ocorrencia: any;

  relatorio: string;
  user_id: number;
}

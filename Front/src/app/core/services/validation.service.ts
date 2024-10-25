import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
 

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(
    private notifyService: NotificationService,
    private _http: HttpClient, private router: Router
  ) {
  }

  validar(validacao: any, objecto: any) {
    try {
      if (!validacao || !objecto) return false;
      let fields = validacao.rules;
      let messages = validacao.messages;
      for (let index in fields) {
        if (!this.validarCampo(validacao, objecto, index)) return false;
      }
      return true;
    } catch (error) {

    }

    return false;
  }

  validarCampo(validacao: any, objecto: any, campo: string) {
    try {
      if (!validacao || !objecto) return false;
      let fields = validacao.rules;
      let messages = validacao.messages;

      for (let rule of fields[campo]) {


        if (rule)
          if (rule == 'required' && (objecto[campo] == "" || objecto[campo] == undefined)) {
            this.mensagem({ message: messages[`${campo}.required`] });
            return false
          }

        let sub_rule = rule.split(":")
        if (sub_rule.length == 2) {
          if (sub_rule[0] == 'min' && objecto[campo].length < sub_rule[1]) {
            this.mensagem({ message: messages[`${campo}.min`] });
            return false
          }
          if (sub_rule[0] == 'max' && objecto[campo].length > sub_rule[1]) {
            this.mensagem({ message: messages[`${campo}.max`] });
            return false
          }

        }

        // para melhorias futura  duas ou mais expressoes regulares 
        if (rule.indexOf('regex') >= 0) {
          let reg = new RegExp(rule.split(':')[1]);
          if (!reg.test(objecto[campo])) {
            this.mensagem({ message: messages[`${campo}.regex`] });
            return false

          }

        }



      }

      return true;
    } catch (error) {

    }

    return false;
  }


  validarNif(nif: any) {
    try {

      let nif_valido = false
      let reg = new RegExp("(^[0-9]{10}$)");
      let reg2 = new RegExp("(^[0-9]{9}[A-Za-z]{2}[0-9]{3}$)");

      if (reg.test(nif)) {
        nif_valido = true
      }
      if (reg2.test(nif)) {
        nif_valido = true
      }

      if (nif_valido == false) {
        this.mensagem({ message: "O formato do NIF é inválido " });
        return false
      }


      return true;
    } catch (error) {

    }

    return false;
  }


  validarProdutoBalanca(produto:any) {

    try {
      if (Number(produto.requer_peso_balanca) == 1 || Number(produto.requer_peso_balanca) == 2) {

        //validar o tamanho do codigo na balança de ve ser igual 6 digitos e começar com dois 
        // a balanca deve gerar um codigo de barra de 13 digitos mais nós so precisamos cadastrar 6 digitos


        //console.log(produto.codigo_barra)

        //console.log(produto.codigo_barra.length)
        let tamanho_codigo_barra = produto.codigo_barra.length

        if (tamanho_codigo_barra != 5) {
          this.mensagem({ message: "o codigo de barra deve ter os cinco(5) primeiros digitos  equivalente ao produto cadastrado na balança" })
          return false
        }
      }

      return true;
    } catch (error) {
      this.mensagem({ message: "o codigo de barra deve ter os cinco(5)  primeiros digitos equivalente ao produto cadastrado na balança" })

      return false;
    }

  }

  mensagem(mensagem:any) {
    this.notifyService.showToastMessage(mensagem.type || 3, mensagem.message, mensagem.title || 'Atenção')
    return false;
  }

  validarCampoObrigatorio(data:any, mensagem:any) {

    if (!data) {
      this.notifyService.showToastMessage(3, mensagem, 'Atenção')
      return false;
    }

    return true
  }

  validarDadosPessoaisEntidade(data:any) {
    if (data.entidade_tipo_id != 1) {
      return true
    }
    else {
      let data_nascimento = this.validarCampoObrigatorio(data.data_nascimento, "data de nascimento obrigatorio")
      if (!data_nascimento)
        return false;
      let base_estados_civil_id = this.validarCampoObrigatorio(data.base_estados_civil_id, "estado civil obrigatorio")
      if (!base_estados_civil_id)
        return false;
      let base_genero_id = this.validarCampoObrigatorio(data.base_genero_id, "Genero é obrigatorio")
      if (!base_genero_id)
        return false;
      let base_tipo_identificacao_id = this.validarCampoObrigatorio(data.base_tipo_identificacao_id, "Tipo de Identificação é   obrigatorio")
      if (!base_tipo_identificacao_id)
        return false;
      let identificador = this.validarCampoObrigatorio(data.identificador, "Nº de indentificação é   obrigatorio")
      if (!identificador)
        return false;

      return true
    }
  }




  validarDadosTransporte(data:any, tipo_documento_id:any) {

    if (Number(tipo_documento_id) == 23 || (Number(tipo_documento_id) == 24) || (Number(tipo_documento_id) == 30)) {



      let carga_endereco = this.validarCampoObrigatorio(data.carga_endereco, "Endereço carga é obrigatorio")
      if (!carga_endereco)
        return false;
      let carga_data = this.validarCampoObrigatorio(data.carga_data, "data da Carga obrigatorio")
      if (!carga_data)
        return false;
      let carga_cidade = this.validarCampoObrigatorio(data.carga_cidade, "Cidade da Carga é obrigatorio")
      if (!carga_cidade)
        return false;
      let carga_pais = this.validarCampoObrigatorio(data.carga_pais, "Pais de Carga é   obrigatorio")
      if (!carga_pais)
        return false;


      let entrega_endereco = this.validarCampoObrigatorio(data.entrega_endereco, "Endereço de entrega é   obrigatorio")
      if (!entrega_endereco)
        return false;

      let entrega_cidade = this.validarCampoObrigatorio(data.entrega_cidade, "Cidade de entrega é   obrigatorio")
      if (!entrega_cidade)
        return false;

      let entrega_data = this.validarCampoObrigatorio(data.entrega_data, "data de Entrega é   obrigatorio")
      if (!entrega_data)
        return false;
      let entrega_pais = this.validarCampoObrigatorio(data.entrega_pais, "Pais de Entrega é   obrigatorio")
      if (!entrega_pais)
        return false;


    }

    return true

  }


  NumberValidator(numero:any) {
    numero = numero.replace(".", "")
    numero = numero.replace(",", ".")
    return numero

  }
}

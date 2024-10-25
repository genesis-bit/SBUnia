import { Component } from "@angular/core";

import { ActivatedRoute } from "@angular/router";

import { GeneralService } from "src/app/core/services/general.service";
import { GeneralConstants } from "src/app/core/constants/GeneralConstants";

import { Documento } from "../model/gd";

@Component({
  selector: "app-ver-documento-situacao",
  templateUrl: "./ver-documento-situacao.component.html",
  styleUrls: ["./ver-documento-situacao.component.css"],
})
export class VerDocumentoSituacaoComponent {
  documento = new Documento();
  constructor(
    private generalService: GeneralService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.documento.codigo = params["code"];
      // Agora, 'this.codigo' contém o valor do parâmetro 'codigo' da URL.
    });
    this.carregarDocumento();
  }

  carregarDocumento() {
    let params = "detail=detail";
    this.generalService
      .execute(
        `gd-documento/${this.documento.codigo}`,
        GeneralConstants.CRUD_OPERATIONS.READ,
        "",
        "",
        params
      )
      .subscribe((res: any) => {
        console.log("RESULTADO DA PESQUISA", res);
        if (res.data) {
          if (res.data) {
            this.documento = res.data;
            this.documento.data_documento =
              this.documento.data_documento.substring(0, 10);
            this.documento.data_entrada_saida =
              this.documento.data_entrada_saida.substring(0, 10);
            if (this.documento.data_despacho) {
              this.documento.data_despacho =
                this.documento.data_despacho.substring(0, 10);
            }
          }
        }
      });
  }
}

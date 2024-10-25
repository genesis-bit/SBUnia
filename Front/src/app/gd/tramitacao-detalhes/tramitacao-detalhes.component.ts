import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GeneralService } from "src/app/core/services/general.service";
import { GeneralConstants } from "src/app/core/constants/GeneralConstants";

import { Documento } from "../model/gd";

@Component({
  selector: "app-tramitacao-detalhes",
  templateUrl: "./tramitacao-detalhes.component.html",
  styleUrls: ["./tramitacao-detalhes.component.css"],
})
export class TramitacaoDetalhesComponent {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Collapse declare
  isCollapsed: boolean;
  public firstColleaps: boolean = false;
  public secondColleaps: boolean = false;
  public bothColleaps: boolean = false;
  isFirstOpen: boolean = true;

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
    // Collapse value
    this.isCollapsed = false;
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
        if (res.data) {
          console.log("RESULTADO DA PESQUISA", res.data);
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

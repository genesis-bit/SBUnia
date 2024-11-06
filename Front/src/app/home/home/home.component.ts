import { Component } from '@angular/core';
import { earningLineChart, salesAnalyticsDonutChart } from './data';
import { ChartType, ChatMessage } from './saas.model';
import { Store } from '@ngrx/store';
import { ConfigService } from 'src/app/core/services/config.service';
import { fetchchatdata } from 'src/app/store/Chat/chat.action';


 import { GeneralService } from 'src/app/core/services/general.service';
 import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
import { Auth2Service } from 'src/app/core/services/auth2.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  sassEarning: any;
  earningLineChart: ChartType;
  salesAnalyticsDonutChart: ChartType;

  breadCrumbItems: Array<{}>;
 
  sassTopSelling: any;


  username = this.authService.getCurrentUser();
  foto = this.authService.getCurrentFotoPerfil();
  acervos: any;
  estudantes: any;
  prateleiras: any;

  constructor(private authService: Auth2Service,private configService: ConfigService, public store: Store, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Saas', active: true }];

    this.store.dispatch(fetchchatdata());
    this._fetchData();
  
    this.configService.getConfig().subscribe(response => {
      this.sassEarning = response.sassEarning;
      this.sassTopSelling = response.sassTopSelling;
    });

    this.carregarListas();
  }

  ListaAcervo() {
    this.generalService.execute('acervos', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.acervos = data.data;
        console.log("ACervos", this.acervos)
      });
  }

  ListaEstudante() {
    this.generalService.execute('clientes', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.estudantes = data.data;
      });
  }

  ListaPrateleira() {
    this.generalService.execute('prateleiras', GeneralConstants.CRUD_OPERATIONS.READ).
      subscribe((data: any) => {
        this.prateleiras = data.data;
      });
  }

  carregarListas(){
    this.ListaAcervo();
    this.ListaEstudante();
    this.ListaPrateleira();
  }

  selectMonth(value: any) {
    let data = value.target.value
    switch (data) {
      case "january":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2007.35",
            revenue: "0.2",
            time: "From previous period",
            month: "Last month",
            previousamount: "$784.04",
            series: [
              {
                name: "series1",
                data: [22, 35, 20, 41, 51, 42, 49, 45, 58, 42, 75, 48],
              },
            ],
          },
        ];
        break;
      case "december":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2007.35",
            revenue: "0.2",
            time: "From previous period",
            month: "Last month",
            previousamount: "$784.04",
            series: [
              {
                name: "series1",
                data: [22, 28, 31, 34, 40, 52, 29, 45, 68, 60, 47, 12],
              },
            ],
          },
        ];
        break;
      case "november":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2887.35",
            revenue: "0.4",
            time: "From previous period",
            month: "Last month",
            previousamount: "$684.04",
            series: [
              {
                name: "series1",
                data: [28, 30, 48, 50, 47, 40, 35, 48, 56, 42, 65, 41],
              },
            ],
          },
        ];
        break;
      case "october":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2100.35",
            revenue: "0.4",
            time: "From previous period",
            month: "Last month",
            previousamount: "$674.04",
            series: [
              {
                name: "series1",
                data: [28, 48, 39, 47, 48, 41, 28, 46, 25, 32, 24, 28],
              },
            ],
          },
        ];
        break;
    }
  }

  private _fetchData() {
    this.earningLineChart = earningLineChart;
    this.salesAnalyticsDonutChart = salesAnalyticsDonutChart;
  }
}




import { Component, OnInit } from '@angular/core';

import { ChartType } from './apex.model';

import { WebsocketService } from 'src/app/core/services/websocket.service';

import {
  linewithDataChart, columnlabelChart, lineColumAreaChart,
  basicRadialBarChart, simplePieChart, donutChart, splineAreaChart, dashedLineChart, dumbbellTimelineCharts, funnelCharts, dumbbellcolumnCharts, rangeareaChart
} from './data';
import { jobViewChart, ApplicationChart, ApprovedChart, RejectedChart, receivedTimeChart, recentJobsData, vacancyData } from 'src/app/pages/dashboards/jobs/data';

import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
import { GraficoLogsService } from 'src/app/core/services/graficos/graficoLogs.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  jobViewChart: ChartType;
  ApplicationChart: ChartType;
  ApprovedChart: ChartType;
  RejectedChart: ChartType;
  emailSentBarChart: ChartType;
  showNavigationArrows: any;
  showNavigationIndicators: any;
  vacancyData: any;
  receivedTimeChart: ChartType;
  recentJobsData: any;
  isActive: string;

  linewithDataChart: ChartType;
  basicColumChart: ChartType;
  basicColumChartProvincias: ChartType;
  basicColumChartAcessoPagina: ChartType;
  basicColumChartAcessoEmpresa: ChartType;
  columnlabelChart: ChartType;
  lineColumAreaChart: ChartType;
  basicRadialBarChart: ChartType;
  simplePieChart: ChartType;
  donutChart: ChartType;
  barChart: ChartType;

  barChart_origem: ChartType;
  barChart_tipos: ChartType;

  barChartEmpresa: ChartType;
  barChartEmpresaHoje: ChartType;
  barChartUserHoje: ChartType;
  splineAreaChart: ChartType;
  dashedLineChart: ChartType;
  dumbbellTimelineCharts: ChartType;
  funnelCharts: ChartType;
  dumbbellcolumnCharts: ChartType;
  rangeareaChart: ChartType;


  chat_message: any
  chat_messages: string[] = [];

  info_dashboard = {

    ocorrencias_natureza: "",

    ocorrencias_estados: "",
    ocorrencias_por_mes: "",
    ocorrencias_por_provincias: "",
    result_ocorrencias_via_transmissao: "",
    result_ocorrencias_tipos:"",
    ocorrencias_provincias_filtro:"",
    users: "",
    empresas: "",
    licencas: "",
    logs_acessos_paises: "",
    total_licencas_activadas_expiradas: "",
    logs_users_acessos: "",
    logs_users_acessos_hoje: "",
    logs_funcionalidades_acessos: "",
    logs_acessos_empresas: "",
    logs_acessos_empresas_hoje: "",
    users_roval: 0,
    users_agentes: 0,
    users_empresas: 0,

    acesso_sistemas: "",
  }

  constructor(private ws: WebsocketService, private graficoLogsService: GraficoLogsService, private generalService: GeneralService) { }

  ngOnInit() {

    this.carregardados()
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'GESTÃO E MONITORAMENTO ', active: true }];

    /**
     * Fethches the chart data
     */
    this._fetchData();
    this.ws.getNewMessage().subscribe((message: string) => {
      this.chat_messages.push(message);
    })
    this.ws.getWsDashBoardOcorrencia().subscribe((message: any) => {
      this.info_dashboard = message
      this.actualizarGrafico() 
    })



  }



  carregardados() {


    this.generalService.execute(`ocorrencia-dashboard`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {
        if (res.data) {

          this.info_dashboard = res.data

          this.actualizarGrafico()


        }
      });

  }
  actualizarGrafico() {

    console.log(this.info_dashboard)
 
    if (this.info_dashboard?.ocorrencias_por_mes)
    this.basicColumChart = this.graficoLogsService.getOcorrenciasPorMes(this.info_dashboard?.ocorrencias_por_mes)
 
    this.basicColumChartProvincias = this.graficoLogsService.getOcorrenciasPorProvincia(this.info_dashboard?.ocorrencias_provincias_filtro)
 
    //this.basicColumChartAcessoPagina = this.graficoLogsService.getAcessosPorFonte(this.info_dashboard?.result_ocorrencias_via_transmissao)
    //this.barChartEmpresaHoje = this.graficoLogsService.getAcessosPorFonte(this.info_dashboard?.result_ocorrencias_via_transmissao)



    this.barChart_origem =    this.graficoLogsService.getOcorrenciasOrigem(this.info_dashboard?.result_ocorrencias_via_transmissao)

    this.barChart_tipos =    this.graficoLogsService.getOcorrenciasTipo(this.info_dashboard?.result_ocorrencias_tipos)

 
   // this.barChart=   this. graficoLogsService.getAcessosCidades(this.info_dashboard?.logs_acessos_paises   )

  }

  enviar() {
    this.ws.sendMessage(this.chat_message)
    this.chat_message = '';
  }


  /**
   * Fetches the chart data
   */
  private _fetchData() {
    this.jobViewChart = this.jobViewChart;

    this.linewithDataChart = linewithDataChart;
    this.columnlabelChart = columnlabelChart;
    this.lineColumAreaChart = lineColumAreaChart;
    this.basicRadialBarChart = basicRadialBarChart;
    this.simplePieChart = simplePieChart;
    this.donutChart = donutChart;
    this.splineAreaChart = splineAreaChart;
    this.dashedLineChart = dashedLineChart;
    this.dumbbellTimelineCharts = dumbbellTimelineCharts;
    this.funnelCharts = funnelCharts;
    this.dumbbellcolumnCharts = dumbbellcolumnCharts;
    this.rangeareaChart = rangeareaChart;

    this.jobViewChart = jobViewChart;
    this.ApplicationChart = ApplicationChart;
    this.ApprovedChart = ApprovedChart;
    this.RejectedChart = RejectedChart;
    this.vacancyData = vacancyData;
    this.receivedTimeChart = receivedTimeChart;
    this.recentJobsData = recentJobsData;
  }
}

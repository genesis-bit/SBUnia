import { Injectable } from '@angular/core';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';
import { ChartType } from './apex.model';
import { categories } from '@ctrl/ngx-emoji-mart/ngx-emoji';
//import { UtilsService } from '../../utils.service';

@Injectable({
  providedIn: 'root'
})
export class GraficoLogsService {

  //constructor(private UtilsService: UtilsService) { }
 
  getNumberFormatMoney(value) {
    return Number.parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

  }


  getAcessosCidades(data: any) {

    let series: any = []
    let labels: any = []

    for (let p of data) {
      series.push(p.total)
      labels.push(p.cidades ? p.cidades.substring(0, 30) : " - ")
    }

    const barChart: ChartType = {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: 10,
        style: {
          fontSize: "12px",
          colors: ["#000"]
        }
      },
      series: [{
        name: "Nº de acessos",
        data: series,
        //  colors:   "#00259B" ,
      }],
      colors: ['#00259B',],
      xaxis: {
        // tslint:disable-next-line: max-line-length
        categories: labels,
      },
      grid: {
        borderColor: '#f1f1f1'
      },
    };



    return barChart

  }

 
  getAcessosEmpresasHoje(data: any) {

    let series: any = []
    let labels: any = []

    for (let p of data) {
      series.push(p.total)
      labels.push(p.empresa ? p.empresa.substring(0, 30) : " - ")
    }

    const barChart: ChartType = {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: 10,
        style: {
          fontSize: "12px",
          colors: ["#000"]
        }
      },
      series: [{
        name: "Nº de acessos",
        data: series,
         colors:   "#F0259B" ,
      }],
      
      xaxis: {
        // tslint:disable-next-line: max-line-length
        categories: labels,
      },
      grid: {
        borderColor: '#f1f1f1'
      },
    };



    return barChart

  }
  getOcorrenciasOrigem(data: any) {

 
    let series: any = [ ]
    let labels: any = [ ]

    for (let p of data) {
       series.push(p.total)
       labels.push(p.origem ? p.origem.substring(0, 30) : " - ")
    }

    const barChart: ChartType = {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: 10,
        style: {
          fontSize: "12px",
          colors: ["#000"]
        }
      },
      series: [{
        name: "Nº de chamadas",
        data: series,
        //  colors:   "#00259B" ,
      }],
      colors: ['#00259B',],
      xaxis: {
        // tslint:disable-next-line: max-line-length
        categories: labels,
      },
      grid: {
        borderColor: '#f1f1f1'
      },
    };



    return barChart

}

getOcorrenciasTipo(data: any) {

 
  let series: any = [ ]
  let labels: any = [ ]

  for (let p of data) {
     series.push(p.total)
     labels.push(p.tipo ? p.tipo.substring(0, 30) : " - ")
  }

  const barChart: ChartType = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top"
        }
      }
    },
    dataLabels: {
      enabled: true,
      offsetX: 10,
      style: {
        fontSize: "12px",
        colors: ["#000"]
      }
    },
    series: [{
      name: "Nº de chamadas",
      data: series,
      //  colors:   "#F0259B" ,
    }],
    colors: ['#F0259B',],
    xaxis: {
      // tslint:disable-next-line: max-line-length
      categories: labels,
    },
    grid: {
      borderColor: '#f1f1f1'
    },
  };



  return barChart

}
  getAcessosUsersHoje(data: any) {

    let series: any = []
    let labels: any = []

    for (let p of data) {
      series.push(p.total)
      labels.push(p.user ? p.user.substring(0, 30) : " - ")
    }

    const barChart: ChartType = {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: 10,
        style: {
          fontSize: "12px",
          colors: ["#000"]
        }
      },
      series: [{
        name: "Nº de acessos",
        data: series,
         colors:   "#F0259B" ,
      }],
      
      xaxis: {
        // tslint:disable-next-line: max-line-length
        categories: labels,
      },
      grid: {
        borderColor: '#f1f1f1'
      },
    };



    return barChart

  }
  getOcorrenciasPorMes(data: any) {

    

    console.log(data)

    const basicColumChart : ChartType = {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
          columnWidth: '45%',
        },
      },
      dataLabels: {
        enabled: true,
        style: { colors: ["#000"] },
      },
      stroke: {
        show: true,
        width: 4,
        colors: ['transparent']
      },
      colors: ['#34c38f', '#556ee6', '#f46a6a'],
      series: [
        {

          color: "#0B8E0B",
          name: "Atendido ",
          data: [

            data.mes_activacao_01 ? data.mes_activacao_01: 0,
            data.mes_activacao_02 ? data.mes_activacao_02 : 0,
            data.mes_activacao_03 ? data.mes_activacao_03 : 0,
            data.mes_activacao_04 ? data.mes_activacao_04 : 0, 
            data.mes_activacao_05 ? data.mes_activacao_05 : 0,
            data.mes_activacao_06 ? data.mes_activacao_06 : 0,
            data.mes_activacao_07 ? data.mes_activacao_07 : 0,
            data.mes_activacao_08 ? data.mes_activacao_08 : 0,
            data.mes_activacao_09 ? data.mes_activacao_09 : 0,
            data.mes_activacao_10 ? data.mes_activacao_10 : 0,
            data.mes_activacao_11 ? data.mes_activacao_11 : 0,
            data.mes_activacao_12 ? data.mes_activacao_12 : 0,
            data.atendido ? data.atendido : 0,
          ]
        },
        {
          color: "#F94336",
          name: "Falso",
          data: [

            data.mes_expiracao_01 ? data.mes_expiracao_01 : 0,
            data.mes_expiracao_02 ? data.mes_expiracao_02 : 0,
            data.mes_expiracao_03 ? data.mes_expiracao_03 : 0,
            data.mes_expiracao_04 ? data.mes_expiracao_04 : 0,
            data.mes_expiracao_05 ? data.mes_expiracao_05 : 0,
            data.mes_expiracao_06 ? data.mes_expiracao_06 : 0,
            data.mes_expiracao_07 ? data.mes_expiracao_07 : 0,
            data.mes_expiracao_08 ? data.mes_expiracao_08 : 0,
            data.mes_expiracao_09 ? data.mes_expiracao_09 : 0,
            data.mes_expiracao_10 ? data.mes_expiracao_10 : 0,
            data.mes_expiracao_11 ? data.mes_expiracao_11 : 0,
            data.mes_expiracao_12 ? data.mes_expiracao_12 : 0,
            data.falso ? data.falso : 0,
          ]
        },

      ],

      xaxis: {
        categories: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Octubro",
          "Novembro",
          "Dezembro",
          "TOTAL"
        
        ],
      },
      yaxis: {
        title: {
          text: ' (QUANTIDADE)'
        }
      },
      fill: {
        opacity: 1
      },
      grid: {
        borderColor: '#f1f1f1'
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return ' ' + val + ' ';
          }
        }
      }
    };

    return basicColumChart
  }

  getOcorrenciasPorProvincia(data: any) {

    
    console.log(data)
    let series: any = []
    let labels: any = []
 
    for (let p of data) {
      series.push(p.total)
      labels.push(p.provincia ? p.provincia.substring(0, 30) : " - ")
    }
    
    const basicColumChart : ChartType = {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
          columnWidth: '45%',
        },
      },
      dataLabels: {
        enabled: true,
        style: { colors: ["#000"] },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      colors: ['#34c38f', '#556ee6', '#f46a6a'],
      series: [
        {

          color: "#0B8E0B",
          name: "Chamadas por Provincias ",
          data:  series
        },
      

      ],

      xaxis: {
        categories: labels,
      },
      yaxis: {
        title: {
          text: ' (QUANTIDADE)'
        }
      },
      fill: {
        opacity: 1
      },
      grid: {
        borderColor: '#f1f1f1'
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return ' ' + val + ' ';
          }
        }
      }
    };

    return basicColumChart
  }
  getAcessoUsers(data: any) {
 
    console.log(data) 

    let series: any = []
    let labels: any = []

    for (let p of data) {
      series.push(p.total)
      labels.push(p.user ? p.user.substring(0, 30) : " - ")
    }

    const basicColumChart: ChartType = {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
          columnWidth: '45%',
        },
      },
      legend: {
        position: 'bottom',
        fontSize: '12px',
        fontWeight: 600,
        color:"#000",

        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },

      dataLabels: {
        enabled: true,
        position: 'bottom',
        fontSize: '12px',
        fontWeight: 600,
        color:"#000",
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      colors: ['#34c38f', '#556ee6', '#f46a6a'],
      series: [
        {

          color: "#0B8E0B",
          name: "USER ",
          data: series
        },
       

      ],

      xaxis: {
        categories: labels,
      },
      yaxis: {
        title: {
          text: ' (QUANTIDADE)'
        }
      },
      fill: {
        opacity: 1
      },
      grid: {
        borderColor: '#f1f1f1'
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return ' ' + val + ' ';
          }
        }
      }
    };

    return basicColumChart
  }

  getAcessoPaginas(data: any) {
 
    console.log(data) 

    let series: any = []
    let labels: any = []

    for (let p of data) {
      series.push(p.total)
      labels.push(p.pagina ? p.pagina.substring(0, 30) : " - ")
    }

    const basicColumChart: ChartType = {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
          columnWidth: '45%',
        },
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      colors: ['#34c38f', '#556ee6', '#f46a6a'],
      series: [
        {

          color: "#0B8E0B",
          name: "USER ",
          data: series
        },
       

      ],

      xaxis: {
        categories: labels,
      },
      yaxis: {
        title: {
          text: ' (QUANTIDADE)'
        }
      },
      fill: {
        opacity: 1
      },
      grid: {
        borderColor: '#f1f1f1'
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return ' ' + val + ' ';
          }
        }
      }
    };

    return basicColumChart
  }

  
  getAcessoEmpresas(data: any) {
 
    console.log(data) 

    let series: any = []
    let labels: any = []

    for (let p of data) {
      series.push(p.total)
      labels.push(p.empresa ? p.empresa.substring(0, 30) : " - ")
    }

    const basicColumChart: ChartType = {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
          columnWidth: '45%',
        },
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      colors: ['#34c38f', '#556ee6', '#f46a6a'],
      series: [
        {

          color: "#0B8E0B",
          name: "USER ",
          data: series
        },
       

      ],

      xaxis: {
        categories: labels,
      },
      yaxis: {
        title: {
          text: ' (QUANTIDADE)'
        }
      },
      fill: {
        opacity: 1
      },
      grid: {
        borderColor: '#f1f1f1'
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return ' ' + val + ' ';
          }
        }
      }
    };

    return basicColumChart
  }
  getVendaMes() {



  }

  getVendaFactura() {



  }
  getVendaFacturaRecibo() {



  }
  getVendaRecibos() {


  }

  produtosMaisVendido(produtos: any) {

    // console.log(produtos)

    let series: any = []
    let labels: any = []

    for (let p of produtos) {
      series.push(p.total)
      labels.push(p.name ? p.name.substring(0, 30) : " - ")
    }
    const chartOptions = {
      series: [
        {
          name: "basic",
          data: series,
          color: "#00259B",
        }
      ],

      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      xaxis: {
        categories: labels
      }
    };
    return chartOptions
  }

  produtosMaisComprado(produtos: any) {

    console.log(produtos)

    let series: any = []
    let labels: any = []

    for (let p of produtos) {
      series.push(p.total)
      labels.push(p.name ? p.name.substring(0, 30) : " - ")
    }
    const chartOptions = {
      series: [
        {
          name: "basic",
          data: series,
          color: "#8E0D0D",
        }
      ],

      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      xaxis: {
        categories: labels
      }
    };
    return chartOptions
  }

  produtosMaisVendido2(produtos: any) {




    let series: any = []
    let labels: any = []
    for (let p of produtos) {
      series.push(p.total)
      labels.push(p.name.substring(0, 30))
    }

    const chartOptions = {
      series: series,
      chart: {
        type: 'donut',
        width: '670'
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],

      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },

      dataLabels: { // add this part to remove %
        enabled: true,
        formatter(value: any, opts: any): any {
          return opts.w.config.series[opts.seriesIndex];
        },
      },
      fill: {
        type: "gradient"
      },
    };





    return chartOptions




  }
  produtosMaisFacturado(produtos) {


    let series: any = []
    let labels: any = []
    for (let p of produtos) {
      series.push(p.total)
      labels.push(p.name.substring(0, 30))
    }

    const chartOptions = {
      series: series,
      chart: {
        type: 'donut',
        width: '670'
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],

      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },

      dataLabels: { // add this part to remove %
        enabled: true,
        formatter(value: any, opts: any): any {
          return opts.w.config.series[opts.seriesIndex];
        },
      },
      fill: {
        type: "gradient"
      },
    };

    return chartOptions;


  }
  numberWithCommas(x) {
    return x.toFixed(2);
  }

  getRceitasDespesasAno(receitas: any, despesas: any) {


    let receita_total = Number(receitas?.vendas?.facturarecibo_ano.total ?? 0) + Number(receitas?.vendas?.recibo_ano.total ?? 0)
    let despesa_total = Number(despesas?.despesas?.facturarecibo_ano.total ?? 0) + Number(receitas?.vendas?.recibo_ano.total ?? 0)


    let series: any = []
    let labels: any = []
    let colors: any = ['#F94336', '#4DA2F7',]

    series.push(despesa_total)
    series.push(receita_total)


    labels.push('Despesa Anual')
    labels.push('Receita Anual')


    const chartOptions = {
      series: series,
      colors: colors,
      chart: {
        type: 'donut',
        height: 480,
      },

      labels: labels

      ,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],

      legend: {
        position: 'bottom',
        fontSize: '12px',
        fontWeight: 600,

        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },

      dataLabels: { // add this part to remove %
        enabled: true,
        formatter(value: any, opts: any): any {
          return opts.w.config.series[opts.seriesIndex];
        },
      },
      fill: {
        type: "gradient"
      },

      yaxis: {

        formatter: (value) => {
          //    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          return `${this.numberWithCommas(value)} `;
        },


      },
      xaxis: {
        labels: {
          formatter: function (value) {
            //  return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return value;
          }
        },
      }
    };





    return chartOptions




  }





  getVendasPorUtilizador(data_users: any) {



    let user_name = [];
    let user_total = []
    let user_color = []
    let i = 1;

    let color = ['#126B17', '#AEB404', '#298A08', '#088A85', '#0431B4', '#B4045F', '#0A2A12', '#6E6E6E', '#DF7401']
    for (let user of data_users) {
      //  user_name.push(user?.name)
      //  user_total.push(user.total) 
      //  user_color = [...user_color, color[i]]
      if (i == 9)
        i = 1;
    }




  }


  getFactura() {

  }


  getImpostoResumo() {

  }


  getImpostoResumoTotal() {



  }





}

 

  import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
  import {   monthlyEarningChart } from './data';
  import { ChartType } from '../models/dashboard';
  import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
  import { EventService } from '../../core/services/event.service';
  
  import { ConfigService } from '../../core/services/config.service';
  import { Auth2Service } from 'src/app/core/services/auth2.service';
  import { environment } from 'src/environments/environment';
  import { earningLineChart, salesAnalyticsDonutChart, jobViewChart, ApplicationChart, ApprovedChart, RejectedChart, emailSentBarChart,
     vacancyData, receivedTimeChart, recentJobsData } from './data';
 
  @Component({
    selector: 'app-my-dashboard',
    templateUrl: './my-dashboard.component.html',
    styleUrls: ['./my-dashboard.component.css']
  })
  export class MyDashboardComponent {


    modalRef?: BsModalRef;
    isVisible: string;
  
    emailSentBarChart: ChartType;
    monthlyEarningChart: ChartType;
    transactions: any;
    statData: any;
    config:any = {
      backdrop: true,
      ignoreBackdropClick: true
    };
  
    user_bi: any
    user_email: any
    user_foto: any
  
    isActive: string;
  
    @ViewChild('content') content;
    @ViewChild('center', { static: false }) center?: ModalDirective;
    constructor(private modalService: BsModalService,
      private auth2Service: Auth2Service, private configService: ConfigService, private eventService: EventService) {
    }

    jobViewChart: ChartType;
    ApplicationChart: ChartType;
    ApprovedChart: ChartType;
    RejectedChart: ChartType; 
    showNavigationArrows: any;
    showNavigationIndicators: any;
    vacancyData: any;
    receivedTimeChart: ChartType;
    recentJobsData: any; 
    earningLineChart: ChartType;
    salesAnalyticsDonutChart: ChartType;
    sassEarning: any;
  sassTopSelling: any;
    ngOnInit() {
      this._fetchData();
      /**
       * horizontal-vertical layput set
       */
      const attribute = document.body.getAttribute('data-layout');
  
      this.isVisible = attribute;
      const vertical = document.getElementById('layout-vertical');
      if (vertical != null) {
        vertical.setAttribute('checked', 'true');
      }
      if (attribute == 'horizontal') {
        const horizontal = document.getElementById('layout-horizontal');
        if (horizontal != null) {
          horizontal.setAttribute('checked', 'true');
        }
      }
  
  
      if (this.auth2Service.getCurrentUser())
      this.user_email = this.auth2Service.getCurrentUser()
  
    if (this.auth2Service.getUserBI())
      this.user_bi = this.auth2Service.getUserBI()
  
    if (this.auth2Service.getCurrentFotoPerfil())
      this.user_foto = environment.baseUrl +"/img-user/"+ this.auth2Service.getCurrentFotoPerfil()   
  
      /**
       * Fetches the data
       */
      this.fetchData();
    }
  
    ngAfterViewInit() {
   /*   setTimeout(() => {
       this.center?.show()
      }, 2000);
      */
    }
  
    /**
     * Fetches the data
     */
    private fetchData() {
      this.emailSentBarChart = emailSentBarChart;
      this.monthlyEarningChart = monthlyEarningChart;
  
      this.isActive = 'year';
      this.configService.getConfig().subscribe(data => {
        this.transactions = data.transactions;
        this.statData = data.statData;
      });
    }
    opencenterModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }
    weeklyreport() {
      this.isActive = 'week';
      this.emailSentBarChart.series =
        [{
          name: 'Series A',
          data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
        }, {
          name: 'Series B',
          data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
        }, {
          name: 'Series C',
          data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
        }];
    }
  
    monthlyreport() {
      this.isActive = 'month';
      this.emailSentBarChart.series =
        [{
          name: 'Series A',
          data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
        }, {
          name: 'Series B',
          data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
        }, {
          name: 'Series C',
          data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
        }];
    }
  
    yearlyreport() {
      this.isActive = 'year';
      this.emailSentBarChart.series =
        [{
          name: 'Series A',
          data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
        }, {
          name: 'Series B',
          data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
        }, {
          name: 'Series C',
          data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
        }];
    }
  
  
    /**
     * Change the layout onclick
     * @param layout Change the layout
     */
    changeLayout(layout: string) {
      this.eventService.broadcast('changeLayout', layout);
    }

    
  private _fetchData() {
    this.jobViewChart = jobViewChart;
    this.ApplicationChart = ApplicationChart;
    this.ApprovedChart = ApprovedChart;
    this.RejectedChart = RejectedChart;
    this.emailSentBarChart = emailSentBarChart;
    this.vacancyData = vacancyData;
    this.receivedTimeChart = receivedTimeChart;
    this.recentJobsData = recentJobsData;

    this.earningLineChart = earningLineChart;
    this.salesAnalyticsDonutChart = salesAnalyticsDonutChart;
  }
  // on click chart render
  sellingProduct(event) {
    let month = event.target.value;
    switch (month) {
      case "january":
        this.sassTopSelling = [
          {
            title: "Product B",
            amount: "$ 7842",
            revenue: "0.4",
            list: [
              {
                name: "Product D",
                text: "Neque quis est",
                sales: 41,
                chartVariant: "#34c38f"
              },
              {
                name: "Product E",
                text: "Quis autem iure",
                sales: 14,
                chartVariant: "#556ee6"
              },
              {
                name: "Product F",
                text: "Sed aliquam mauris.",
                sales: 85,
                chartVariant: "#f46a6a"
              },
            ],
          },
        ];
        break;
      case "december":
        this.sassTopSelling = [
          {
            title: "Product A",
            amount: "$ 6385",
            revenue: "0.6",
            list: [
              {
                name: "Product A",
                text: "Neque quis est",
                sales: 37,
                chartVariant: "#556ee6"
              },
              {
                name: "Product B",
                text: "Quis autem iure",
                sales: 72,
                chartVariant: "#f46a6a"
              },
              {
                name: "Product C",
                text: "Sed aliquam mauris.",
                sales: 54,
                chartVariant: "#34c38f"
              },
            ],
          },
        ];
        break;
      case "november":
        this.sassTopSelling = [
          {
            title: "Product C",
            amount: "$ 4745",
            revenue: "0.8",
            list: [
              {
                name: "Product G",
                text: "Neque quis est",
                sales: 37,
                chartVariant: "#34c38f"
              },
              {
                name: "Product H",
                text: "Quis autem iure",
                sales: 42,
                chartVariant: "#556ee6"
              },
              {
                name: "Product I",
                text: "Sed aliquam mauris.",
                sales: 63,
                chartVariant: "#f46a6a"
              },
            ],
          },
        ];
        break;
      case "october":
        this.sassTopSelling = [
          {
            title: "Product A",
            amount: "$ 6385",
            revenue: "0.6",
            list: [
              {
                name: "Product A",
                text: "Neque quis est",
                sales: 37,
                chartVariant: "#f46a6a"
              },
              {
                name: "Product B",
                text: "Quis autem iure",
                sales: 72,
                chartVariant: "#556ee6"
              },
              {
                name: "Product C",
                text: "Sed aliquam mauris.",
                sales: 54,
                chartVariant: "#34c38f"
              },
            ],
          },
        ];
        break;
      default:
        this.sassTopSelling = [
          {
            title: "Product A",
            amount: "$ 6385",
            revenue: "0.6",
            list: [
              {
                name: "Product A",
                text: "Neque quis est",
                sales: 37,
                chartVariant: "#556ee6"
              },
              {
                name: "Product B",
                text: "Quis autem iure",
                sales: 72,
                chartVariant: "#34c38f"
              },
              {
                name: "Product C",
                text: "Sed aliquam mauris.",
                sales: 54,
                chartVariant: "#f46a6a"
              }
            ]
          }
        ];
        break;
    }
  }

 
  }
  
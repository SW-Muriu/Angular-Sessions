import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from "ng-apexcharts";
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { StaticsService } from 'src/app/user/data/services/dashboard/statics.service';

export type chartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  labels: string[];
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-purchase-orders-issued',
  templateUrl: './purchase-orders-issued.component.html',
  styleUrls: ['./purchase-orders-issued.component.sass']
})
export class PurchaseOrdersIssuedComponent extends BaseComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public barChartOptions: Partial<chartOptions>;
  public radialChartOptions: Partial<chartOptions>;
  public gaugeChartOptions: Partial<chartOptions>;
  public stackBarChart: Partial<chartOptions>;
  public performanceRateChartOptions: Partial<chartOptions>;

  chartDispType: any = ["Year-wise", "Month-wise", "Date-wise"];
  monthsArray: any = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novembar",
    "December",
  ];

  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  years: Object;
  needYear = false;
  needMonth = false;
  poneedYear = false;
  poneedMonth = false;
  month: any;
  invoicesArray: any[];
  purchaseOrdersArray: any[] = [];
  invoicesMetrics: any[] = [];
  invoicesData: any[] = [];
  purchaseOrdersMetrics: any[] = [];
  purchaseOrdersData: any[] = [];
  dateWiseInvoicesArray: any[] = [];
  invoiceParametersForm: FormGroup;
  purchaseOrdersParametersForm: FormGroup;
  monthWiseSelceted: boolean = false;
  dateWiseSelected: boolean = false;
  year: any;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private staticsService: StaticsService) {
    super()
   }

  ngOnInit(): void {
    this.getPurchaseOrdersYears();    

    this.getPurchaseOrdersIssuedYearWise();

    this.purchaseOrdersParametersForm =
      this.createPurchaseOrderParametersForm();
    
  }

  createPurchaseOrderParametersForm() {
    return this.fb.group({
      period: [""],
      year: [this.currentYear],
      month: [this.currentMonth],
    });
  }

  onSelectPurchaseOrderPeriod(event: any) {
    if (event.value == "Year-wise") {
      this.poneedYear = false;
      this.poneedMonth = false;
      this.getPurchaseOrdersIssuedYearWise();
    }
    if (event.value == "Month-wise") {
      this.poneedYear = true;
      this.poneedMonth = false;
      let year = new Date().getFullYear();
      console.log(year);

      this.getPurchaseOrdersIssuedMonthWise(year);
    }
    if (event.value == "Date-wise") {
      this.poneedYear = false;
      this.poneedMonth = true;
      let year = new Date().getFullYear();

      this.getPurchaseOrdersIssuedDateWise(year);
    }
  }

  getPurchaseOrdersYears(){
    this.isLoading = true;
    this.staticsService.getPurhaseOrdersGeneratedPerYearSummary().pipe(takeUntil(this.subject)).subscribe(res => {
      this.purchaseOrdersArray = res;

      if(this.purchaseOrdersArray){
        this.isLoading = false;
      }

      for (let i = 0; i < this.purchaseOrdersArray.length; i++) {
        this.purchaseOrdersMetrics.push(this.purchaseOrdersArray[i].identity);
      }
    }, err => {
      console.log(err)
    })
  }

  getPurchaseOrdersIssuedYearWise() {
    this.isLoading = true;

    let purchaseOrdersArray: any[] = [];
    const purchaseOrdersMetrics: any[] = [];
    const purchaseOrdersData: any[] = [];
    this.staticsService
      .getPurhaseOrdersGeneratedPerYearSummary()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          purchaseOrdersArray = res;

          if(purchaseOrdersArray){
            this.isLoading = false
          }

          for (let i = 0; i < purchaseOrdersArray.length; i++) {
            purchaseOrdersMetrics.push(
            purchaseOrdersArray[i].identity
            );
          }
          for (let i = 0; i < purchaseOrdersArray.length; i++) {
            purchaseOrdersData.push(purchaseOrdersArray[i].po_no);
          }

          console.log("Purchase Order", purchaseOrdersData);
          console.log("Purchase Order Metrics", purchaseOrdersMetrics)

          this.performanceRateChartOptions = {
            series: [
              {
                name: "No of Invoices",
                data: purchaseOrdersData,
              },
            ],
            chart: {
              height: 380,
              type: "line",
              dropShadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
              },
              foreColor: "#9aa0ac",
              toolbar: {
                show: false,
              },
            },
            colors: ["#545454"],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: "smooth",
            },
            markers: {
              size: 1,
            },
            xaxis: {
              categories: purchaseOrdersMetrics,
              title: {
                text: "Years",
              },
            },
            yaxis: {
              title: {
                text: "PO's",
              },
            },
            tooltip: {
              theme: "dark",
              marker: {
                show: true,
              },
              x: {
                show: true,
              },
            },
          };
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getPurchaseOrdersIssuedMonthWise(event: any) {
    this.isLoading = true;
    this.year = this.purchaseOrdersParametersForm.controls.year.value;
    this.staticsService
      .getPurchaseOrdersIssuedMonthWiseStatics(this.year)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("Monthly POs", res)
          const monthlyPosArray: any[] = res;

          if(monthlyPosArray){
            this.isLoading = false
          }

          const monthsArray = new Array();
          const totalPOsPerMonthArray = new Array();

          for (let i = 0; i < monthlyPosArray.length; i++) {
            monthsArray.push(monthlyPosArray[i].identity);
          }
          for (let i = 0; i < monthlyPosArray.length; i++) {
            totalPOsPerMonthArray.push(
              monthlyPosArray[i].po_no
            );
          }

          this.performanceRateChartOptions = {
            series: [
              {
                name: "No of PO's",
                data: totalPOsPerMonthArray,
              },
            ],
            chart: {
              height: 380,
              type: "line",
              dropShadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
              },
              foreColor: "#9aa0ac",
              toolbar: {
                show: false,
              },
            },
            colors: ["#545454"],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: "smooth",
            },
            markers: {
              size: 1,
            },
            xaxis: {
              categories: monthsArray,
              title: {
                text: "Months",
              },
            },
            yaxis: {
              title: {
                text: "No of invoices",
              },
            },
            tooltip: {
              theme: "dark",
              marker: {
                show: true,
              },
              x: {
                show: true,
              },
            },
          };
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getPurchaseOrdersIssuedDateWise(event: any){
    this.isLoading = true;

    this.year = this.purchaseOrdersParametersForm.controls.year.value;
    this.month = this.purchaseOrdersParametersForm.controls.month.value;
   

    this.staticsService
      .getPurchaseOrdersIssuedDatewiseStatics(this.year, this.month)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          const dateWisePOsMetrics = new Array();
          const dateWisePOsData = new Array();
          let dateWisePOsArray: any[] = [];

          dateWisePOsArray = res;

          if(dateWisePOsArray){
            this.isLoading = false
          }

          console.log("DateWise POs Data", dateWisePOsArray)

          for (let i = 0; i < dateWisePOsArray.length; i++) {
            dateWisePOsMetrics.push(
              dateWisePOsArray[i].identity
            );
          }
          for (let i = 0; i < dateWisePOsArray.length; i++) {
            dateWisePOsData.push(
              dateWisePOsArray[i].po_no
            );
          }

          console.log("DateWise Metrics", dateWisePOsMetrics);
          console.log("DateWise Data", dateWisePOsData)

          this.performanceRateChartOptions = {
            series: [
              {
                name: "No of PO's",
                data: dateWisePOsData,
              },
            ],
            chart: {
              height: 380,
              type: "line",
              dropShadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
              },
              foreColor: "#9aa0ac",
              toolbar: {
                show: false,
              },
            },
            colors: ["#545454"],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: "smooth",
            },
            markers: {
              size: 1,
            },
            xaxis: {
              categories: dateWisePOsMetrics,
              title: {
                text: "Date",
              },
            },
            yaxis: {
              title: {
                text: "No of invoices",
              },
            },
            tooltip: {
              theme: "dark",
              marker: {
                show: true,
              },
              x: {
                show: true,
              },
            },
          };
        },
        (err) => {
          console.log(err);
        }
      );
  }



}

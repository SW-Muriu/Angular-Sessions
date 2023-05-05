import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  ApexResponsive,
} from "ng-apexcharts";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { StaticsService } from "src/app/user/data/services/dashboard/statics.service";
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
  selector: "app-invoices-issued",
  templateUrl: "./invoices-issued.component.html",
  styleUrls: ["./invoices-issued.component.sass"],
})
export class InvoicesIssuedComponent extends BaseComponent implements OnInit {
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
  monthWiseSelceted: boolean = false;
  dateWiseSelected: boolean = false;
  year: any;
  isLoading: boolean = true;

  constructor(private fb: FormBuilder, private staticsService: StaticsService) {
    super();
  }

  ngOnInit(): void {
    this.getInvoicesYears();

    this.getInvoicesIssuedYearWise();

    this.invoiceParametersForm = this.createInvoiceParamtersForm();
  }

  createInvoiceParamtersForm() {
    return this.fb.group({
      period: [""],
      year: [this.currentYear],
      month: [this.currentMonth],
    });
  }

  onSelectPeriod(event: any) {
    if (event.value == "Year-wise") {
      this.needYear = false;
      this.needMonth = false;
      this.getInvoicesIssuedYearWise();
    }
    if (event.value == "Month-wise") {
      this.needYear = true;
      this.needMonth = false;
      let year = new Date().getFullYear();
      console.log(year);

      this.getInvoicesIssuedMonthWise(year);
    }
    if (event.value == "Date-wise") {
      this.needYear = false;
      this.needMonth = true;
      let year = new Date().getFullYear();
      this.getInvoicesIssuedDatewise(year);
    }
  }

  getInvoicesYears() {
    this.isLoading = true;
    this.staticsService
      .getInvoicesGeneratedPerYearSummary()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.invoicesArray = res;

          if(this.invoicesArray){
            this.isLoading = false
          }

          for (let i = 0; i < this.invoicesArray.length; i++) {
            this.invoicesMetrics.push(this.invoicesArray[i].identity);
          }

          console.log("invoicesMetrics ", this.invoicesMetrics);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getInvoicesIssuedYearWise() {
    this.isLoading = true;
    let invoicesArray: any[] = [];
    const invoicesMetrics: any[] = [];
    const invoicesData: any[] = [];
    this.staticsService
      .getInvoicesGeneratedPerYearSummary()
      .pipe(takeUntil(this.subject))
      .subscribe((res) => {
        invoicesArray = res;

        if(invoicesArray){
          this.isLoading = false
        }

        for (let i = 0; i < invoicesArray.length; i++) {
          invoicesMetrics.push(invoicesArray[i].identity);
        }

        for (let i = 0; i < invoicesArray.length; i++) {
          invoicesData.push(invoicesArray[i].invoiceno_no);
        }

        this.barChartOptions = {
          series: [
            {
              name: "Invoices Per Year",
              data: invoicesData,
            },
          ],
          chart: {
            type: "bar",
            height: 350,
            stacked: false,
            stackType: "100%",
            foreColor: "#9aa0ac",
          },
          colors: ["#674EC9", "#C1C1C1"],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "35%",
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          xaxis: {
            categories: invoicesMetrics,
            title: {
              text: "Years",
            },
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: "bottom",
            offsetX: 0,
            offsetY: 0,
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
      });
  }

  getInvoicesIssuedMonthWise(event: any) {
    this.isLoading = true;

    this.year = this.invoiceParametersForm.controls.year.value;
    this.staticsService
      .getInvoicesIssuedMonthWiseStatics(this.year)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          const monthlyInvoicesArray: any[] = res;

          if(monthlyInvoicesArray){
            this.isLoading = false
          }

          const monthsArray = new Array();
          const totalInvoicesPerMonthArray = new Array();

          for (let i = 0; i < monthlyInvoicesArray.length; i++) {
            monthsArray.push(monthlyInvoicesArray[i].identity);
          }
          for (let i = 0; i < monthlyInvoicesArray.length; i++) {
            totalInvoicesPerMonthArray.push(
              monthlyInvoicesArray[i].invoiceno_no
            );
          }

          this.barChartOptions = {
            series: [
              {
                name: "Monthly Invoices",
                data: totalInvoicesPerMonthArray,
              },
            ],
            chart: {
              type: "bar",
              height: 350,
              stacked: false,
              stackType: "100%",
              foreColor: "#9aa0ac",
            },
            colors: ["#674EC9", "#C1C1C1"],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "35%",
              },
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    position: "bottom",
                    offsetX: -10,
                    offsetY: 0,
                  },
                },
              },
            ],
            xaxis: {
              categories: monthsArray,
              title: {
                text: "Months",
              },
            },
            fill: {
              opacity: 1,
            },
            legend: {
              position: "bottom",
              offsetX: 0,
              offsetY: 0,
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

  getInvoicesIssuedDatewise(event: any) {

    this.isLoading = true

    this.year = this.invoiceParametersForm.controls.year.value;
    this.month = this.invoiceParametersForm.controls.month.value;
    const dateWiseInvoicesMetrics = new Array();
    const dateWiseInvoicesData = new Array();

    this.staticsService
      .getInvoicesIssuedDatewiseStatics(this.year, this.month)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.dateWiseInvoicesArray = res;

          
          
          if(this.dateWiseInvoicesArray){
            this.isLoading = false
          }

          console.log("Date Wise Invoie", this.dateWiseInvoicesArray);

          for (let i = 0; i < this.dateWiseInvoicesArray.length; i++) {
            dateWiseInvoicesMetrics.push(
              this.dateWiseInvoicesArray[i].identity
            );
          }
          for (let i = 0; i < this.dateWiseInvoicesArray.length; i++) {
            dateWiseInvoicesData.push(
              this.dateWiseInvoicesArray[i].invoiceno_no
            );
          }

          this.barChartOptions = {
            series: [
              {
                name: "Specific Date Invoice",
                data: dateWiseInvoicesData,
              },
            ],
            chart: {
              type: "bar",
              height: 350,
              stacked: false,
              stackType: "100%",
              foreColor: "#9aa0ac",
            },
            colors: ["#674EC9", "#C1C1C1"],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "35%",
              },
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    position: "bottom",
                    offsetX: -10,
                    offsetY: 0,
                  },
                },
              },
            ],
            xaxis: {
              categories: dateWiseInvoicesMetrics,
              title: {
                text: "Date",
              },
            },
            fill: {
              opacity: 1,
            },
            legend: {
              position: "bottom",
              offsetX: 0,
              offsetY: 0,
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

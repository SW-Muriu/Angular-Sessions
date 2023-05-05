import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexLegend,
  ApexResponsive,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { StaticsService } from "src/app/user/data/services/dashboard/statics.service";
import { takeUntil } from "rxjs";

export type ChartOptions = {
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
  selector: "app-withholding-collected",
  templateUrl: "./withholding-collected.component.html",
  styleUrls: ["./withholding-collected.component.sass"],
})
export class WithholdingCollectedComponent
  extends BaseComponent
  implements OnInit
{
  public areaChartOptions: Partial<ChartOptions>;
  public barChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;

  incomeWithHoldingArray: any[] = [];
  incomeWithHoldingMetrics: any[] = [];
  incomeWithHoldingData: any[] = [];
  vatWithHoldingArray: any[] = [];
  vatWithHoldingMetrics: any[] = [];
  vatWithHoldingData: any[] = [];
  valueAddedTaxParametersForm: FormGroup;
  incomeWithHoldingTaxParametersForm: FormGroup;
  year: any;

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
  isLoading: boolean = true;

  constructor(
    private statisticsService: StaticsService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.getIncomeWithHoldingYears();

    this.getYearlyIncomeWithHoldingTaxSummarry();

    this.incomeWithHoldingTaxParametersForm =
      this.createIncomeWithHoldingParametersForm();
  }

  createIncomeWithHoldingParametersForm() {
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
      this.getYearlyIncomeWithHoldingTaxSummarry();
    }
    if (event.value == "Month-wise") {
      this.needYear = true;
      this.needMonth = false;
      let year = new Date().getFullYear();
      console.log(year);

      this.getTotalMonthlyIncomeWithHoldingSummary(year);
    }
    if (event.value == "Date-wise") {
      this.needYear = false;
      this.needMonth = true;
      let year = new Date().getFullYear();

      this.getTotalDateWiseIncomeWithHoldingSummary(year);
    }
  }

  getIncomeWithHoldingYears() {
    this.isLoading = true
    this.statisticsService
      .getIncomeWithHoldingTaxPerYearStatistics()
      .pipe(takeUntil(this.subject))
      .subscribe((res) => {
        this.incomeWithHoldingArray = res;

        if(this.incomeWithHoldingArray){
          this.isLoading = false;
        }

        console.log("incomeWithHoldingMetrics ", this.incomeWithHoldingArray);

        for (let i = 0; i < this.incomeWithHoldingArray.length; i++) {
          this.incomeWithHoldingMetrics.push(
            parseInt(this.incomeWithHoldingArray[i].identity)
          );
        }

        console.log("incomeWithHoldingMetrics ", this.incomeWithHoldingMetrics);
      });
  }

  getYearlyIncomeWithHoldingTaxSummarry() {
    this.isLoading = true
    let incomeWithHoldingArray: any[] = [];
    const incomeWithHoldingData: any[] = [];
    const incomeWithHoldingMetrics: any[] = [];

    this.statisticsService
      .getIncomeWithHoldingTaxPerYearStatistics()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          incomeWithHoldingArray = res;

          if(incomeWithHoldingArray){
            this.isLoading = false
          }

          for (let i = 0; i < incomeWithHoldingArray.length; i++) {
            incomeWithHoldingMetrics.push(incomeWithHoldingArray[i].identity);
          }

          for (let i = 0; i < incomeWithHoldingArray.length; i++) {
            incomeWithHoldingData.push(
              incomeWithHoldingArray[i].total_iwtAmount
            );
          }

          this.lineChartOptions = {
            series: [
              {
                name: "Income WithHolding Tax",
                data: incomeWithHoldingData,
              },
            ],
            chart: {
              height: 350,
              type: "line",
              foreColor: "#9aa0ac",
              dropShadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
              },
              toolbar: {
                show: false,
              },
            },
            colors: ["#A5A5A5", "#875692", "#4CB5AC"],
            stroke: {
              curve: "smooth",
            },
            grid: {
              row: {
                colors: ["transparent", "transparent"],
                opacity: 0.5,
              },
            },
            markers: {
              size: 3,
            },
            xaxis: {
              categories: incomeWithHoldingMetrics,
              title: {
                text: "Year",
              },
            },
            yaxis: {
              title: {
                text: "Income WithHolding Tax",
              },
            },
            legend: {
              position: "top",
              horizontalAlign: "right",
              floating: true,
              offsetY: -25,
              offsetX: -5,
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

  getTotalMonthlyIncomeWithHoldingSummary(event: any) {
    this.isLoading = true
    let incomeWithHoldingArray: any[] = [];
    const incomeWithHoldingData: any[] = [];
    const incomeWithHoldingMetrics: any[] = [];

    this.year = this.incomeWithHoldingTaxParametersForm.controls.year.value;

    this.statisticsService
      .getIncomeWithHoldingTaxPerMonthStatistics(this.year)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.incomeWithHoldingArray = res;
          incomeWithHoldingArray = res;

          if(incomeWithHoldingArray){
            this.isLoading = false;
          }

          for (let i = 0; i < incomeWithHoldingArray.length; i++) {
            incomeWithHoldingMetrics.push(incomeWithHoldingArray[i].identity);
          }
          for (let i = 0; i < incomeWithHoldingArray.length; i++) {
            incomeWithHoldingData.push(
              incomeWithHoldingArray[i].total_iwtAmount
            );
          }

          this.lineChartOptions = {
            series: [
              {
                name: "Income WithHolding Tax",
                data: incomeWithHoldingData,
              },
            ],
            chart: {
              height: 350,
              type: "line",
              foreColor: "#9aa0ac",
              dropShadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
              },
              toolbar: {
                show: false,
              },
            },
            colors: ["#A5A5A5", "#875692", "#4CB5AC"],
            stroke: {
              curve: "smooth",
            },
            grid: {
              row: {
                colors: ["transparent", "transparent"],
                opacity: 0.5,
              },
            },
            markers: {
              size: 3,
            },
            xaxis: {
              categories: incomeWithHoldingMetrics,
              title: {
                text: "Month",
              },
            },
            yaxis: {
              title: {
                text: "Income WithHolding Tax",
              },
            },
            legend: {
              position: "top",
              horizontalAlign: "right",
              floating: true,
              offsetY: -25,
              offsetX: -5,
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

  getTotalDateWiseIncomeWithHoldingSummary(event: any) {
    this.isLoading = true
    let incomeWithHoldingArray: any[] = [];
    const incomeWithHoldingData: any[] = [];
    const incomeWithHoldingMetrics: any[] = [];

    this.year = this.incomeWithHoldingTaxParametersForm.controls.year.value;
    this.month = this.incomeWithHoldingTaxParametersForm.controls.month.value;

    console.log(
      "IWT Param",
      this.incomeWithHoldingTaxParametersForm.controls.year.value
    );
    console.log(
      "IWT Param",
      this.incomeWithHoldingTaxParametersForm.controls.month.value
    );

    this.statisticsService
      .getIncomeWithHoldingTaxPerDayStatics(this.year, this.month)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.incomeWithHoldingArray = res;
          incomeWithHoldingArray = res;

          if(incomeWithHoldingArray){
            this.isLoading = false;
          }

          for (let i = 0; i < incomeWithHoldingArray.length; i++) {
            incomeWithHoldingMetrics.push(incomeWithHoldingArray[i].identity);
          }
          for (let i = 0; i < incomeWithHoldingArray.length; i++) {
            incomeWithHoldingData.push(incomeWithHoldingArray[i].total_iwt);
          }

          this.lineChartOptions = {
            series: [
              {
                name: "Income WithHolding Tax",
                data: incomeWithHoldingData,
              },
            ],
            chart: {
              height: 350,
              type: "line",
              foreColor: "#9aa0ac",
              dropShadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
              },
              toolbar: {
                show: false,
              },
            },
            colors: ["#A5A5A5", "#875692", "#4CB5AC"],
            stroke: {
              curve: "smooth",
            },
            grid: {
              row: {
                colors: ["transparent", "transparent"],
                opacity: 0.5,
              },
            },
            markers: {
              size: 3,
            },
            xaxis: {
              categories: incomeWithHoldingMetrics,
              title: {
                text: "Date",
              },
            },
            yaxis: {
              title: {
                text: "Income WithHolding Tax",
              },
            },
            legend: {
              position: "top",
              horizontalAlign: "right",
              floating: true,
              offsetY: -25,
              offsetX: -5,
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

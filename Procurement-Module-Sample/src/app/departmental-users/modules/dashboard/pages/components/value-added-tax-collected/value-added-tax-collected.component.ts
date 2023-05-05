import { Component, OnInit } from "@angular/core";
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
  selector: "app-value-added-tax-collected",
  templateUrl: "./value-added-tax-collected.component.html",
  styleUrls: ["./value-added-tax-collected.component.sass"],
})
export class ValueAddedTaxCollectedComponent
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
  isLoading: boolean = false;

  constructor(
    private statisticsService: StaticsService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.getValueAddedTaxYears();

    this.getYearlyCollectedVatWithHoldingAmount();

    this.valueAddedTaxParametersForm = this.createValueAddedTaxParamtersForm();
  }

  createValueAddedTaxParamtersForm() {
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
      this.getYearlyCollectedVatWithHoldingAmount();
    }
    if (event.value == "Month-wise") {
      this.poneedYear = true;
      this.poneedMonth = false;
      let year = new Date().getFullYear();
      console.log(year);

      this.getTotalMonthlyValuedAddedTaxSummarry(year);
    }
    if (event.value == "Date-wise") {
      this.poneedYear = false;
      this.poneedMonth = true;
      let year = new Date().getFullYear();

      this.getTotalDateWiseValueAddedTaxSummarry(year);
    }
  }

  getValueAddedTaxYears() {
    this.isLoading = true
    this.statisticsService
      .getValueAddedTaxPerYearStatics()
      .pipe(takeUntil(this.subject))
      .subscribe((res) => {
        this.vatWithHoldingArray = res;

        if(this.vatWithHoldingArray){
          this.isLoading = false
        }

        for (let i = 0; i < this.vatWithHoldingArray.length; i++) {
          this.vatWithHoldingMetrics.push(this.vatWithHoldingArray[i].identity);
        }
      });
  }

  getYearlyCollectedVatWithHoldingAmount() {
    this.isLoading = true;
    let vatWithHoldingArray: any[] = [];
    const vatWithHoldingMetrics: any[] = [];
    const vatWithHoldingData: any[] = [];

    this.statisticsService
      .getValueAddedTaxPerYearStatics()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          vatWithHoldingArray = res;

          if(vatWithHoldingArray){
            this.isLoading = false
          }

          for (let i = 0; i < vatWithHoldingArray.length; i++) {
            vatWithHoldingMetrics.push(vatWithHoldingArray[i].identity);
          }
          for (let i = 0; i < vatWithHoldingArray.length; i++) {
            vatWithHoldingData.push(vatWithHoldingArray[i].total_vatAmount);
          }

          this.barChartOptions = {
            series: [
              {
                name: "Value Added Tax",
                data: vatWithHoldingData,
              },
            ],
            chart: {
              type: "bar",
              height: 350,
              foreColor: "#9aa0ac",
              toolbar: {
                show: false,
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
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "30%",
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              type: "category",
              categories: vatWithHoldingMetrics,
              title: {
                text: "Years",
              },
            },
            yaxis: {
              title: {
                text: "VAlue Added Tax",
              },
            },
            legend: {
              show: false,
            },
            fill: {
              opacity: 0.8,
              colors: ["#01B8AA", "#374649", "#FD625E", "#F2C80F"],
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

  getTotalMonthlyValuedAddedTaxSummarry(event: any) {
    this.isLoading = true;
    let vatWithHoldingArray: any[] = [];
    const vatWithHoldingMetrics: any[] = [];
    const vatWithHoldingData: any[] = [];

    this.year = this.valueAddedTaxParametersForm.controls.year.value;

    this.statisticsService
      .getTotalValueAddedTaxPerMonthStatistics(this.year)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.vatWithHoldingArray = res;

          if(vatWithHoldingArray){
            this.isLoading = false;
          }

          vatWithHoldingArray = res;

          for (let i = 0; i < vatWithHoldingArray.length; i++) {
            vatWithHoldingMetrics.push(vatWithHoldingArray[i].identity);
          }
          for (let i = 0; i < vatWithHoldingArray.length; i++) {
            vatWithHoldingData.push(vatWithHoldingArray[i].total_vatAmount);
          }

          this.barChartOptions = {
            series: [
              {
                name: "Value Added Tax",
                data: vatWithHoldingData,
              },
            ],
            chart: {
              type: "bar",
              height: 350,
              foreColor: "#9aa0ac",
              toolbar: {
                show: false,
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
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "30%",
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              type: "category",
              categories: vatWithHoldingMetrics,
              title: {
                text: "Months",
              },
            },
            legend: {
              show: false,
            },
            fill: {
              opacity: 0.8,
              colors: ["#01B8AA", "#374649", "#FD625E", "#F2C80F"],
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

  getTotalDateWiseValueAddedTaxSummarry(event: any) {
    this.isLoading = true;
    let vatWithHoldingArray: any[] = [];
    const vatWithHoldingMetrics: any[] = [];
    const vatWithHoldingData: any[] = [];

    this.year = this.valueAddedTaxParametersForm.controls.year.value;
    this.month = this.valueAddedTaxParametersForm.controls.month.value;

    this.statisticsService
      .getTotalValueAddedTaxAmountDateWiseStatistics(this.year, this.month)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          vatWithHoldingArray = res;

          if(vatWithHoldingArray){
            this.isLoading = false
          }

          for (let i = 0; i < vatWithHoldingArray.length; i++) {
            vatWithHoldingMetrics.push(vatWithHoldingArray[i].identity);
          }
          for (let i = 0; i < vatWithHoldingArray.length; i++) {
            vatWithHoldingData.push(vatWithHoldingArray[i].total_vat);
          }

          this.barChartOptions = {
            series: [
              {
                name: "VAT Collected Per Year",
                data: vatWithHoldingData,
              },
            ],
            chart: {
              type: "bar",
              height: 350,
              foreColor: "#9aa0ac",
              toolbar: {
                show: false,
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
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "30%",
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              type: "category",
              categories: vatWithHoldingMetrics,
              title: {
                text: "Date",
              },
            },
            legend: {
              show: false,
            },
            fill: {
              opacity: 0.8,
              colors: ["#01B8AA", "#374649", "#FD625E", "#F2C80F"],
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

import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexFill,
  ApexTooltip,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

declare const ApexCharts: any;

@Component({
  selector: 'app-general-payments',
  templateUrl: './general-payments.component.html',
  styleUrls: ['./general-payments.component.sass']
})
export class GeneralPaymentsComponent implements OnInit {
  @ViewChild("chart", { static: true }) chart: ChartComponent;
  // public barChartOptions: any;
  public barChartOptions: Partial<ChartOptions>;
  public barChart2Options: any;
  public lineChart2Options: any;
  public lineColumnChartOptions: any;
  public areaChartOptions: any;
  public pieChartOptions: any;
  public radarChartOptions: any;

  constructor() { }

  ngOnInit(): void {
    this.chart4();
  }

  public lineChartOptions = {
    responsive: true,
    tooltips: {
      mode: "index",
      titleFontSize: 12,
      titleFontColor: "#000",
      bodyFontColor: "#000",
      backgroundColor: "#fff",
      titleFontFamily: "Poppins",
      bodyFontFamily: "Poppins",
      cornerRadius: 3,
      intersect: false,
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: true,
        fontFamily: "Poppins",
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          scaleLabel: {
            display: false,
            labelString: "Month",
          },
          ticks: {
            fontFamily: "Poppins",
            fontColor: "#9aa0ac", // Font Color
          },
        },
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          scaleLabel: {
            display: true,
            labelString: "Value",
            fontFamily: "Poppins",
          },
          ticks: {
            fontFamily: "Poppins",
            fontColor: "#9aa0ac", // Font Color
          },
        },
      ],
    },
    title: {
      display: false,
      text: "Normal Legend",
    },
  };
  lineChartData = [
    {
      label: "Cost Centers",
      data: [0, 50, 40, 80, 40, 79, 120],
      backgroundColor: "transparent",
      borderColor: "#f96332",
      borderWidth: 2,
      pointStyle: "circle",
      pointRadius: 3,
      pointBorderColor: "transparent",
      pointBackgroundColor: "#f96332",
    },
  ];

  lineChartLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "sun"];

  private chart4() {
    this.lineChart2Options = {
      chart: {
        height: 350,
        type: "line",
        shadow: {
          enabled: false,
          color: "#bbb",
          top: 3,
          left: 2,
          blur: 3,
          opacity: 1,
        },
        foreColor: "#9aa0ac",
      },
      stroke: {
        width: 7,
        curve: "smooth",
      },
      series: [
        {
          name: "Likes",
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
        },
      ],
      xaxis: {
        type: "datetime",
        categories: [
          "1/11/2000",
          "2/11/2000",
          "3/11/2000",
          "4/11/2000",
          "5/11/2000",
          "6/11/2000",
          "7/11/2000",
          "8/11/2000",
          "9/11/2000",
          "10/11/2000",
          "11/11/2000",
          "12/11/2000",
          "1/11/2001",
          "2/11/2001",
          "3/11/2001",
          "4/11/2001",
          "5/11/2001",
          "6/11/2001",
        ],
        labels: {
          style: {
            colors: "#9aa0ac",
          },
        },
      },
      title: {
        text: "Cost centers",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 4,
        opacity: 0.9,
        colors: ["#FFA41B"],
        strokeColor: "#fff",
        strokeWidth: 2,

        hover: {
          size: 7,
        },
      },
      yaxis: {
        min: -10,
        max: 40,
        title: {
          text: "Engagement",
        },
        labels: {
          style: {
            color: "#9aa0ac",
          },
        },
      },
    };
  }
}

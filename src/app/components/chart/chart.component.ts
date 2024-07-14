import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { createChart, IChartApi, ISeriesApi, LineData } from 'lightweight-charts';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  private chart: IChartApi | undefined;
  private resizeObserver: ResizeObserver;

  constructor(private _HomeComponent:HomeComponent) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target.id === 'chart-container' && this.chart) {
          const { width, height } = entry.contentRect;
          this.chart.resize(width, height);
        }
      }
    });
  }
  /* chart */
  ngAfterViewInit(): void {
    this.createChart();
    const chartContainer = document.getElementById('chart-container');
    if (chartContainer) {
      this.resizeObserver.observe(chartContainer);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }
  
  private createChart(): void {
    const chartElement = document.getElementById('chart');
    if (!chartElement) return;
    this.chart = createChart(chartElement, {
      width: chartElement.clientWidth,
      height: chartElement.clientHeight,
      layout: {
        textColor: '#000000',
      },
      grid: {
        vertLines: {
          color: '#e0e0e0',
        },
        horzLines: {
          color: '#e0e0e0',
        },
      },
      crosshair: {
        mode: 1, // CrosshairMode.Normal
      },
      rightPriceScale: {
        borderColor: '#e0e0e0',
      },
      timeScale: {
        borderColor: '#e0e0e0',
      },
    });

    const areaSeries = this.chart.addAreaSeries({
      topColor: 'rgba(67, 83, 254, 0.7)',
      bottomColor: 'rgba(67, 83, 254, 0.3)',
      lineColor: 'rgba(67, 83, 254, 1)',
      lineWidth: 4,
    });
    areaSeries.setData([
      { time: '2023-01-01', value: 100 },
      { time: '2023-02-01', value: 120 },
      { time: '2023-03-01', value: 140 },
      { time: '2023-04-01', value: 130 },
      { time: '2023-05-01', value: 150 },
      { time: '2023-06-01', value: 170 },
      { time: '2023-07-01', value: 180 },
      { time: '2023-08-01', value: 190 },
      { time: '2023-09-01', value: 200 },
      { time: '2023-10-01', value: 160 },
      { time: '2023-11-01', value: 120 },
      { time: '2023-12-01', value: 160 },
      { time: '2024-01-01', value: 160 },
      { time: '2024-02-01', value: 160 },
    ]);
  }
}

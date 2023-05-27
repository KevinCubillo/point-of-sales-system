import { Component, OnInit } from '@angular/core';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SoldProductService } from 'src/app/services/sold-product.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public monthUtility: number = 0;
  public anualUtilities: number = 0;
  public goal: number = 0;
  
  month: string[] = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Nobiembre', 'Diciembre'];
  labels: string[] = [];
  SalesByMonth: number[] = [];
  ExpensesByMonth: number[] = [];

  pieLabels: string[] = [];
  pieData: number[] = [];

  roundedGoal = this.goal.toFixed(2);

  // Establecer el valor redondeado en el atributo `style`
  divStyle = { width: `${this.roundedGoal}%` };


  constructor(private soldProduct: SoldProductService){}

  ngOnInit(): void {
    this.loadSalesByMonth();
    this.loadMostSaleProduct();
    this.loadUtility();
    this.loadMonthUtility();

  }
  

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
    
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: this.labels,
    datasets: [
      { data: this.SalesByMonth, label: 'Ventas', backgroundColor: '#58E08A' },
      { data: this.ExpensesByMonth, label: 'Gatos', backgroundColor: '#98A1EA' }
    ]
  };


  public lineChartType: ChartType = 'line';
  public lineChartData: ChartData<'line'> = {
    labels: this.labels,
    datasets: [
      { data:this.SalesByMonth, label: 'Ventas', backgroundColor: '#58E08A' },
      { data: this.ExpensesByMonth, label: 'Gatos', backgroundColor: '#98A1EA' }
    ]
  };


  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.pieLabels,
    datasets: [ {
      data: this.pieData,
      backgroundColor: [ '#F5A9A9', '#F4E067', '#71C3DB' ]
    } ]
  };

  loadSalesByMonth() {
    this.soldProduct.getSalesByMonth().subscribe((res: any) => {
      this.SalesByMonth = [];
      this.ExpensesByMonth = [];
      this.labels = [];

      for (let i = 0; i < res.length; i++) {
        this.labels.push(this.month[res[i].month]);
        this.SalesByMonth.push(res[i].total);
        let iva:number = res[i].total * 0.13;
        let costo:number = res[i].total * 0.3;
        this.ExpensesByMonth.push(res[i].total - iva - costo);
      }
  
      this.barChartData = {
        labels: this.labels,
        datasets: [
          { data: this.SalesByMonth, label: 'Ventas', backgroundColor: '#58E08A' },
          { data: this.ExpensesByMonth, label: 'Gastos', backgroundColor: '#98A1EA' }
        ]
      };

      this.lineChartData = {
        labels: this.labels,
        datasets: [
          { data: this.SalesByMonth, label: 'Ventas', backgroundColor: '#58E08A' },
          { data: this.ExpensesByMonth, label: 'Gastos', backgroundColor: '#98A1EA' }
        ]
      };
    });
  }

  loadMostSaleProduct() {
    this.soldProduct.getMostSoldProducts().subscribe((res: any) => {
      this.pieLabels = [];
      this.pieData = [];

      for (let i = 0; i < res.length; i++) {
        this.pieLabels.push(res[i].descripcion);
        this.pieData.push(res[i].totalCantidad);
      }

      this.pieChartData = {
        labels: this.pieLabels,
        datasets: [ {
          data: this.pieData,
          backgroundColor: [ '#F5A9A9', '#F4E067', '#71C3DB' ]
        } ] 
      };
    });
  }

  loadUtility() {
    this.soldProduct.getSumSoldProducts().subscribe((res: any) => {
      console.log(res);
      this.anualUtilities = res.total.toFixed(2);
      this.goal = res.total * 100 / 500000;
    });
  }

  loadMonthUtility() {
    this.soldProduct.getSumSoldProductsByMonth().subscribe((res: any) => {
      this.monthUtility = res[0].total.toFixed(2);
    });
  }

  
  


}



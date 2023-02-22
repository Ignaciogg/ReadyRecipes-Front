import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  miTexto: string = "Pablo";
  textoVisible: boolean = true;
  frutas = [
    { nombre: "Pera", color: "Verde" },
    { nombre: "Manzana", color: "Roja" },
  ];
  ngOnInit(): void {
    console.log("OnInit de HomeComponent");
  }
  alternarTexto(): void {
    this.textoVisible = !this.textoVisible;
  }
  nuevaFruta(): void {
    this.frutas.push({ nombre: "Plátano", color: "Amarillo" })
  }
}

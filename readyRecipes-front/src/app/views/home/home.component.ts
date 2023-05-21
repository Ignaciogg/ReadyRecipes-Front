import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

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

  constructor(
    private autenticacionService: AutenticacionService,
  ) { }

  ngOnInit(): void {
    this.autenticacionService.logout().subscribe();
  }
  alternarTexto(): void {
    this.textoVisible = !this.textoVisible;
  }
}

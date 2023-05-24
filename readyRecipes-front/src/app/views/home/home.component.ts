import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private autenticacionService: AutenticacionService,
  ) { }

  ngOnInit(): void {
    if(this.autenticacionService.getToken() == "") {
      this.autenticacionService.logout().subscribe();
    }
  }
}
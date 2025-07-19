import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-home',
  imports: [RouterModule, Sidebar,],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}

import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { PagesComponent } from "./pages/pages.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, PagesComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}

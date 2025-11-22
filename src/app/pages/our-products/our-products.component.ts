import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.scss']
})
export class OurProductsComponent implements OnInit {
  activeTab = 0;
  details: any;
  imageSource = "./assets/video/intro.mp4";


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.details = this.router.getCurrentNavigation()?.extras.state?.['details']  
      console.log("Product Details:", this.details); // Check state data

      this.activeTab = 0
    })
    
   }

  activateTab(index: number): void {
    console.log("Tab Activated:", index);
    this.activeTab = index;
  }
  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss']
})
export class IndustriesComponent implements OnInit {
  videoSource = "./assets/video/intro.mp4";
  activeTab = 0;
  details: any;



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
    console.log(index);
    this.activeTab = index;
  }

  ngOnInit(): void {
  }

}

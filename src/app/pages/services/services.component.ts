import { Component, OnInit } from "@angular/core";
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent implements OnInit {
  videoSource = "./assets/services/AI-video.mp4";
  details: any;
  activeTab = 0;



  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.activeTab=0
      this.details = this.router.getCurrentNavigation()?.extras.state?.['details']  
    })
  }


  activateTab(index: number): void {
    console.log(index);
    this.activeTab = index;
  }

  ngOnInit(): void {}
}

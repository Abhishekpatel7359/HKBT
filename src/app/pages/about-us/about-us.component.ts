import { Component } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { TeamModalComponent } from 'src/app/component/team-modal/team-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  team: any = [];
  teamLimited: any = [];  // Holds the first two items for display
  modalData: any;
  data: any;
  desc: any;
  videoSource = "./assets/video/intro.mp4";


  constructor(
    private modalService: NgbModal,
    private serviceProvider: CommonserviceService,
    public translate: TranslateService
  ) {}

  async getteamList() {
    const language = localStorage.getItem("lang");
    const url = language === "en" ? '../assets/json/team/team.json' : '../assets/json/team/team_ar.json';

    this.serviceProvider.getWebService(url).subscribe({
      next: (response: any) => {
        this.team = response;
        this.teamLimited = this.team.slice(0, 2);  // Get only the first two items
        console.log("totta team is==",this.teamLimited);

        // Example of description length calculation, if required
        this.desc = this.team.map((item: any) => {
          return item.description ? item.description.length : 0;
        });
        console.log("Description length", this.desc);
      },
      error: (error: any) => {
        console.error("Error fetching team data:", error);
      }
    });
  }

  presentModal(item: any) {
    this.modalData = this.modalService.open(TeamModalComponent, {
      fullscreen: true,
      animation: true,
      scrollable: true,
    });
    this.modalData.componentInstance.teamDetails = item;
    console.log("item iss",item);
   
  }

  async ngOnInit() {
    await this.getteamList();
  }
}

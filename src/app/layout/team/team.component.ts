import { Component } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { TeamModalComponent } from 'src/app/component/team-modal/team-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ["./team.component.scss"]
})
export class TeamComponent {

  team: any;
  modalData: any;
  data:any
  desc:any

  constructor(
    private modalService: NgbModal,
    private serviceProvider: CommonserviceService,
    public translate:TranslateService
  ) { 

    
  }
// total(){
//   this.modalData.componentInstance.teamDetails = this.data;
//   const title=this.data.description;
//   console.log("description is",title);
//   title.map((allData:any)=>{
//     console.log("length of data",allData.length);
//   }
// )
// }

  async getteamList() {
    const language = localStorage.getItem("lang")
    if (language == "en") {
      const url = '../assets/json/team/team.json'
      this.serviceProvider.getWebService(url).subscribe({
        next: async (response: any) => {
          this.team = response;
          // console.log(response)
        }
      })
    }else{
      const url = '../assets/json/team/team_ar.json'
      this.serviceProvider.getWebService(url).subscribe({
        next: async (response: any) => {
          this.team = response;
          console.log("responce is",this.team);

          // const title=this.team.description;
          // console.log("description is",title);
          this.desc= this.team.map((item:any)=>{
            if(item.description && item.description.length>0){
              return item.description.length;
            }
            return 0;
          }
          )
          console.log("description lenght",this.desc);
        }
      })
    }
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
    await this.getteamList()
    // await this.total();
    
   

  }


}

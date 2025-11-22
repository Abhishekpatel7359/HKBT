import { Component,OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  language: any = null;

  constructor(public translate:TranslateService){

  }

  async ngOnInit() {
    this.language = localStorage.getItem('lang');
    console.log('Language=============', this.language);

    if (this.language  === 'ar') {
      $(".partner-image").css("margin", "0px 39%");
    } else{
     

    }

}
}
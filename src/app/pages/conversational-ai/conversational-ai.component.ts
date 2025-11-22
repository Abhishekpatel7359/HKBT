import { Component } from '@angular/core';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { TranslateService } from "@ngx-translate/core";
import { EmailService } from "src/app/service/email-service";

@Component({
  selector: 'app-conversational-ai',
  templateUrl: './conversational-ai.component.html',
  styleUrls: ['./conversational-ai.component.scss']
})
export class ConversationalAiComponent {

  aiDetail:any;
  activeTab = 0;
  caseStudyPage= 'AI';

  emailValid =/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,25})$/;

  contactForm = {
    username: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    country: "",
    today: "",
    achieve:'',
    launch:'',
    budget: ''
    };
    
    inquires = [
      { name: "Client Opportunities", id: "1" },
      { name: "Partners Opportunities", id: "2" },
    ];

  constructor(
    private serviceProvider: CommonserviceService,
    public translate: TranslateService,
    private emailService: EmailService,
  ) {}

  async getaiDetail(){
    const url ='../assets/json/conversational-ai/conversational-ai.json'
    this.serviceProvider.getWebService(url).subscribe({
      next: async (response: any) => {
        this.aiDetail = response;
        // console.log(response)
      }
      })
  }

  
  activateTab(index: number): void {
    console.log(index);
    this.activeTab = index;
  }

  async sendEmail() {
    const emailData = {
      to: "info@hkbt.tech",
      subject: "Book a demo",
      name: this.contactForm.username,
      email: this.contactForm.email,
      phoneNumber: this.contactForm.phoneNumber,
      firstName: this.contactForm.firstName,
      lastName: this.contactForm.lastName,
      country: this.contactForm.country,
      lookingToday: this.contactForm.today,
      achieve: this.contactForm.achieve,
      launch: this.contactForm.launch,
      budget: this.contactForm.budget,
    };

    this.emailService.sendEmail(emailData).subscribe((response) => {
      this.contactForm = {
        username: "",
        email: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        country: "",
        today: "",
        achieve:'',
        launch:'',
        budget: ''
      };
    });
  }

  async ngOnInit() {
    await this.getaiDetail()
    }
  

}

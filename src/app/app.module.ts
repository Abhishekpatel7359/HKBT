import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CountUpModule } from 'ngx-countup';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HttpBackend } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoaderComponent } from './component/loader/loader.component';
import { FooterComponent } from './layout/footer/footer.component';
import { IndustriesComponent } from './pages/industries/industries.component';
import { TeamModalComponent } from './component/team-modal/team-modal.component';
import { TeamComponent } from './layout/team/team.component';
import { NewsComponent } from './layout/news/news.component';
import { BlogComponent } from './layout/blog/blog.component';
import { BlogDescriptionComponent } from './layout/blog-description/blog-description.component';
import { SmartCityComponent } from './pages/smart-city/smart-city.component';
import { PartnersComponent } from './layout/partners/partners.component';
import { CaseStudyComponent } from './layout/case-study/case-study.component';
import { ScrollTopComponent } from './component/scroll-top/scroll-top.component';
import { ConversationalAiComponent } from './pages/conversational-ai/conversational-ai.component';
import { TypewritterDirective } from './dirrective/typewritter.directive';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { OurProductsComponent } from './pages/our-products/our-products.component';
import { ProductModalComponent } from './component/product-modal/product-modal.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer'; // Import the module
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfFlipbookComponent } from './pages/pdf-flipbook/pdf-flipbook.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';







export function createTranslateLoader(handler: HttpBackend) {
  const http = new HttpClient(handler);
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    
    routingComponents,
    HeaderComponent,
    HomeComponent,
    LoaderComponent,
    FooterComponent,
    IndustriesComponent,
    TeamModalComponent,
    TeamComponent,
    NewsComponent,
    BlogComponent,
    BlogDescriptionComponent,
    SmartCityComponent,
    PartnersComponent,
    CaseStudyComponent,
    ScrollTopComponent,
    ConversationalAiComponent,
    TypewritterDirective,
    AboutUsComponent,
    OurProductsComponent,
    ProductModalComponent,
    PdfFlipbookComponent,
    
    

    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CountUpModule,
    NgxExtendedPdfViewerModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpBackend],
      },
    }),
    LoadingBarModule,
    BrowserAnimationsModule ,
    PdfViewerModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

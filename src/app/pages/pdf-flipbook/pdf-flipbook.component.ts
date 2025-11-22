import { Component, AfterViewInit,ChangeDetectorRef } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


declare var $: any; // jQuery for Turn.js

@Component({
  selector: 'app-pdf-flipbook',
  templateUrl: './pdf-flipbook.component.html',
  // styleUrls: ['./pdf-flipbook.component.css']
})
export class PdfFlipbookComponent implements AfterViewInit {
  pdfSrc = '/assets/video/hkb_pdf.pdf'; 
  totalPages: number = 0;
  flipbook: any;
  currentPage: number = 1;  // Track the current page


  constructor(private cdr: ChangeDetectorRef, 
   ) {}



  ngAfterViewInit(): void {
    // Set up PDF.js worker source
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    this.loadPdfPages();
  }

  async loadPdfPages(): Promise<void> {
    try {
      const loadingTask = pdfjsLib.getDocument(this.pdfSrc);
      const pdf = await loadingTask.promise;

      // Get the total number of pages in the PDF
      this.totalPages = pdf.numPages;
      console.log('Total number of pages:', this.totalPages);

      this.flipbook = document.getElementById('pdf-flipbook');
 for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        // Get the viewport for rendering
        const viewport = page.getViewport({ scale: 1.5 });

        // Convert PDF page to an image
        const imageData = await this.pageToImage(page, viewport);

        // Create an image element and add it to the flipbook
        const imgElement = document.createElement('img');
        imgElement.src = imageData;  // Set image source as the image data
        imgElement.classList.add('page');
        imgElement.style.width = '1000px';  // Adjust as necessary
        imgElement.style.height = '400px';  // Adjust as necessary

        this.flipbook?.appendChild(imgElement);
      }

      // Initialize Turn.js after pages are loaded
      $(this.flipbook).turn({
        width: "1200",
        height: 400,
        autoCenter: true,
      });
      this.cdr.detectChanges(); // Trigger change detection after loading pages


    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }

  async pageToImage(page: any, viewport: any): Promise<string> {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Canvas context not available');
    }

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render the page on the canvas
    await page.render({ canvasContext: context, viewport }).promise;

    // Convert the canvas to an image (base64)
    return canvas.toDataURL('image/png');
  }

  nextPage(): void {
    if (this.currentPage < 7 ) {
      $(this.flipbook).turn('next');
      this.currentPage++;
      this.cdr.detectChanges(); // Ensure Angular updates the view

    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      $(this.flipbook).turn('previous');
      this.currentPage--;
    }
  }
  dismiss(){
    
  }

  
}

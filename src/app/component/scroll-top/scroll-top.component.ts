import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-scroll-top",
  templateUrl: "./scroll-top.component.html",
  styleUrls: ["./scroll-top.component.scss"],
})
export class ScrollTopComponent {
  contentScrollPos = 0;

  @HostListener("window:scroll")
  checkScroll() {
    const scrollPosition =
      window.scrollY  || document.documentElement.scrollTop;
    this.contentScrollPos = scrollPosition;
  }

  scrollToTop() {
    let currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      // window.requestAnimationFrame();
      window.scrollTo({ top: 0, behavior: "smooth" });

      console.debug("Scroll Event", window.pageYOffset);
    }
  }
}

import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {} from './auth/components/register/register.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'restaurant-frontend-app';
  isDark = false;

  ngOnInit() {
    const style = document.createElement('style');
    style.id = 'dark-mode-styles';
    document.head.appendChild(style);
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
    const styleEl = document.getElementById('dark-mode-styles');
    
    if (this.isDark) {
      // Збільшуємо інверсію до 0.95: фон стає глибшим темним, а звичайний текст — яскраво-білим
      document.documentElement.style.filter = 'invert(0.95) hue-rotate(180deg)';
      document.documentElement.style.backgroundColor = '#121212';
      
      if (styleEl) {
        // Виключаємо логотипи з "захисту", щоб їхній чорний текст ставав білим
        styleEl.innerHTML = `
          /* Захищаємо фотографії страв, але пропускаємо зображення, у яких в назві чи класі є слово logo */
          img:not(.logo):not([src*="logo" i]):not([alt*="logo" i]), 
          picture, 
          video, 
          [style*="background-image"]:not(.logo), 
          .bg-image { 
            filter: invert(1) hue-rotate(180deg) contrast(1.1) !important; 
          }

          /* Якщо десь жорстко прописані світлі кольори тексту, трохи підтягуємо їхню яскравість */
          h1, h2, h3, h4, h5, h6, p, span, a, label, div {
            text-shadow: 0 0.5px 1px rgba(255, 255, 255, 0.15);
          }
        `;
      }
    } else {
      document.documentElement.style.filter = 'none';
      document.documentElement.style.backgroundColor = '#fff';
      if (styleEl) {
        styleEl.innerHTML = '';
      }
    }
  }

  // constructor(private reportService: ReportsService) { ... }
}
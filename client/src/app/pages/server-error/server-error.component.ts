import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [],
  templateUrl: './server-error.component.html',
})
export class ServerErrorComponent {
  private navigation = inject(Router).getCurrentNavigation();
  error: any = this.navigation?.extras?.state?.['error'];
}

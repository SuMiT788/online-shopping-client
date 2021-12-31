import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  currentTab: string = 'products';
  constructor() {
    console.log('-> current tab:', this.currentTab);
  }

  changeTab(tabName: string) {
    this.currentTab = tabName;
  }
}

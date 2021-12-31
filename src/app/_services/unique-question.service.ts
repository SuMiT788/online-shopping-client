import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AllUniqueQuestions } from '../_models/all-unique-questions.model';

@Injectable({
  providedIn: 'root',
})
export class UniqueQuestionService {
  allUniqueQuestions: AllUniqueQuestions = { AllUniqueQuestions: [] };

  constructor(private http: HttpClient) {
    this.getUniqueQuestions().subscribe(
      (res: any) => {
        this.allUniqueQuestions.AllUniqueQuestions = res.data;

        console.log('-> allUniqueQuestions:', this.allUniqueQuestions);
      },
      (err) => {
        console.log('-> error:', err);
      }
    );
  }

  getUniqueQuestions() {
    return this.http.get(environment.apiBaseUrl + '/getAllUniqueQuestions');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Checklist, ChecklistDetails } from '../model/checklist';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  http = inject(HttpClient);

  getChecklists() {
    return this.http.get<Checklist[]>('http://localhost:8000/checklists');
  }

  getChecklist(id: string) {
    return this.http.get<ChecklistDetails>(
      `http://localhost:8000/checklists/${id}?_embed=todos`
    );
  }

  addChecklist(checklist: Checklist) {
    return this.http.post<Checklist>(
      'http://localhost:8000/checklists',
      checklist
    );
  }

  deleteChecklist(id: string) {
    return this.http.delete(`http://localhost:8000/checklists/${id}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { BackOfficeService } from '../../core/Api/backOffice.service';
import { AdminFeedbacksList } from '../../core/Api/Model/AdminFeedbacksList';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AdminEditPopupComponent } from '../../shared/components/adminEditPopup/adminEditPopup.component';
import { AdminDeletePopupComponent } from '../../shared/components/adminDeletePopup/adminDeletePopup.component';

@Component({
  templateUrl: './feedbacks.component.html',
  styleUrls: ['../styles/admin-filter.scss']
})

// TODO Faire le tri par date (Datepicker)
// Clear subscription from all BackOffice Components
export class FeedbacksComponent implements OnInit {
  filterForm: FormGroup;
  filterTab: boolean;
  feedbacksResults: AdminFeedbacksList = {results: []};
  tableValues = {results: []};
  catFiltersConfig = {
    id: ['hexa', 'none'],
    authorID:  ['hexa', 'none'],
    title: ['alpha', 'none'],
    createdAt: ['alpha', 'none'],
    medias: ['num', 'none']
  };
  editDialogRef: MatDialogRef<AdminEditPopupComponent>;
  closeDialogRef: MatDialogRef<AdminDeletePopupComponent>;

  constructor(private bo: BackOfficeService, private fb: FormBuilder, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.filterTab = false;
    this.filterForm = this.fb.group({
      content: [''],
      title: [''],
      author: [''],
      id: ['']
    });
    this.onFormChanges();
    this.loadResults();
  }

  private loadResults() {
    this.bo.GetFeedbacks(this.filterForm.value)
      .subscribe(res => {
        this.feedbacksResults = res;
        this.fillTableValues();
      });
  }

  private fillTableValues() {
    this.tableValues.results = [];
    for (const mockedFeedbackItem of this.feedbacksResults.results) {
      this.tableValues.results.push(new FeedBackTableValue(
        mockedFeedbackItem.id,
        mockedFeedbackItem.authorID,
        mockedFeedbackItem.title,
        new Date(mockedFeedbackItem.createdAt).toLocaleString(),
        mockedFeedbackItem.medias.length
      ));
    }
  }

  private onFormChanges() {
    this.filterForm.get('id').valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
    this.filterForm.get('content').valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
    this.filterForm.get('title').valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
    this.filterForm.get('author').valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
  }

  toggleFilter() {
    this.filterTab = !this.filterTab;
  }

  editAct(itemId: string) {
    const displayConfig: IDisplayConfigItem[] = [
      {propName: 'id', displayedName: 'Id', type: 'string', isEditable: false},
      {propName: 'authorID', displayedName: 'Author ID', type: 'string', isEditable: false},
      {propName: 'createdAt', displayedName: 'Créé le', type: 'date', isEditable: false},
      {propName: 'updatedAt', displayedName: 'Mis à jour le', type: 'date', isEditable: false},
      {propName: 'title', displayedName: 'Titre', type: 'string', isEditable: false},
      {propName: 'content', displayedName: 'Contenu', type: 'string', isEditable: false},
      {propName: 'medias', displayedName: 'Medias', type: 'medias', isEditable: false},
    ];
    this.dialog.open(AdminEditPopupComponent, {
      width: '1000px',
      data: {
        itemProps:  this.feedbacksResults.results.filter((feedback) => feedback.id === itemId)[0],
        itemDisplayConfig: displayConfig,
        title: 'Feedback ' + itemId
      },
      disableClose: true
    });
  }

  deleteAct(itemId: string) {
    this.closeDialogRef = this.dialog.open(AdminDeletePopupComponent, {
      width: '700px',
      data: {
        confirmPhrase: 'Voulez-vous supprimer le feedback ? (id: ' + itemId + ')'
      }
    });
    this.closeDialogRef.afterClosed()
      .subscribe((shouldDelete: boolean) => {
        if (shouldDelete) {
          alert('Il n\'est pas possible de supprimer un feedback');
        }
      });
  }
}

class FeedBackTableValue {
  constructor(_id: string, _authorID: string, _title: string, _createdAt: string, _medias: number) {
    this.id = _id;
    this.authorID = _authorID;
    this.title = _title;
    this.createdAt = _createdAt;
    this.medias = _medias;
  }
  id: string;
  authorID: string;
  title: string;
  createdAt: string;
  medias: number;
}

export interface IDisplayConfigItem {
  propName: string;
  displayedName: string;
  type: string;
  isEditable: boolean;
}

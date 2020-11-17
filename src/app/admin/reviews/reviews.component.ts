import { Component, OnInit } from '@angular/core';
import { BackOfficeService } from '../../core/Api/backOffice.service';
import { AdminReviewsList, AdminReviewItem } from '../../core/Api/Model/AdminReviewsList';
import { AdminEditPopupComponent } from '../../shared/components/adminEditPopup/adminEditPopup.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AdminDeletePopupComponent } from '../../shared/components/adminDeletePopup/adminDeletePopup.component';
import { IDisplayConfigItem } from '../feedbacks/feedbacks.component';
import { ReviewService } from '../../core/Api/review.service';
import { FormBuilder, FormGroup } from '@angular/forms';

// TODO Filtrer les reviews
@Component({
  templateUrl: './reviews.component.html',
  styleUrls: ['../styles/admin-filter.scss']
})
export class ReviewsComponent implements OnInit {
  filterTab: boolean;
  filterForm: FormGroup;
  reviewsResults: AdminReviewsList = {results: []};
  tableValues = {results: []};
  catFiltersConfig = {
    id: ['hexa', 'none'],
    authorID: ['hexa', 'none'],
    placeID: ['hexa', 'none'],
    createdAt: ['num', 'none'],
    rating: ['num', 'none'],
    message: ['alpha', 'none'],
  };

  editDialogRef: MatDialogRef<AdminEditPopupComponent>;
  closeDialogRef: MatDialogRef<AdminDeletePopupComponent>;

  constructor(private bo: BackOfficeService, private fb: FormBuilder,
    private reviewService: ReviewService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.filterTab = false;
    this.filterForm = this.fb.group({
      id: [''],
      authorID: [''],
      placeID: [''],
      createdAt: [''],
      rating: [''],
    });
    this.onFormChanges();
    this.loadResults();
  }

  private onFormChanges() {
    this.filterForm.get('id').valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
    this.filterForm.get('authorID').valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
    this.filterForm.get('placeID').valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
    this.filterForm.get('createdAt').valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
    this.filterForm.get('rating').valueChanges
    .debounceTime(750)
    .distinctUntilChanged()
    .subscribe(() => {
      this.loadResults();
    });
  }

  private loadResults() {
    this.bo.GetReviews(this.filterForm.value)
      .subscribe(res => {
        this.reviewsResults = res;
        this.fillTableValues();
      });
  }

  private fillTableValues() {
    this.tableValues.results = [];
    for (const mockedFeedbackItem of this.reviewsResults.results) {
      this.tableValues.results.push(new ReviewTableValue(
        mockedFeedbackItem.id,
        mockedFeedbackItem.authorID,
        mockedFeedbackItem.placeID,
        mockedFeedbackItem.createdAt,
        mockedFeedbackItem.rating,
        mockedFeedbackItem.message
      ));
    }
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
      {propName: 'placeID', displayedName: 'Place ID', type: 'string', isEditable: false},
      {propName: 'rating', displayedName: 'Note', type: 'number', isEditable: true},
      {propName: 'message', displayedName: 'Message', type: 'string', isEditable: true},
    ];
    this.editDialogRef = this.dialog.open(AdminEditPopupComponent, {
      width: '1000px',
      data: {
        itemProps:  this.reviewsResults.results.filter((review) => review.id === itemId)[0],
        itemDisplayConfig: displayConfig,
        title: 'Review ' + itemId
      },
      disableClose: true
    });
    this.editDialogRef.afterClosed()
      .subscribe((editedReview: AdminReviewItem) => {
        if (editedReview !== null) {
          this.reviewService.EditReview(editedReview.id, editedReview.authorID, editedReview.rating, editedReview.message)
            .subscribe(() => this.loadResults());
        }
      });
  }

  deleteAct(itemId: string) {
    this.closeDialogRef = this.dialog.open(AdminDeletePopupComponent, {
      width: '700px',
      data: {
        confirmPhrase: 'Voulez-vous supprimer l\'avis ? (id: ' + itemId + ')'
      }
    });
    this.closeDialogRef.afterClosed()
      .subscribe((shouldDelete: boolean) => {
        if (shouldDelete) {
          this.reviewService.DeleteReview(itemId)
            .subscribe(() => this.loadResults());
        }
    });
  }
}

class ReviewTableValue {
  constructor(_id: string, _authorID: string, _placeID: string, _createdAt: number, _rating: number, _message: string) {
    this.id = _id;
    this.authorID = _authorID;
    this.placeID = _placeID;
    this.createdAt = _createdAt;
    this.rating = _rating;
    this.message = _message;
  }
  id: string;
  authorID: string;
  placeID: string;
  createdAt: number;
  rating: number;
  message: string;
}

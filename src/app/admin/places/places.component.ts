import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdminPlacesList} from '../../core/Api/Model/AdminPlacesList';
import {BackOfficeService} from '../../core/Api/backOffice.service';
import {AdminEditPopupComponent} from '../../shared/components/adminEditPopup/adminEditPopup.component';
import {IDisplayConfigItem} from '../feedbacks/feedbacks.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AdminDeletePopupComponent } from '../../shared/components/adminDeletePopup/adminDeletePopup.component';
import { PlaceService } from '../../core/Api/place.service';

@Component({
  templateUrl: './places.component.html',
  styleUrls: ['../../shared/components/adminTable/adminTable.component.scss', '../styles/admin-filter.scss']
})
export class PlacesComponent implements OnInit {

  filterTab: boolean;
  filterForm: FormGroup;
  placesResults: AdminPlacesList = { results: []};
  tableValues = { results: []};
  catFiltersConfig = {
    id: ['hexa', 'none'],
    name: ['alpha', 'none'],
    types: ['alpha', 'none'],
    rating: ['num', 'none'],
    googleRating: ['num', 'none'],
    createdAt: ['num', 'none'],
    formattedAddress: ['alpha', 'none'],
    subs: ['num', 'none']
  };

  editDialogRef: MatDialogRef<AdminEditPopupComponent>;
  closeDialogRef: MatDialogRef<AdminDeletePopupComponent>;

  constructor(private bo: BackOfficeService, private fb: FormBuilder, private placeService: PlaceService,
    public dialog: MatDialog) {

  }

  ngOnInit() {
    this.filterTab = false;
    this.filterForm = this.fb.group({
      id: [''],
      name: [''],
      rating: [''],
      type: ['']
    });
    this.onFormChanges();
    this.loadResults();
  }

  private loadResults() {
    this.bo.GetPlaces(this.filterForm.value)
      .subscribe(res => {
        this.placesResults = res;
        this.fillTableValues();
      });
  }

  private fillTableValues() {
    this.tableValues.results = [];
    for (const mockedPlaceItem of this.placesResults.results) {
      this.tableValues.results.push(new PlaceTableValue(
        mockedPlaceItem.id,
        mockedPlaceItem.name,
        mockedPlaceItem.types,
        mockedPlaceItem.rating,
        mockedPlaceItem.googleRating,
        mockedPlaceItem.createdAt,
        mockedPlaceItem.formattedAddress,
        mockedPlaceItem.subs.length
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
    this.filterForm.get('name').valueChanges
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
    this.filterForm.get('type').valueChanges
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
      {propName: 'updatedAt', displayedName: 'Mis à jour le', type: 'date', isEditable: false},
      {propName: 'createdAt', displayedName: 'Créé le', type: 'date', isEditable: false},
      {propName: 'placeID', displayedName: 'Id Google', type: 'string', isEditable: false},
      {propName: 'name', displayedName: 'Nom', type: 'string', isEditable: false},
      {propName: 'formattedAddress', displayedName: 'Adresse', type: 'string', isEditable: false},
      {propName: 'location', displayedName: 'Coordonnées', type: 'string', isEditable: false},
      {propName: 'image', displayedName: 'Image', type: 'string', isEditable: false},
      {propName: 'openingHours', displayedName: 'Horaires', type: 'string', isEditable: false},
      {propName: 'phone', displayedName: 'Téléphone', type: 'string', isEditable: false},
      {propName: 'priceLevel', displayedName: 'Niveau de prix', type: 'string', isEditable: false},
      {propName: 'rating', displayedName: 'Note', type: 'string', isEditable: false},
      {propName: 'googleRating', displayedName: 'Note Google', type: 'string', isEditable: false},
      {propName: 'types', displayedName: 'Type', type: 'string', isEditable: false},
      {propName: 'website', displayedName: 'Website', type: 'string', isEditable: false},
      {propName: 'subs', displayedName: 'Note Google', type: 'string', isEditable: false},
    ];
    this.dialog.open(AdminEditPopupComponent, {
      width: '1000px',
      maxHeight: '600px',
      panelClass: 'placeEditPopup',
      data: {
        itemProps:  this.placesResults.results.filter((place) => place.id === itemId)[0],
        itemDisplayConfig: displayConfig,
        title: 'Lieu ' + itemId
      },
      disableClose: true
    });
  }

}

class PlaceTableValue {
  constructor(_id: string, _name: string, _types: string, _rating: number, _googleRating: number,
              _createdAt: number, _formattedAdress: string, _subs: number) {
    this.id = _id;
    this.name = _name;
    this.types = _types;
    this.rating = _rating;
    this.googleRating = _googleRating;
    this.createdAt = _createdAt;
    this.formattedAddress = _formattedAdress;
    this.subs = _subs;
  }
  id: string;
  name: string;
  types: string;
  rating: number;
  googleRating: number;
  createdAt: number;
  formattedAddress: string;
  subs: number;
}

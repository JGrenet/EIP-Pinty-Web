import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { BackOfficeService } from '../../core/Api/backOffice.service';
import { AdminUsersList, AdminUserItem } from '../../core/Api/Model/AdminUsersList';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AdminEditPopupComponent } from '../../shared/components/adminEditPopup/adminEditPopup.component';
import { AdminDeletePopupComponent } from '../../shared/components/adminDeletePopup/adminDeletePopup.component';
import { UserService } from '../../core/Api/user.service';
import { IDisplayConfigItem } from '../feedbacks/feedbacks.component';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['../styles/admin-filter.scss']
})
export class UsersComponent implements OnInit {

  filterTab: boolean;
  filterForm: FormGroup;
  usersResults: AdminUsersList = {results: []};
  tableValues = {results: []};
  catFiltersConfig = {
    id: ['hexa', 'none'],
    role: [roleFilter, 'none'],
    nom: ['alpha', 'none'],
    prenom: ['alpha', 'none'],
    pseudo: ['alpha', 'none'],
    mail: ['alpha', 'none'],
    inscription: ['num', 'none'],
    nb_amis: ['num', 'none']
  };

  editDialogRef: MatDialogRef<AdminEditPopupComponent>;
  closeDialogRef: MatDialogRef<AdminDeletePopupComponent>;

  constructor(private fb: FormBuilder, private bos: BackOfficeService, private userService: UserService,
    public dialog: MatDialog) {

  }

  ngOnInit() {
    this.filterTab = false;
    this.filterForm = this.fb.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      username: [''],
      email: [''],
      role: ['']
    });
    this.onFormChanges();
    this.loadResults();
  }

  private loadResults() {
    this.bos.GetUsers(this.filterForm.value)
      .subscribe(res => {
        this.usersResults = res;
        this.fillTableValues();
      });
  }

  private fillTableValues() {
    this.tableValues.results = [];
    for (const mockedUserItem of this.usersResults.results) {
      this.tableValues.results.push(new UserTableValue(
        mockedUserItem.id,
        mockedUserItem.role,
        mockedUserItem.lastName,
        mockedUserItem.firstName,
        mockedUserItem.userName,
        mockedUserItem.email,
        mockedUserItem.createdAt,
        mockedUserItem.friends.length
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
    this.filterForm.get('firstname').valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
    this.filterForm.get('lastname').valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
    this.filterForm.get('username').valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
    this.filterForm.get('email').valueChanges
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
    this.filterForm.get('role').valueChanges
      .debounceTime(500)
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
      {propName: 'createdAt', displayedName: 'Créé le', type: 'date', isEditable: false},
      {propName: 'updatedAt', displayedName: 'Mis à jour le', type: 'date', isEditable: false},
      {propName: 'userName', displayedName: 'Pseudo', type: 'string', isEditable: true},
      {propName: 'firstName', displayedName: 'Prenom', type: 'string', isEditable: true},
      {propName: 'lastName', displayedName: 'Nom', type: 'string', isEditable: true},
      {propName: 'role', displayedName: 'Role', type: 'string', isEditable: false},
      {propName: 'gender', displayedName: 'Gender', type: 'string', isEditable: true},
      {propName: 'email', displayedName: 'Email', type: 'string', isEditable: true},
      {propName: 'city', displayedName: 'Ville', type: 'string', isEditable: true},
      {propName: 'description', displayedName: 'Description', type: 'string', isEditable: true},
    ];
    this.editDialogRef = this.dialog.open(AdminEditPopupComponent, {
      width: '1000px',
      data: {
        itemProps:  this.usersResults.results.filter((user) => user.id === itemId)[0],
        itemDisplayConfig: displayConfig,
        title: 'Review ' + itemId
      },
      disableClose: true
    });

    this.editDialogRef.afterClosed()
      .subscribe((editedUser: AdminUserItem) => {
        if (editedUser !== null) {
          this.userService.UpdateUserProfile(editedUser.id, {
            username: editedUser.userName,
            firstname: editedUser.firstName,
            lastname: editedUser.lastName,
            gender: editedUser.gender,
            email: editedUser.email,
            city: editedUser.city,
            description: editedUser.description
          })
            .subscribe(() => this.loadResults());
        }
      });
  }
}

const roleFilter = (_tableValues) => {
  _tableValues.results.sort((a: UserTableValue, b: UserTableValue) => {
    if (a.role === 'ADMIN' && b.role === 'USER') {
      return -1;
    } else if (a.role === 'USER' && b.role === 'ADMIN') {
      return 1;
    }
    return 0;
  });
  return _tableValues;
};

class UserTableValue {
  constructor(_id: string, _role: string, _nom: string, _prenom: string, _pseudo: string, _mail: string,
              _inscription: number, _nbAmis: number) {
    this.id = _id;
    this.role = _role;
    this.nom = _nom;
    this.prenom = _prenom;
    this.pseudo = _pseudo;
    this.mail = _mail;
    this.inscription = _inscription;
    this.nb_amis = _nbAmis;
  }

  id: string;
  role: string;
  nom: string;
  prenom: string;
  pseudo: string;
  mail: string;
  inscription: number;
  nb_amis: number;
}

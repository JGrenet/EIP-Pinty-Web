  export class UserProfile {

  constructor(_id: string, _username: string, _firstname: string, _lastname: string, _city: string, _description: string,
              _image: string, _role: string, _gender: string = '', _birthday: number = 0, _email: string = '', _accessType: string = '',
              _friends: string[] = [], _subPlaces: string[] = [], _latitude = 0, _longitude = 0) {
    this.id = _id;
    this.username = _username;
    this.firstname = _firstname;
    this.lastname = _lastname;
    this.city = _city;
    this.description = _description;
    this.image = _image;
    this.role = _role;
    this.gender = _gender;
    this.birthday = _birthday;
    this.email = _email;
    this.accessType = _accessType;
    this.friends = _friends;
    this.subPlaces = _subPlaces;
    this.latitude = _latitude;
    this.longitude = _longitude
  }

  id: string;
  username: string;
  firstname: string;
  lastname: string;
  city: string;
  description: string;
  image: string;
  role: string;
  gender: string;
  birthday: number;
  email: string;
  accessType: string;
  friends: string[];
  subPlaces: string[];
  latitude: number;
  longitude: number;
}

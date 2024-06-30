import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../type/user';
import { I } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:3000';
  httpClient = inject(HttpClient);

  getUsers() {
    console.log('getUser called');
    return this.httpClient.get<User[]>(this.apiUrl + '/users');
  }
  getUserById(id: string) {
    console.log('getUserById called');
    return this.httpClient.get<User>(this.apiUrl + '/users/' + id);
  }
  deleteUser(_id: string) {
    console.log('deleteUser called');
    console.log(this.apiUrl + '/users/' + _id);
    return this.httpClient.delete(this.apiUrl + '/users/' + _id);
  }
  addUser(user: Partial<User>) {
    console.log('addUser called');
    return this.httpClient.post(this.apiUrl + '/users', user);
  }
  updateUser(id: string, model: any) {
    console.log('I was called');
    console.log(id);
    this.httpClient.put(this.apiUrl + '/users/' + id, model).subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    // return this.httpClient.put(this.apiUrl + '/users', model);
  }
}

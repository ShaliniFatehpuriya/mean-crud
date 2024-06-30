import { Component, OnInit, inject } from '@angular/core';
import { User } from '../type/user';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userService = inject(UserService);

  ngOnInit() {
    this.userService.getUsers().subscribe((alluser) => {
      console.log(alluser);
      this.users = alluser;
    });
  }
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe((res) => {
      console.log('user deleted succesfully');
      this.users = this.users.filter((u) => u._id != id);
    });
  }
}

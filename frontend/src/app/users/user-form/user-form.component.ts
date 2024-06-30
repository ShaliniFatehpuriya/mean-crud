import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../type/user';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { N } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  userService = inject(UserService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  editUserId = '';
  flag = false;

  form: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    age: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.editUserId = this.route.snapshot.params['id'];
    console.log(this.editUserId);
    if (this.editUserId != null) {
      this.flag = true;
      this.userService.getUserById(this.editUserId).subscribe((result) => {
        this.form.patchValue(result);
      });
    }
  }
  onSubmit() {
    const model: Partial<User> = this.form.value;
    this.userService.addUser(model).subscribe((res) => {
      console.log(res);
    });
  }
  // onUpdate() {
  //   const model = this.form.value;
  //   console.log(this.form.value);
  //   if (this.flag) {
  //     console.log('onUpdate');
  //     console.log(this.editUserId);
  //     console.log(model);
  //     console.log('request sent');
  //     this.userService.updateUser(this.editUserId, model);
  //     this.flag = false;
  //   }
  // }
  onUpdate() {
    const model = this.form.value;
    //console.log(this.form.value);
    if (this.flag) {
      console.log(this.editUserId);
      this.userService.updateUser(this.editUserId, {
        ...model,
      });
      this.flag = false;
    }
  }
}

import { Component } from '@angular/core';
import {CountUpModule} from "ngx-countup";
import {CommonModule} from "@angular/common";
import {UserProfileService} from "../../../core/services/user.service";
import {DomSanitizer} from "@angular/platform-browser";
import {User} from "../../../store/Authentication/auth.models";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, CountUpModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: any;
  breadCrumbItems!: Array<{}>;
  usersWithImages: any[] = [];

  constructor(private userService: UserProfileService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.breadCrumbItems = [{ label: 'Custom UI' }, { label: 'Profile', active: true }];
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.users.forEach((user: User) => {

      });
    });
  }


  blockUser(id: number): void {
    console.log("aaaaa")
    this.userService.blockUser(id).subscribe((response) => {
      console.log(response)

      const user = this.users.find((user: any) => user.id === id);
      console.log(user.nonLocked)
      if (user) {
        user.nonLocked = false;
      }
    }, error => {
      // Log the error to the console
      console.error('Error unblocking user:', error);
    });
  }

  unblockUser(id: number): void {
    this.userService.unblockUser(id).subscribe((response) => {
      console.log(response)
      const user = this.users.find((user: any) => user.id === id);
      console.log(user.nonLocked)
      if (user) {
        user.nonLocked = true;
      }
    }, error => {
      // Log the error to the console
      console.error('Error unblocking user:', error);
    });
  }

}

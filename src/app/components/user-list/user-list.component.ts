import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  editUser(user: any): void {
    this.router.navigate(['/users/edit', user.id]); 
  }

  deleteUser(userId: number): void {
    this.apiService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter(user => user.id !== userId);
    });
  }
}

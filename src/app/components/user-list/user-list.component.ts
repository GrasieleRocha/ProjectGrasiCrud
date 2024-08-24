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
    this.apiService.getAllUsers().subscribe((data) => {
      // Adiciona uma flag isEditing para cada utilizador
      this.users = data.map(user => ({ ...user, isEditing: false }));
    });
  }

  editUser(user: any): void {
    user.isEditing = true; // Ativa o modo de edição
  }

  saveUser(user: any): void {
    this.apiService.updateUser(user.id, user).subscribe(() => {
      user.isEditing = false; // Desativa o modo de edição após salvar
    });
  }

  deleteUser(userId: number): void {
    this.apiService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== userId);
    });
  }
}

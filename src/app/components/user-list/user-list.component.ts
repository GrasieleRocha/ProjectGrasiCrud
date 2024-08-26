import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], 
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe((data) => {
      this.users = data.map(user => ({ ...user, editing: false }));
    });
  }

  editUser(user: any): void {
    user.editing = !user.editing; 
  }

  saveUser(user: any): void {
    if (user.PessoaId) {
      this.apiService.updateUser(user.PessoaId, user).subscribe(() => {
        user.editing = false; 
      });
    } else {
      console.error('O ID do usuário é indefinido!');
    }
  }

  deleteUser(userId: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) { 
      this.apiService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter((user) => user.PessoaId !== userId);
      });
    }
  }
}

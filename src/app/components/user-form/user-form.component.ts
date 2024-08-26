import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class UserFormComponent implements OnInit {
  user: any = { Nome: '', Email: '', DataNascimento: '', Sexo: '' };
  isEditMode = false;
  errorMessage = '';  

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.apiService.getUser(+id).subscribe((data) => {
        this.user = data;
      });
    }
  }

  saveUser(): void {
    if (!this.user.Nome || !this.user.Email || !this.user.DataNascimento || !this.user.Sexo) {
      this.errorMessage = 'Todos os campos devem ser preenchidos.';
      return;
    }

    if (this.isEditMode) {
      this.apiService.updateUser(this.user.id, this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.apiService.createUser(this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}

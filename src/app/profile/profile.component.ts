import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    name: '',
    email: '',
    department: '',
    semester: '',
    avatar: 'assets/images/avatar.jpg'
  };

  isEditing = false;
  isSaving = false;
  showLogoutModal = false;
  

  constructor(private router: Router) {}


  ngOnInit(): void {
    const stored = sessionStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.user.name = parsed.fullName || '';
      this.user.email = parsed.email || '';
      this.user.department = parsed.department || '';
      this.user.semester = parsed.semester || '';
    }
  }

  get avatarInitial(): string {
    return this.user.name ? this.user.name.charAt(0).toUpperCase() : '?';
  }

  editProfile() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveProfile() {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this.isEditing = false;
      alert('Changes saved!');
    }, 1500);
  }

  onAvatarChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.avatar = reader.result as string;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  cancelLogout() {
    this.showLogoutModal = false;
  }

confirmLogout() {
  this.showLogoutModal = false;
  sessionStorage.clear(); // Clear user session
  this.router.navigate(['/login']); // Redirect to login route
}

}

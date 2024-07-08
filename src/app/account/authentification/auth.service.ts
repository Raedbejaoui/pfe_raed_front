import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  private baseUrl = 'http://localhost:8081/api/auth'

  private userIdFromLocalStorage: string | null = null;


  login(loginResuest: any) {
    let url = `${this.baseUrl}/loginUser`;
    return this.http.post(url, loginResuest);

  }


  registerEntreprise(signUpEntreprise: any): Observable<any> {
    let url = `${this.baseUrl}/registerEntreprise`;
    return this.http.post(url, signUpEntreprise);
  }

  registerClient(signUpClient: any): Observable<any> {
    let url = `${this.baseUrl}/registerUser`;
    return this.http.post(url, signUpClient);
  }


  retrieveUserFromLocalStorage(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      const userId = currentUser.id;
      console.log("ID de l'utilisateur récupéré depuis le localStorage :", userId);
      this.userIdFromLocalStorage = userId;
    } else {
      console.log("Aucun utilisateur n'est actuellement connecté");
    }
  }

  getUserIdFromLocalStorage(): string | null {
    return this.userIdFromLocalStorage;
  }

  removeUserFromLocalStorage(): void {
    localStorage.removeItem('currentUser');
    this.userIdFromLocalStorage = null;
    console.log("User has been removed from local storage");
  }

  loadUserByEmail(email: string): Observable<any> {
    let url = `${this.baseUrl}`;
    return this.http.get<any>(`${url}/loadUserByEmail?email=${email}`);
  }

  loadUserById(id: string): Observable<any> {
    let url = `${this.baseUrl}`;
    return this.http.get<any>(`${url}/loadUserById/${id}`);
  }

  updateUser(email: string, updatedUser: any): Observable<any> {
    let url = `${this.baseUrl}`;
    return this.http.put(`${url}/updateUser?email=${email}`, updatedUser);
  }

  updateAdmin(email: string, updatedAdmin: any): Observable<any> {
    let url = `${this.baseUrl}`;
    return this.http.put(`${url}/updateAdmin?email=${email}`, updatedAdmin);
  }

  updateEntreprise(email: string, updatedEntreprise: any): Observable<any> {
    let url = `${this.baseUrl}`;
    return this.http.put(`${url}/updateEntreprise/${email}`, updatedEntreprise);
  }

  uploadImageProfile(email: string, file: File): Observable<any> {
    let url = `${this.baseUrl}`;
    const formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('file', file);

    return this.http.post<any>(`${url}/uploadImageProfile/${email}`, formData);
  }

  getAllUsers(): Observable<any> {
    let url = `${this.baseUrl}`;
    return this.http.get<any>(`${url}/allUsers`);
  }

  getAllEntreprises(): Observable<any> {
    let url = `${this.baseUrl}`;
    return this.http.get<any>(`${url}/allEntreprises`);
  }

  getCurrentUserId(): string | null {
    this.retrieveUserFromLocalStorage();
    return this.getUserIdFromLocalStorage();
  }
}



import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ReclamationService} from "../../core/services/reclamation.service";
import {FormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-reclamation',
  standalone: true,
  imports: [FormsModule, MatDialogContent, MatDialogTitle, MatDialogActions, MatButton, MatDialogClose, MatFormField, MatLabel, MatInput, NgIf, NgForOf, MatTable, MatHeaderCell, MatCell, MatColumnDef, MatCellDef, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSelect, MatOption, MatIcon, MatIconButton],
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  user: string | null = localStorage.getItem('currentUser');
  isAdmin: boolean = false;

  reclamations: any[] = [];
  reclamation: any = {type: '', description: '', etat: '', user: ''};
  userId: string = '';
  displayedColumns: string[] = ['id', 'type', 'description', 'etat', 'User', 'actions'];


  @ViewChild('addReclamationDialog', {static: false}) addReclamationDialog!: TemplateRef<any>;
  @ViewChild('updateEtatDialog', {static: false}) updateEtatDialog!: TemplateRef<any>;
  @ViewChild('updateReclamationDialog', {static: false}) updateReclamationDialog!: TemplateRef<any>;
  @ViewChild('reclamationDialog', {static: false}) reclamationDialog!: TemplateRef<any>;
  constructor(private reclamationService: ReclamationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (typeof this.user === "string") {
      this.userId = JSON.parse(this.user).id;
    }
    if (this.user && JSON.parse(this.user).role[0] === 'ROLE_ADMIN') {
      console.log('Admin:', JSON.parse(this.user).role);
      this.isAdmin = true;
      this.getAllReclamations();
    } else if (this.user) {
      console.log('User:', JSON.parse(this.user).role);
      this.getReclamationsByUserId(JSON.parse(this.user).id);
    }
  }

  getAllReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
      (data: any[]) => {
        this.reclamations = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  addReclamation(id: string): void {
    this.reclamation.etat = 'EN_ATTENTE';
    this.reclamationService.addReclamation(id, this.reclamation).subscribe(
      (data: any) => {
        this.reclamations.push(data);
        this.getAllReclamations();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  deleteReclamation(id: string): void {
    this.reclamationService.deleteReclamation(id).subscribe(
      () => {
        this.reclamations = this.reclamations.filter(reclamation => reclamation.id !== id);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getReclamationById(id: string): void {
    this.reclamationService.getReclamationById(id).subscribe(
      (data: any) => {
        if (data) {
          const dialogRef = this.openDialog(data);
          dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog closed with data:', dialogRef.componentInstance.data);
          });
        } else {
          console.error('Error: No reclamation found with id', id);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateReclamation(id: string): void {
    this.reclamationService.updateReclamation(id, this.reclamation).subscribe(
      (data: any) => {
        const index = this.reclamations.findIndex(reclamation => reclamation.id === id);
        this.reclamations[index] = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateEtatReclamation(id: string, etat: string): void {
    this.reclamationService.updateEtatReclamation(id, etat).subscribe(
      (data: any) => {
        const index = this.reclamations.findIndex(reclamation => reclamation.id === id);
        this.reclamations[index] = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getReclamationsByUserId(id: string): void {
    this.reclamationService.getReclamationsByUserId(id).subscribe(
      (data: any[]) => {
        this.reclamations = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  openDialog(data: any): MatDialogRef<any, any> {
    return this.dialog.open(this.reclamationDialog, {
      data: data
    });
  }

        openAddReclamationDialog(): void {
    if (this.user) {
      const userId = JSON.parse(this.user).id;
      this.reclamation.user = userId; // Assign userId to this.reclamation.user

      const dialogRef = this.dialog.open(this.addReclamationDialog);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.reclamation = result;
          this.addReclamation(userId); // Pass userId to the addReclamation method
        }
      });
    }
  }
  openUpdateEtatDialog(reclamation: any): void {
    this.reclamation = reclamation; // Assign the reclamation to be updated to this.reclamation

    const dialogRef = this.dialog.open(this.updateEtatDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reclamation.etat = result;
        this.updateEtatReclamation(this.reclamation.id, this.reclamation.etat); // Update the etat of the reclamation
      }
    });
  }
  openUpdateReclamationDialog(reclamation: any): void {
    this.reclamation = reclamation; // Assign the reclamation to be updated to this.reclamation

    const dialogRef = this.dialog.open(this.updateReclamationDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reclamation = result;
        this.updateReclamation(this.reclamation.id); // Update the reclamation
      }
    });
  }
}

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { services } from './services';


export interface DialogData {
  username: string;
  token: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SimpleLoginOperation';

  username: string;
  password: string;
  myForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private service: services) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

  }

  signIn() {
   
    this.username = this.myForm.controls['username'].value;
    this.password = this.myForm.controls['password'].value;
 
    this.service.signIn(this.username, this.password).subscribe((response) => {
      console.log(response);
      if (response) {
        let token = response.token;
        this.openDialog(this.username, token);
      } else {
        // error msg
      }
    }
    );
  }

  openDialog(uname: string, utoken: string): void {
    let dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '400px',
      maxWidth: '500px',
      minWidth: '50px',
      data: { username: uname, token: utoken },
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.password = result;
    });
  }

}


@Component({
  selector: 'detail-dialog',
  templateUrl: 'detail-dialog.html',
})
export class DetailDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
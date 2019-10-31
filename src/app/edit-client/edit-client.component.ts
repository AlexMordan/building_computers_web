import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from "../data.service";

enum FORM_ACTION {
  ADD = 1,
  EDIT = 2
}

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  public form: FormGroup;
  public action: FORM_ACTION = FORM_ACTION.ADD;
  FORM_ACTION: typeof FORM_ACTION = FORM_ACTION;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      full_name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      description: new FormControl('')
    });

    if (this.data.item) {
      console.log('data item = ', this.data.item);
      this.form.patchValue(this.data.item);
      this.action = FORM_ACTION.EDIT;
    }
  }

  async save() {
    let body = {
      id : this.data.item ? this.data.item.id : null,
      full_name: this.form.value.full_name,
      phone: this.form.value.phone,
      email: this.form.value.email,
      description: this.form.value.description
    }
    await this.dataService.postAsync('/clients/upsert', body);
    this.dialogRef.close(true);
  }

  async delete() {
    await this.dataService.deleteAsync('/clients/delete?id=' + this.data.item.id);
    this.dialogRef.close(true);
  }

}

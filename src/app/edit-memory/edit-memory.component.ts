import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from "../data.service";

enum FORM_ACTION {
  ADD = 1,
  EDIT = 2
}

@Component({
  selector: 'app-edit-memory',
  templateUrl: './edit-memory.component.html',
  styleUrls: ['./edit-memory.component.css']
})
export class EditMemoryComponent implements OnInit {
  public form: FormGroup;
  public action: FORM_ACTION = FORM_ACTION.ADD;
  FORM_ACTION: typeof FORM_ACTION = FORM_ACTION;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditMemoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
      manufacturer: new FormControl(''),
      year: new FormControl(''),
      dimensions: new FormControl(''),
      size_memory: new FormControl(''),
      status: new FormControl(''),
      description: new FormControl(''),
      memory_types: new FormControl(''),
      form_factor: new FormControl(''),
      price: new FormControl(''),
      frequency: new FormControl(''),
      specifications: new FormControl('')
    });

    if (this.data.item) {
      this.form.patchValue(this.data.item);
      this.action = FORM_ACTION.EDIT;
    }
  }

  async save() {
    let body = {
      id : this.data.item ? this.data.item.id : null,
      name: this.form.value.name,
      manufacturer: this.form.value.manufacturer,
      year: this.form.value.year,
      dimensions: this.form.value.dimensions,
      size_memory: this.form.value.size_memory,
      status: this.form.value.status,
      description: this.form.value.description,
      memory_types: this.form.value.memory_types,
      form_factor: this.form.value.form_factor,
      price: this.form.value.price,
      frequency: this.form.value.frequency,
      specifications: this.form.value.specifications
    }
    await this.dataService.postAsync('/memory/upsert', body);
    this.dialogRef.close(true);
  }

  async delete() {
    await this.dataService.deleteAsync('/memory/delete?id=' + this.data.item.id);
    this.dialogRef.close(true);
  }

}

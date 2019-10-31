import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from "../data.service";

enum FORM_ACTION {
  ADD = 1,
  EDIT = 2
}

@Component({
  selector: 'app-edit-motherboard',
  templateUrl: './edit-motherboard.component.html',
  styleUrls: ['./edit-motherboard.component.css']
})
export class EditMotherboardComponent implements OnInit {
  public form: FormGroup;
  public action: FORM_ACTION = FORM_ACTION.ADD;
  FORM_ACTION: typeof FORM_ACTION = FORM_ACTION;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditMotherboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
      manufacturer: new FormControl(''),
      year: new FormControl(''),
      sockets_supported: new FormControl(''),
      dimensions: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      status: new FormControl(''),
      chipset: new FormControl(''),
      memory_types: new FormControl(''),
      form_factor: new FormControl(''),
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
      sockets_supported: this.form.value.sockets_supported,
      dimensions: this.form.value.dimensions,
      description: this.form.value.description,
      price: this.form.value.price,
      status: this.form.value.status,
      chipset: this.form.value.chipset,
      memory_types: this.form.value.memory_types,
      form_factor: this.form.value.form_factor,
      specifications: this.form.value.specifications
    }
    await this.dataService.postAsync('/motherboard/upsert', body);
    this.dialogRef.close(true);
  }

  async delete() {
    await this.dataService.deleteAsync('/motherboard/delete?id=' + this.data.item.id);
    this.dialogRef.close(true);
  }

}

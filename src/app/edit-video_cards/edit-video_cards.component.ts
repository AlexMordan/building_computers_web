import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from "../data.service";

enum FORM_ACTION {
  ADD = 1,
  EDIT = 2
}

@Component({
  selector: 'app-edit-video_cards',
  templateUrl: './edit-video_cards.component.html',
  styleUrls: ['./edit-video_cards.component.css']
})
export class EditVideoComponent implements OnInit {
  public form: FormGroup;
  public action: FORM_ACTION = FORM_ACTION.ADD;
  FORM_ACTION: typeof FORM_ACTION = FORM_ACTION;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
      name : new FormControl(''),
      manufacturer : new FormControl(''),
      year : new FormControl(''),
      dimensions : new FormControl(''),
      size_memory : new FormControl(''),
      description : new FormControl(''),
      status : new FormControl(''),
      memory_types : new FormControl(''),
      price : new FormControl(''),
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
      name : this.form.value.name,
      manufacturer : this.form.value.manufacturer,
      year : this.form.value.year,
      dimensions : this.form.value.dimensions,
      size_memory : this.form.value.size_memory,
      description : this.form.value.description,
      status : this.form.value.status,
      memory_types : this.form.value.memory_types,
      price : this.form.value.price,
      frequency: this.form.value.frequency,
      specifications: this.form.value.specifications
    }
    await this.dataService.postAsync('/video_cards/upsert', body);
    this.dialogRef.close(true);
  }

  async delete() {
    await this.dataService.deleteAsync('/video_cards/delete?id=' + this.data.item.id);
    this.dialogRef.close(true);
  }

}

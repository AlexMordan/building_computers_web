import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from "../data.service";

enum FORM_ACTION {
  ADD = 1,
  EDIT = 2
}

@Component({
  selector: 'app-edit-cpu',
  templateUrl: './edit-cpu.component.html',
  styleUrls: ['./edit-cpu.component.css']
})
export class EditCpuComponent implements OnInit {
  public form: FormGroup;
  public action: FORM_ACTION = FORM_ACTION.ADD;
  FORM_ACTION: typeof FORM_ACTION = FORM_ACTION;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditCpuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      manufacturer: new FormControl(''),
      year: new FormControl(''),
      processor_number: new FormControl(''),
      lithography: new FormControl(''),
      of_cores: new FormControl(''),
      of_threads: new FormControl(''),
      processor_base_frequency: new FormControl(''),
      max_turbo_frequency: new FormControl(''),
      cache: new FormControl(''),
      tdp: new FormControl(''),
      max_memory_size: new FormControl(''),
      memory_types: new FormControl(''),
      processor_graphics: new FormControl(''),
      sockets_supported: new FormControl(''),
      dimensions: new FormControl(''),
      price: new FormControl(''),
      status: new FormControl(''),
      description: new FormControl('')
    });
    console.log('Edit', this.data);
    if (this.data.item) {
      this.form.patchValue(this.data.item);
      this.action = FORM_ACTION.EDIT;
    }
  }

  async save() {
    // if (this.action !== FORM_ACTION.EDIT) { 
    //   console.log('ADDDDD');
    //   delete this.form.value['id'];
    // }
    console.log('***log***');
    console.log(this.form.value);
    await this.dataService.postAsync('/cpu/upsert', this.form.value);
    this.dialogRef.close(true);
  }

  async delete() {
    await this.dataService.deleteAsync('/cpu/delete?id=' + this.data.item.id);
    this.dialogRef.close(true);
  }

}

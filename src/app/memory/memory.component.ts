import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from "../data.service";

import {EditMemoryComponent} from "../edit-memory/edit-memory.component";

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {
  data : any = {};
  displayedColumns: string[] = [
    'id',
    'name',
    'manufacturer',
    'year',
    'dimensions',
    'size_memory',
    'description',
    'status',
    'memory_types',
    'form_factor',
    'price',
    'frequency',
    'specifications'
  ];

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.data = await this.dataService.getAsync('/memory/get');
    console.log('data = ', this.data['rows']);
  }

  edit(item = null) {
    const dialogRef = this.dialog.open(EditMemoryComponent, {
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

}

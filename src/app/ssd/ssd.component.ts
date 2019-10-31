import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from "../data.service";

import {EditSSDComponent} from "../edit-ssd/edit-ssd.component";

@Component({
  selector: 'app-ssd',
  templateUrl: './ssd.component.html',
  styleUrls: ['./ssd.component.css']
})
export class SSDComponent implements OnInit {
  data : any = {};
  displayedColumns: string[] = [
    'id',
    'manufacturer',
    'name',
    'year',
    'dimensions',
    'bufer',
    'max_speed_write',
    'max_speed_read',
    'description',
    'status',
    'form_factor',
    'price',
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
    this.data = await this.dataService.getAsync('/ssd/get');
    console.log('data = ', this.data['rows']);
  }

  edit(item = null) {
    const dialogRef = this.dialog.open(EditSSDComponent, {
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

}

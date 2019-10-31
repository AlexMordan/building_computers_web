import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from "../data.service";

import {EditCaseComponent} from "../edit-case/edit-case.component";

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {
  data : any = {};
  displayedColumns: string[] = ['id', 'name', 'manufacturer', 'year', 'dimensions', 'description', 'status', 'form_factor', 'price', 'specifications'];

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.data = await this.dataService.getAsync('/case/get');
    console.log('data = ', this.data['rows']);
  }

  edit(item = null) {
    const dialogRef = this.dialog.open(EditCaseComponent, {
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

}

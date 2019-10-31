import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from "../data.service";

import {EditPowerSupplyComponent} from "../edit-power_supply/edit-power_supply.component";

@Component({
  selector: 'app-power_supply',
  templateUrl: './power_supply.component.html',
  styleUrls: ['./power_supply.component.css']
})
export class PowerSupplyComponent implements OnInit {
  data : any = {};
  displayedColumns: string[] = [
    'id',
    'name',
    'manufacturer',
    'year',
    'dimensions',
    'description',
    'status',
    'form_factor',
    'price',
    'power',
    'efficiency',
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
    this.data = await this.dataService.getAsync('/power_supply/get');
    console.log('data = ', this.data['rows']);
  }

  edit(item = null) {
    const dialogRef = this.dialog.open(EditPowerSupplyComponent, {
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from "../data.service";

import {EditMotherboardComponent} from "../edit-motherboard/edit-motherboard.component";

@Component({
  selector: 'app-motherboard',
  templateUrl: './motherboard.component.html',
  styleUrls: ['./motherboard.component.css']
})
export class MotherboardComponent implements OnInit {
  data : any = {};
  displayedColumns: string[] = [
    'id',
    'name',
    'manufacturer',
    'year',
    'sockets_supported',
    'dimensions',
    'description',
    'price',
    'status',
    'chipset',
    'memory_types',
    'form_factor',
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
    this.data = await this.dataService.getAsync('/motherboard/get');
    console.log('data = ', this.data['rows']);
  }

  edit(item = null) {
    const dialogRef = this.dialog.open(EditMotherboardComponent, {
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

}

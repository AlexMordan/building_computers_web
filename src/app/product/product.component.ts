import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from "../data.service";

import {EditProductComponent} from "../edit-product/edit-product.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  data : any = {};
  displayedColumns: string[] = [
    'id',
    'count',
    'status',
    'price',
    'cpu_id',
    'motherboard_id',
    'video_cards_id',
    'memory_id',
    'ssd_id',
    'case_id',
    'clients_id',
    'power_supply_id'
  ];

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.data = await this.dataService.getAsync('/product/get');
  }

  edit(item = null) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

}

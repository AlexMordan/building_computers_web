import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from "../data.service";

import {EditVideoComponent} from "../edit-video_cards/edit-video_cards.component";

@Component({
  selector: 'app-video_cards',
  templateUrl: './video_cards.component.html',
  styleUrls: ['./video_cards.component.css']
})
export class VideoCardsComponent implements OnInit {
  data : any = {};
  displayedColumns: string[] = [
    'id',
    'manufacturer',
    'name',
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
    this.data = await this.dataService.getAsync('/video_cards/get');
    console.log('data = ', this.data['rows']);
  }

  edit(item = null) {
    const dialogRef = this.dialog.open(EditVideoComponent, {
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

}

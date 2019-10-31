import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from "../data.service";

import {EditCpuComponent} from "../edit-cpu/edit-cpu.component";

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnInit {
  data : any = {};
  cpu = {};
  displayedColumns: string[] = [
    'id',
    'manufacturer',
    'name',
    'year',
    'processor_number',
    'lithography',
    'of_cores',
    'of_threads',
    'processor_base_frequency',
    'max_turbo_frequency',
    'cache',
    'tdp',
    'max_memory_size',
    'memory_types',
    'processor_graphics',
    'sockets_supported',
    'dimensions',
    'description',
    'price',
    'status'
  ];
  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cpu['brand'] = 'AMD';
    this.getData();
  }

  async getData() {
    this.data = await this.dataService.getAsync('/cpu/get');
    console.log('data = ', this.data['rows']);
  }

  edit(item = null) {
    const dialogRef = this.dialog.open(EditCpuComponent, {
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

}

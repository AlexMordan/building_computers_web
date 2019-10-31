import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Observable} from 'rxjs';
import { DataService } from "../data.service";
import {map, startWith} from 'rxjs/operators';
enum FORM_ACTION {
  ADD = 1,
  EDIT = 2
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public form: FormGroup;
  public action: FORM_ACTION = FORM_ACTION.ADD;
  FORM_ACTION: typeof FORM_ACTION = FORM_ACTION;
  filteredClient: Observable<string[]>;
  filteredCpu: Observable<string[]>;
  filteredCase: Observable<string[]>;
  filteredMotherboard: Observable<string[]>;
  filteredMemory: Observable<string[]>;
  filteredSSD: Observable<string[]>;
  filteredPowerSupply: Observable<string[]>;
  filteredVideo: Observable<string[]>;


  relatedDataName = {};
  relatedData = {};

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  async ngOnInit() {
    this.form = new FormGroup({
      count: new FormControl(''),
      status: new FormControl('New'),
      control_client: new FormControl(''),
      control_cpu: new FormControl(''),
      control_case: new FormControl(''),
      control_motherboard: new FormControl(''),
      control_memory: new FormControl(''),
      control_ssd: new FormControl(''),
      control_power: new FormControl(''),
      control_video: new FormControl('')
    });
    await this.setRelatedData();

    if (this.data.item) {
      console.log('data item = ', this.data.item);
      this.form.patchValue(this.data.item);
      this.action = FORM_ACTION.EDIT;
    }



    this.filteredClient = this.form.controls.control_client.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'client'))
    );

    this.filteredCpu = this.form.controls.control_cpu.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'cpu'))
    );

    this.filteredCase = this.form.controls.control_case.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'case'))
    );

    this.filteredMotherboard = this.form.controls.control_motherboard.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'motherboard'))
    );

    this.filteredMemory = this.form.controls.control_memory.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'memory'))
    );

    this.filteredSSD = this.form.controls.control_ssd.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'ssd'))
    );

    this.filteredPowerSupply = this.form.controls.control_power.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'powerSupply'))
    );

    this.filteredVideo = this.form.controls.control_video.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'video'))
    );
  }

  async setRelatedData() {
    let tempDate = await Promise.all([
      this.dataService.getAsync('/cpu/get'),
      this.dataService.getAsync('/case/get'),
      this.dataService.getAsync('/motherboard/get'),
      this.dataService.getAsync('/memory/get'),
      this.dataService.getAsync('/ssd/get'),
      this.dataService.getAsync('/power_supply/get'),
      this.dataService.getAsync('/video_cards/get'),
      this.dataService.getAsync('/clients/get'),
    ]);

    this.relatedData['cpu'] = tempDate[0] ['rows'];
    this.relatedData['case'] = tempDate[1] ['rows'];
    this.relatedData['motherboard'] = tempDate[2]['rows'];
    this.relatedData['memory'] = tempDate[3] ['rows'];
    this.relatedData['ssd'] = tempDate[4] ['rows'];
    this.relatedData['powerSupply'] = tempDate[5] ['rows'];
    this.relatedData['video'] = tempDate[6] ['rows'];
    this.relatedData['client'] = tempDate[7] ['rows'];

    this.relatedDataName['cpu'] = tempDate[0]['rows'].map(item => {
      return item['name'];
    });
    this.relatedDataName['case'] = tempDate[1]['rows'].map(item => {
      return item['name'];
    });
    this.relatedDataName['motherboard'] = tempDate[2]['rows'].map(item => {
      return item['name'];
    });
    this.relatedDataName['memory'] = tempDate[3]['rows'].map(item => {
      return item['name'];
    });
    this.relatedDataName['ssd'] = tempDate[4]['rows'].map(item => {
      return item['name'];
    });
    this.relatedDataName['powerSupply'] = tempDate[5]['rows'].map(item => {
      return item['name'];
    });
    this.relatedDataName['video'] = tempDate[6]['rows'].map(item => {
      return item['name'];
    });
    this.relatedDataName['client'] = tempDate[7]['rows'].map(item => {
      return item['full_name'];
    });
    console.log('this = ', this.relatedDataName);
    console.log('CPU', tempDate[0]);
    console.log('CASE', tempDate[1]);
  }

  private _filter(value: string, type: string): string[] {
    const filterValue = value.toLowerCase();
    switch(type) {
      case 'cpu':
        return this.relatedDataName['cpu'].filter(option => option.toLowerCase().includes(filterValue));
      break;
      case 'case':
        return this.relatedDataName['case'].filter(option => option.toLowerCase().includes(filterValue));
      break;
      case 'motherboard':
        return this.relatedDataName['motherboard'].filter(option => option.toLowerCase().includes(filterValue));
      break;
      case 'memory':
        return this.relatedDataName['memory'].filter(option => option.toLowerCase().includes(filterValue));
      break;
      case 'ssd':
        return this.relatedDataName['ssd'].filter(option => option.toLowerCase().includes(filterValue));
      break;
      case 'powerSupply':
        return this.relatedDataName['powerSupply'].filter(option => option.toLowerCase().includes(filterValue));
      break;
      case 'video':
        return this.relatedDataName['video'].filter(option => option.toLowerCase().includes(filterValue));
      break;
      case 'client':
        return this.relatedDataName['client'].filter(option => option.toLowerCase().includes(filterValue));
      break;
    }
  }

  async save() {
    let selectedCPU = this.relatedData['cpu'].find(item => this.form.value.control_cpu === item.name);
    let selectedCase = this.relatedData['case'].find(item => this.form.value.control_case === item.name);
    let selectedMotherboard = this.relatedData['motherboard'].find(item => this.form.value.control_motherboard === item.name);
    let selectedMemory = this.relatedData['memory'].find(item => this.form.value.control_memory === item.name);
    let selectedSSD = this.relatedData['ssd'].find(item => this.form.value.control_ssd === item.name);
    let selectedPowerSupply = this.relatedData['powerSupply'].find(item => this.form.value.control_power === item.name);
    let selectedVideo = this.relatedData['video'].find(item => this.form.value.control_video === item.name);
    let selectedClient = this.relatedData['client'].find(item => this.form.value.control_client === item.full_name);

    let price = this.form.value.count * (
      selectedCPU ? ((selectedCPU.price) ? selectedCPU.price : 0) : 0 +
      selectedCase ? ((selectedCase.price) ? selectedCase.price : 0) : 0 +
      selectedMotherboard ? ((selectedMotherboard.price) ? selectedMotherboard.price : 0) : 0 +
      selectedMemory ? ((selectedMemory.price) ? selectedMemory.price : 0) : 0 +
      selectedSSD ? ((selectedSSD.price) ? selectedSSD.price : 0) : 0 +
      selectedPowerSupply ? ((selectedPowerSupply.price) ? selectedPowerSupply.price : 0) : 0 +
      selectedVideo ? ((selectedVideo.price) ? selectedVideo.price : 0) : 0 +
      selectedClient ? ((selectedClient.price) ? selectedClient.price : 0) : 0
    );

    let body = {
      id : this.data.item ? this.data.item.id : null,
      count: this.form.value.count ? this.form.value.count : 1,
      price: price,
      status: this.form.value.status,
      cpu_id: selectedCPU ? selectedCPU.id : null,
      motherboard_id: selectedMotherboard ? selectedMotherboard.id : null,
      video_cards_id: selectedVideo ? selectedVideo.id : null,
      memory_id: selectedMemory ? selectedMemory.id: null,
      ssd_id: selectedSSD ? selectedSSD.id: null,
      case_id: selectedCase ? selectedCase.id: null,
      clients_id: selectedClient ? selectedClient.id: null,
      power_supply_id: selectedPowerSupply ? selectedPowerSupply.id: null
    }
    await this.dataService.postAsync('/product/upsert', body);
    this.dialogRef.close(true);
  }

  async delete() {
    await this.dataService.deleteAsync('/product/delete?id=' + this.data.item.id);
    this.dialogRef.close(true);
  }

}

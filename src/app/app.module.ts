import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CpuComponent } from './cpu/cpu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { DataService } from './data.service';
import { EditCpuComponent } from './edit-cpu/edit-cpu.component';
import { CaseComponent } from './case/case.component';
import { ClientsComponent } from './clients/clients.component';
import { MemoryComponent } from './memory/memory.component';
import { MotherboardComponent } from './motherboard/motherboard.component';
import { PowerSupplyComponent } from './power_supply/power_supply.component';
import { ProductComponent } from './product/product.component';
import { SSDComponent } from './ssd/ssd.component';
import { VideoCardsComponent } from './video_cards/video_cards.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { EditCaseComponent } from './edit-case/edit-case.component';
import { EditMemoryComponent } from './edit-memory/edit-memory.component';
import { EditMotherboardComponent } from './edit-motherboard/edit-motherboard.component';
import { EditPowerSupplyComponent } from './edit-power_supply/edit-power_supply.component';
import { EditSSDComponent } from './edit-ssd/edit-ssd.component';
import { EditVideoComponent } from './edit-video_cards/edit-video_cards.component';

@NgModule({
  declarations: [
    AppComponent,
    CpuComponent,
    CaseComponent,
    ClientsComponent,
    MemoryComponent,
    MotherboardComponent,
    PowerSupplyComponent,
    ProductComponent,
    SSDComponent,
    VideoCardsComponent,

    EditCpuComponent,
    EditClientComponent,
    EditProductComponent,
    EditCaseComponent,
    EditMemoryComponent,
    EditMotherboardComponent,
    EditPowerSupplyComponent,
    EditSSDComponent,
    EditVideoComponent,

    AuthComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DataService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    EditCpuComponent,
    EditClientComponent,
    EditProductComponent,
    EditCaseComponent,
    EditMemoryComponent,
    EditMotherboardComponent,
    EditPowerSupplyComponent,
    EditSSDComponent,
    EditVideoComponent,
  ]
})
export class AppModule { }
export class PizzaPartyAppModule { }

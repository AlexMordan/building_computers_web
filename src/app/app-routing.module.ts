import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CpuComponent } from './cpu/cpu.component';
import { CaseComponent } from './case/case.component';
import { ClientsComponent } from './clients/clients.component';
import { MemoryComponent } from './memory/memory.component';
import { MotherboardComponent } from './motherboard/motherboard.component';
import { PowerSupplyComponent } from './power_supply/power_supply.component';
import { ProductComponent } from './product/product.component';
import { SSDComponent } from './ssd/ssd.component';
import { VideoCardsComponent } from './video_cards/video_cards.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'cpu', component: CpuComponent, canActivate:[AuthGuard]},
  { path: 'case', component: CaseComponent, canActivate:[AuthGuard]},
  { path: 'clients', component: ClientsComponent, canActivate:[AuthGuard]},
  { path: 'memory', component: MemoryComponent, canActivate:[AuthGuard]},
  { path: 'motherboard', component: MotherboardComponent, canActivate:[AuthGuard]},
  { path: 'power-supply', component: PowerSupplyComponent, canActivate:[AuthGuard]},
  { path: 'product', component: ProductComponent, canActivate:[AuthGuard]},
  { path: 'ssd', component: SSDComponent, canActivate:[AuthGuard]},
  { path: 'video', component: VideoCardsComponent, canActivate:[AuthGuard]},
  { path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}

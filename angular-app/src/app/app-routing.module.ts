import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RfidReadComponent } from './rfid-read/rfid-read.component';

const routes: Routes = [{ path: '', component: RfidReadComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

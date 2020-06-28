import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormDesignerComponent } from './form-designer/form-designer.component';
import { ServiceListComponent } from './service-list/service-list.component';

const routes: Routes = [
  { path: 'form-designer', component: FormDesignerComponent },
  { path: 'services', component: ServiceListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

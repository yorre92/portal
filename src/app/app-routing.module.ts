import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormDesignerComponent } from './form-designer/form-designer.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { MenuDesignerComponent } from './menu-designer/menu-designer.component';
import { ThemeComponent } from './theme/theme.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { MenuComponent } from './menu/menu.component';
import { OrderServiceListComponent } from './order-service-list/order-service-list.component';
import { ApiCallFormComponent } from './api-call-form/api-call-form.component';
import { WorkflowFormComponent } from './workflow-form/workflow-form.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';

const routes: Routes = [
  { path: 'form-designer', component: FormDesignerComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'services/:id', component: ServiceFormComponent },
  { path: 'menu-designer', component: MenuDesignerComponent },
  { path: 'theme', component: ThemeComponent },
  { path: 'order', component: OrderServiceListComponent },
  { path: 'workflows', component: WorkflowListComponent },
  { path: 'workflows/:id', component: WorkflowFormComponent },
  { path: 'api-call-form', component: ApiCallFormComponent },
  { path: '', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

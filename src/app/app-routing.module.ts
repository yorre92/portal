import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormDesignerComponent } from './form-designer/form-designer.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { MenuDesignerComponent } from './menu-designer/menu-designer.component';
import { ThemeComponent } from './theme/theme.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'form-designer', component: FormDesignerComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'services/:id', component: ServiceFormComponent },
  { path: 'menu-designer', component: MenuDesignerComponent },
  { path: 'theme', component: ThemeComponent },
  { path: '', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

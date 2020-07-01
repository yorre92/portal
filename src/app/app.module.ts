import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormDesignerComponent } from './form-designer/form-designer.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicElementComponent } from './dynamic-element/dynamic-element.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { MenuComponent } from './menu/menu.component';
import { MenuDesignerComponent } from './menu-designer/menu-designer.component';
import { ThemeComponent } from './theme/theme.component';
import { LanguageEditorComponent } from './language-editor/language-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    FormDesignerComponent,
    DynamicElementComponent,
    ServiceListComponent,
    ServiceFormComponent,
    MenuComponent,
    MenuDesignerComponent,
    ThemeComponent,
    LanguageEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
    CdkTreeModule,
    MatTreeModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule,
    CdkTreeModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
    CdkTreeModule,
    MatTreeModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

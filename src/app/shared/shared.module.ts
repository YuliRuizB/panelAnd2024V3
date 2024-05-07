import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ThemeConstantService } from './services/theme-constant.service';
import { SearchPipe } from './pipes/search.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { AgGridModule } from 'ag-grid-angular';
import { globalImputs } from './directives/global-imputs';
import { TableService } from './services/table.service';

@NgModule({ 
    schemas: [NO_ERRORS_SCHEMA],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        globalImputs,     
        SearchPipe,   
        ReactiveFormsModule,
        AgGridModule,      
      ],
    imports: [
        RouterModule,
        CommonModule,       
        FormsModule,
        ReactiveFormsModule,
        globalImputs,
        AgGridModule,     
    ],
    declarations: [
        SearchPipe,
        CurrencyPipe,     
    ],
    providers: [  
        TableService
    ]
})

export class SharedModule { }

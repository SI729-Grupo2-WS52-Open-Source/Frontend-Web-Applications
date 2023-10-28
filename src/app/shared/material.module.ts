import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
    exports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatTableModule,
        FontAwesomeModule,
        NgbCarouselModule,
        NgbModule,
        MatIconModule,
        MatBadgeModule,
        MatExpansionModule
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatTableModule,
        FontAwesomeModule,
        NgbCarouselModule,
        NgbModule,
        MatIconModule,
        MatBadgeModule,
        MatExpansionModule
    ]
})
export class MaterialModule { }

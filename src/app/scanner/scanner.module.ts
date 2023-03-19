import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";

import { ScannerRoutingModule } from './scanner-routing.module';
import { ScannerComponent } from './scanner.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    ScannerComponent
  ],
  imports: [
    CommonModule,
    ScannerRoutingModule,
    BarcodeScannerLivestreamModule,
    QRCodeModule
  ]
})
export class ScannerModule { }

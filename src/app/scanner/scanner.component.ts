import { Component, ViewChild } from '@angular/core';
import { QuaggaJSConfigObject } from '@ericblade/quagga2';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent {

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner!: BarcodeScannerLivestreamComponent;

  barcodeValue: any;
  codeFormat: string = '';
  finalString!: string;

  config: Partial<QuaggaJSConfigObject> = {
    inputStream: {
      constraints: {
        facingMode: 'environment' // restrict camera type
      },
      area: { // defines rectangle of the detection
        top: '40%',    // top offset
        right: '0%',  // right offset
        left: '0%',   // left offset
        bottom: '40%'  // bottom offset
      },
    },
    decoder: {
      readers: ['ean_reader'] // restrict code types
    },
  }

  /**
   * @description Method will be triggered once scanner detects the bar code.
   * @param result 
   * @returns 
   */
  onValueChanges(result: any) {
    this.barcodeValue = result.codeResult.code;
    this.codeFormat = result.codeResult.format.toLocaleUpperCase().replace('_', '');
    this.finalString = `MISHIPAY|${this.codeFormat}|${this.barcodeValue}`;
    this.stop();
    return;
  }

  stop() {
    this.barcodeScanner.stop();
  }

  /**
   * @description Method will be triggered once scanner starts.
   * @param started 
   */
  onStarted(started: any): void {
    console.log('started', started);
  }

  /**
   * @description Method will be used to start the camera.
   */
  start(): void {
    this.barcodeScanner.start();
  }

  /**
   * @description Method will be used to Download the QR
   * @param qr 
   * @param format 
   */
  downloadQR(qr: any, format: string): void {
    let parentElement = null;
    parentElement = qr.qrcElement.nativeElement.querySelector("canvas").toDataURL(format);
    
    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: format });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Qrcode";
      link.click();
    }
  }

  /**
   * @description Method will be used to convert Base 64 image to blob format.
   * @param Base64Image 
   * @returns 
   */
  private convertBase64ToBlob(Base64Image: string): Blob {
    // split into two parts
    const parts = Base64Image.split(";base64,");
    // hold the content type
    const imageType = parts[0].split(":")[1];
    // decode base64 string
    const decodedData = window.atob(parts[1]);
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

import { ScannerComponent } from './scanner.component';

describe('ScannerComponent', () => {
  let component: ScannerComponent;
  let fixture: ComponentFixture<ScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test to check if the barcodeValue is returned successfully when the scan is done', () => {
    const mockQuaggaJSResultObject = { codeResult: { code: 12345678, format: 'barcode_format' } };
    const component = new ScannerComponent();
    component.barcodeScanner = new BarcodeScannerLivestreamComponent();
    component.onValueChanges(mockQuaggaJSResultObject);
    expect(component.barcodeValue).toBe(12345678); 
    expect(component.codeFormat).toBe('BARCODEFORMAT'); 
    expect(component.finalString).toBe('MISHIPAY|BARCODEFORMAT|12345678');
  });

  it('Test creating new Blob from an Uint8Array', () => { 
    const uInt8Array = new Uint8Array([1, 2, 3]); 
    const imageType = 'image/png'; 
    const result = new Blob([uInt8Array], { type: imageType }); 
    expect(result).toBeInstanceOf(Blob); 
    expect(result.type).toBe(imageType); 
    expect(result.size).toBe(3); 
  });
});

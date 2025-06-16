import { TestBed } from '@angular/core/testing';

import { PdfMakeFontService } from './pdf-make-font.service';

describe('PdfMakeFontService', () => {
  let service: PdfMakeFontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfMakeFontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

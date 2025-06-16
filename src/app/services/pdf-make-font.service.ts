import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfMakeFontService {
  constructor() {
    // Load default fonts
    (pdfMake as any).vfs = (pdfFonts as any).vfs;

    // Register Arabic font (Amiri)
(pdfMake as any).vfs["Amiri-Regular.ttf"] = "AAEAAAAPAIAAAwBwR0RFRoA3oIQABS0gAAADQEdQT1OuDBunAAUwYAAA1yhHU1VCKX3XTAAGB4gAAIyET1MvMp5/dp8AAAF4AAAAYGNtYXDwK+OqAABqhAAAESJnYXNwAAAAEAAFLRgAAAAIZ2x5ZvJz3KQAAOSMAAQ9AWhlYWTOXCcrAAAA/AAAADZoaGVhL3wbfgAAATQAAAAkaG10eDnUxFUAAAHYAABoqmxvY2E4yrZUAAB7sAAAaNxtYXhwGpcGhAAA...";

    // Add to font list
    (pdfMake as any).fonts = {
      ...pdfMake.fonts,
      ArabicFont: {
        normal: 'Amiri-Regular.ttf',
        bold: 'Amiri-Regular.ttf',
        italics: 'Amiri-Regular.ttf',
        bolditalics: 'Amiri-Regular.ttf'
      }
    };
  }
}

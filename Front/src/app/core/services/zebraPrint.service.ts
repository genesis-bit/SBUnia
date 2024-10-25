import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { jsPDF } from "jspdf";
import { Auth2Service } from './auth2.service';

import html2canvas from 'html2canvas';

var QRCode = require('qrcode')
var JsBarcode = require('jsbarcode');
//    http://raw.githack.com/MrRio/jsPDF/master/
//import { print } from "unix-print";
//import { getPrinters } from "unix-print";
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper'


@Injectable({
  providedIn: 'root'
})
export class zebraPrint {

  constructor(private _AuthService: Auth2Service,) { }



  printTeste(data:any) {

    const fileToPrint = "dfteste.pdf";
    const printer = "ZDesigner GK420d";  
   // getPrinters().then(console.log);

   // print(fileToPrint, printer).then(console.log);
  }


  printZebra(data: any) {


    const printBarcode = async (serial) => {
      try {

        // Create a new instance of the object
        const browserPrint = new ZebraBrowserPrintWrapper();

        // Select default printer
        const defaultPrinter = await browserPrint.getDefaultPrinter();


        console.log(defaultPrinter)

        // Set the printer
        browserPrint.setPrinter(defaultPrinter);

        // Check printer status
        const printerStatus = await browserPrint.checkPrinterStatus();

        // Check if the printer is ready
        if (printerStatus.isReadyToPrint) {

          // ZPL script to print a simple barcode
          const zpl = `^XA
                          ^BY2,2,100
                          ^FO20,20^BC^FD${serial}^FS
                          ^XZ`;

          browserPrint.print(zpl);
        } else {
          console.log("Error/s", printerStatus.errors);
        }

      } catch (error) {
        throw new Error(error);
      }
    };

    let serial = "0123456789";

    printBarcode(serial);
  }




}

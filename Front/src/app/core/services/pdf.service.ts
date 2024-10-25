import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { jsPDF } from "jspdf";
import { Auth2Service } from './auth2.service';

import html2canvas from 'html2canvas';
  
 var QRCode = require('qrcode')
var JsBarcode = require('jsbarcode');
//    http://raw.githack.com/MrRio/jsPDF/master/


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private _AuthService: Auth2Service,) { }

  fileType = 'application/pdf';
  fileExtension = '.pdf';

  img_code_barra = ""

  img_code_qr = ""


  public savePdfFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
  getNumberFormatMoney(value: any) {
    let money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'AOA', });
    let montante = money.format(value) + ""
    return montante.replace(/[AOA ]/g, "")
  }
  getNumberFormatExtenso(value: any) {
    // let money_extenso = extenso.value   
    return value
  }

  getMes(value: any) {
    switch (value) {
      case 1: return 'Janeiro'; break
      case 2: return 'Fevereiro'; break
      case 3: return 'Março'; break
      case 4: return 'Abril'; break
      case 5: return 'Maio'; break
      case 6: return 'Junho'; break
      case 7: return 'Julho'; break
      case 8: return 'Agosto'; break
      case 9: return 'Setembro'; break
      case 10: return 'Outubro'; break
      case 11: return 'Novembro'; break
      case 12: return 'Dezembro'; break
      default: ""
    }
  }

  setFillColorTable(doc: any, color: any, width_init: any, width_end: any, height: any, height_space: any) {
    const x = width_init
    const w = width_end
    let y = height
    let h = Number(height) + Number(height_space) + 1
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(x, y, w, h, 'F');
    y = Number(height) + Number(height_space) - 1
    h = Number(height) + Number(height_space) - 1
    doc.setFillColor(255, 255, 255);
    doc.rect(x, y, w, h, 'F');
  }

  public lista(instituicao: any, data_head: any, data_itens: any, data_config: any) {

    var doc = new jsPDF()

    var height = 35
    var margin_left = 10
    doc.setFont("Arial", "");
    doc.setFontSize(8);

    doc.addImage(instituicao.logotipo, "PNG", 95, 10, 20, 20);
    doc.setFont("Arial", "bold");
    doc.text(instituicao.name, 105, height, { align: 'center' });
    if (data_config?.area) {
      height = height + 8
      doc.setFont("Arial", "");
      doc.setFont("Arial", "bold");
      doc.text(data_config.area.toUpperCase(), 105, height, { align: 'center' });
    }
    height = height + 8
    doc.setFont("Arial", "");
    doc.text(data_config.titulo.toUpperCase(), 105, height, { align: 'center' });

    height = height + 10
    doc.setFont("Arial", "bold");
    doc.text(data_config.assunto, margin_left, height, { align: 'left' });
    height = height + 5

    doc.setFont("Arial", "");
    let altura = 0
    const autoTable = 'autoTable';

    /*
    doc[autoTable]({
      styles: { fontSize: 7 },
      //   columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } }, // Cells in first column centered and green
      margin: { left: 10, top: 60, right: 10 },

      head: data_head,
      body: data_itens,
    })
    */

    height = height + altura
    height = height + 5
    doc.save(data_config.nome_documento + ".pdf"); // Generated PDF

  }

  public listaBlob(instituicao: any, data_head: any, data_itens: any, data_config: any) {

    //console.log("documento imprimir fichar")
    var doc = new jsPDF()

    var height = 35
    var margin_left = 10
    doc.setFont("Arial", "");
    doc.setFontSize(8);

    doc.addImage(instituicao.logotipo, "PNG", 95, 10, 20, 20);


    doc.setFont("Arial", "bold");
    doc.text(instituicao.name, 105, height, { align: 'center' });


    if (data_config?.area) {
      height = height + 8
      doc.setFont("Arial", "");
      doc.setFont("Arial", "bold");
      doc.text(data_config.area.toUpperCase(), 105, height, { align: 'center' });
    }
    height = height + 8
    doc.setFont("Arial", "");

    doc.text(data_config.titulo.toUpperCase(), 105, height, { align: 'center' });

    height = height + 10
    doc.setFont("Arial", "bold");
    doc.text(data_config.assunto, margin_left, height, { align: 'left' });
    height = height + 5

    doc.setFont("Arial", "");

    let altura = 0
    const autoTable = 'autoTable';




    // let numero_itens = data_itens.length


    height = height + altura
    height = height + 5

    // this.rodape('documento', doc, pagina, height, height_space, margin_left)

    let blobdata = doc.output('blob');

    return blobdata


  }


  textToBase64Barcode(text:any) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, { format: "CODE128", displayValue: false });
    return canvas.toDataURL("image/png");
  }

  getCodigoBarra(codigo:any) { 
    let codigo_barra = ""
    if (codigo)
      codigo_barra = this.textToBase64Barcode(codigo)  
   
      this.img_code_barra = codigo_barra;

  }

  ticketDocumentoPdf(dado: any) {



    const docWidth  = 100; // em mm
    const docHeight = 40; // em mm

   // let doc = new jsPDF( 'p', 'mm', [docHeight, docWidth]);
    let doc = new jsPDF();
 
    // http://raw.githack.com/MrRio/jsPDF/master/
  
    var height = 5
    var margin_left = 15 
    //  format x,y , w,h 
    doc.setFontSize(11); 
    doc.setFont("Helvetica","bold");

 
    console.log(dado) 
   // doc.setFont("Arial", "bold"); 
   
    doc.text("INAGBE", margin_left, height,  );  
    height = height + 1 
    doc.addImage(this.textToBase64Barcode(dado.codigo_documento), "PNG", margin_left, height, 45,  7); 
    height = height + 9 

    doc.setFontSize(8); 
    doc.text(dado.codigo_documento , margin_left +5 , height); 
    height = height + 3
    doc.text("Original", margin_left, height ); 
    let data_registo = dado.created_at.substring (0,10) +" "+   dado.created_at.substring (11,16) 
 
    doc.text(data_registo , margin_left + 18, height); 
   // doc.save('recibo_'+dado.codigo_documento);

 
 let blobdata = doc.output('blob');

 return blobdata

  }
  
  ticketDocumentoPdf2(dado: any) {



    const docWidth  = 100; // em mm
    const docHeight = 40; // em mm

   // let doc = new jsPDF( 'p', 'mm', [docHeight, docWidth]);
    let doc = new jsPDF();
 
    // http://raw.githack.com/MrRio/jsPDF/master/
  
    var height = 5
    var margin_left = 15 
    //  format x,y , w,h 
    doc.setFontSize(8); 
    doc.setFont("Helvetica","bold");

 
    console.log(dado) 
   // doc.setFont("Arial", "bold"); 
   
    doc.text("INAGBE", margin_left, height,  );  
    height = height + 1 
    doc.addImage(this.textToBase64Barcode(dado.codigo_documento), "PNG", margin_left, height, 45,  8); 
    height = height + 10 

    doc.text(dado.codigo_documento , margin_left +10 , height); 
    height = height + 3
    doc.text("Recibo", margin_left, height ); 
    let data_registo = dado.created_at.substring (0,10) +" "+   dado.created_at.substring (11,19) 
 
    doc.text(data_registo , margin_left + 20, height); 
    doc.save('recibo_'+dado.codigo_documento);


 //   var base64string = doc.output('datauristrlng');
 //  this. debugBase64( base64string );
  }
  
    debugBase64(base64URL){
      var win = window.open();
      win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }

  generatePdfhtml2canvas(data: any, namePDF: string) {


    console.log(namePDF)
    html2canvas(data, { allowTaint: true, scale: 2 }).then(canvas => {
      let HTML_Width = canvas.width;
      let HTML_Height = canvas.height;
      let top_left_margin = 10;
      let PDF_Width = HTML_Width + (top_left_margin * 2);
      let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      let canvas_image_width = HTML_Width;
      let canvas_image_height = HTML_Height;
      let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
      canvas.getContext('2d');
      let imgData = canvas.toDataURL("image/jpeg", 1.0);
      // let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);

      var pdf = new jsPDF('l', 'mm', [297, 210]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height, 'FAST');
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([PDF_Width, PDF_Height], 'p');
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height, 'FAST');
      }
      pdf.save(namePDF);
    });

  }
}

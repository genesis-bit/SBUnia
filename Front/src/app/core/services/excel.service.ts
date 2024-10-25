import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


import { DatePipe } from '@angular/common';

import { Workbook } from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {


  constructor(private datePipe: DatePipe) { }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(jsonData: any[], fileName: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }




  async generateExcel(dados: any, instituicao: any, filtro: any, header: any, format_colunas: any) {

    // Excel Title, Header, Data
    const title = filtro.titulo;

    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('documento');

    // Add Image
    // const logo = workbook.addImage({ base64: instituicao.logotipo, extension: 'png', });
    //  worksheet.addImage(logo, 'A1:A4');
    worksheet.mergeCells('A1:A4');
    // Add Row and formatting

    const nomeInstituicao = worksheet.addRow(["INSTITUTO NACIONAL DE EMERGENCIAS MEDICAS"]);
    nomeInstituicao.font = { name: 'Calibri', family: 4, size: 12, bold: true };
    const subTitleNif = worksheet.addRow(['NIF : 5000282936'  ]);

    const subTitleEnderco = worksheet.addRow(['ENDEREÇO SEDE : Rua do MAT, Complexo Administrativo Classico do Talatona' ]);


    const subTitleReferencia = worksheet.addRow(['REFERENCIA  PERIÓDO :' + filtro.periodo]);

    const subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);
    subTitleReferencia.font = { bold: true };
    subTitleRow.font = { bold: true };
    subTitleNif.font = { bold: true };
    subTitleEnderco.font = { bold: true };
    // Blank Row
    worksheet.addRow([]);
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Calibri', family: 4, size: 16, bold: true };
    worksheet.addRow([]);

    worksheet.addRow([filtro?.modelo_mapa]);
    worksheet.addRow([]);
    // Add Header Row
    const headerRow = worksheet.addRow(header);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: filtro?.fgColor_titulo ? filtro.fgColor_titulo : 'FFFFFF00' },
        bgColor: { argb: filtro?.bgColor_titulo ? filtro.bgColor_titulo : '0C7DA7' }

      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    const data = dados
    // Add Data and Conditional Formatting

    let position = 1


    for (let d of data) {

      const row = worksheet.addRow(d);
      row.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFFFF' },
          bgColor: { argb: 'FFFFFF' }
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: format_colunas[position]?.horizontal
        }
        position++
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });
      position = 1
    }



    let numero_colunas: any
    for (let fc of format_colunas) {
      worksheet.getColumn(fc.id).width = fc.width;
      numero_colunas = fc.id;
    }

    worksheet.addRow([]);
    let file_name = filtro.titulo + "_" + filtro.periodo;
    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, file_name + '.xlsx');
    });

  }

}

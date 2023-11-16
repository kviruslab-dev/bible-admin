import * as FileSaver from 'file-saver';
import { utils, write } from 'xlsx';

const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const excelFileExtension = '.xlsx';
const excelFileName = 'jae';

export const excelDownload = (excelData: any) => {
  const ws = utils.aoa_to_sheet([
    [`작성자_안재승`],
    [],
    /* Object.keys(excelData[0]) */ ['id', '이름', '휴대폰번호', '작업상태', '작성일자'],
  ]);
  excelData.map((data: any) => {
    utils.sheet_add_aoa(ws, [[data.id, data.name, data.phone, data.status, data.create_at]], { origin: -1 });
    // <-- 행 사이즈
    ws['!cols'] = [{ wpx: 250 }, { wpx: 250 }];
    return false;
  });
  const wb: any = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelButter = write(wb, { bookType: 'xlsx', type: 'array' });
  const excelFile = new Blob([excelButter], { type: excelFileType });
  FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
};

import * as FileSaver from 'file-saver';
import { utils, write } from 'xlsx';

const exportExcel = (excelData: any) => {
  const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelFileExtension = '.xlsx';
  const excelFileName = '작성자';

  const excelDownload = (excelData: any) => {
    const ws = utils.aoa_to_sheet([[`작성자_kkhcode`], [], ['제목', '내용']]);
    excelData.map((data: any) => {
      utils.sheet_add_aoa(ws, [[data.id, data.name, data.phone, data.status, data.create_at]], { origin: -1 });
      // <-- 행 사이즈
      ws['!cols'] = [{ wpx: 200 }, { wpx: 200 }];
      return false;
    });
    const wb: any = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelButter = write(wb, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelButter], { type: excelFileType });
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
  };
};

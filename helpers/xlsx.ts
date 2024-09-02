import { utils, writeFile } from "xlsx";

export const convertExcelFile = async (file_name, response) => {
  const contentDisposition = response.headers.get("Content-Disposition");
  let filename = `${file_name}.xlsx`; // 기본 파일 이름
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="(.+?)"/);
    if (!filenameMatch || filenameMatch.length === 2) {
      // eslint-disable-next-line prefer-destructuring
      filename = filenameMatch[1];
    }
  }
  // 응답 데이터를 `ArrayBuffer` 형식으로 변환
  const arrayBuffer = await response.arrayBuffer();
  // `ArrayBuffer`를 Blob으로 변환
  const blob = new Blob([arrayBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  // Blob을 가리키는 URL 생성
  const urlObject = URL.createObjectURL(blob);
  // 가상의 링크 생성
  const anchor = document.createElement("a");
  anchor.href = urlObject;
  anchor.download = filename;
  // 링크를 클릭하여 다운로드 트리거
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  return blob;
};

export const createXLSXTemplate = ({ sheets, columns, filename = "template" }) => {
  const wb = utils.book_new();
  sheets.forEach((sheet, i) => {
    const data = columns[i].map((column) => column.name);
    // 시트 생성
    const ws = utils.aoa_to_sheet([data]);
    // 엑셀 파일 생성
    utils.book_append_sheet(wb, ws, sheet);
  });
  // 파일 저장
  const fileName = `${filename}.xlsx`;
  writeFile(wb, fileName);
};

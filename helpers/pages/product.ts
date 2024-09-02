// 파일명 [sku]_[code].[확장자] 규칙
const codes = [
  "FRONT", // 정면컷
  "LOOK_BOOK_FIRST", // 룩북 여자 (or 남자)
  "D_45", // 측면컷
  "SIDE", // 사이드컷
  "LOOK_BOOK_SECOND", // 룩북 남자 (or 여자)
  "D_45_DETAIL", // 측면 디테일컷
  "SIDE_DETAIL", // 사이드 디테일컷
  "PACKAGE", // 패키지컷
  "ETC", // 임의처리
];

// 제품컷 파일명에 부합하는지 체크
export const isProductCut = (fileName: string) => {
  const code = fileName.split("_");
  return codes.some((codeName) => code.slice(1).join("_").includes(codeName));
};

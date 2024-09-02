import { http, HttpResponse } from "msw";

const dummyData = ({ name }) => ({
  sheet1: [
    {
      id: 1,
      name: `${name} sheet1 카테고리 1 test`,
      description: "sheet1 카테고리1 설명",
      code: "category1",
      is_active: true,
    },
    {
      id: 2,
      name: `${name} sheet1 카테고리 2`,
      description: "sheet1 카테고리2 설명",
      code: "category1",
      is_active: true,
    },
  ],
  sheet2: [
    {
      id: 1,
      name: `${name} sheet2 카테고리 1`,
      description: "sheet2 카테고리1 설명",
      code: "category2",
      is_active: true,
    },
    {
      id: 2,
      name: `${name} sheet2 카테고리 2`,
      description: "sheet2 카테고리2 설명",
      code: "category2",
      is_active: false,
    },
  ],
  sheet3: [
    {
      id: 1,
      name: `${name} sheet3 카테고리 1`,
      description: "sheet3 카테고리1 설명",
      code: "category3",
      is_active: false,
    },
    {
      id: 2,
      name: `${name} sheet3 카테고리 2`,
      description: "sheet3 카테고리2 설명",
      code: "category3",
      is_active: true,
    },
    {
      id: 3,
      name: `${name} sheet3 카테고리 3`,
      description: "sheet3 카테고리3 설명",
      code: "category3",
      is_active: false,
    },
  ],
});

const api = {
  // 벌크 노출
  getCategory: http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/category/bulk`, () =>
    HttpResponse.json(dummyData({ name: "category" })),
  ),
  getCampaign: http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/campaign/bulk`, () =>
    HttpResponse.json(dummyData({ name: "campaign" })),
  ),
  getMain: http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/main/bulk`, () =>
    HttpResponse.json(dummyData({ name: "main" })),
  ),
  getMainSub: http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/main/bulk/sub`, () =>
    HttpResponse.json(dummyData({ name: "main-sub" })),
  ),
  getProduct: http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/product/bulk`, () =>
    HttpResponse.json(dummyData({ name: "product" })),
  ),
  // 벌크 다운로드
  getCategoryDownload: http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/category/bulk/download`, () =>
    HttpResponse.json(dummyData({ name: "category" })),
  ),
  getCampaignDownload: http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/campaign/bulk/download`, () =>
    HttpResponse.json(dummyData({ name: "campaign" })),
  ),
  getMainDownload: http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/main/bulk/download`, () =>
    HttpResponse.json(dummyData({ name: "main" })),
  ),
  getMainSubDownload: http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/main/bulk/sub/download`, () =>
    HttpResponse.json(dummyData({ name: "main-sub" })),
  ),
  getProductDownload: http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/product/bulk/download`, () =>
    HttpResponse.json(dummyData({ name: "product" })),
  ),
  // 벌크 파일 -> S3 업로드
  postUploadPrivate: http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/common/upload-private`, () =>
    HttpResponse.json({ path: "/" }),
  ),
  // 벌크 S3 Path -> 벌크 DB 반영 (실패 처리)
  postCategory: http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/category/bulk`, () => {}),
  postCampaign: http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/campaign/bulk`, () => {}),
  postMain: http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/main/bulk`, () => {}),
  postMainSub: http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/main/bulk`, () => {}),
  postProduct: http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/catalog/product/bulk`, () => {}),
};

export const handlers = Object.values(api);

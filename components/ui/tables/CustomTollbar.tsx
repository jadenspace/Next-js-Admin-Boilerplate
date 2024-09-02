import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUIDataTableOptions } from "mui-datatables";
import { useRef } from "react";

import ImageUploaderModal from "@/components/ui/modals/ImageUploaderModal";
import { createXLSXTemplate, convertExcelFile } from "@/helpers/xlsx";
import { kyDefault } from "@/libs/fetchExtended";

export default function CustomToolbar({
  name,
  subName,
  url,
  sheets,
  columns,
}: MUIDataTableOptions & { subName?: string; url: string }) {
  const queryClient = useQueryClient();
  const useImageUploaderPage = name === "product" && !subName; // product 페이지
  const { mutate: uploadMutate } = useMutation({
    mutationFn: (data) => {
      return kyDefault.post(`${url.slice(1)}?path=${data}`).json();
    },
    onSuccess: async (data) => {
      if (!data?.result) return;
      alert("업로드가 완료되었습니다.");
      await queryClient.invalidateQueries({
        queryKey: url.split("/").slice(2),
      });
    },
    onError: async (error) => {
      alert(`업로드에 실패했습니다.\n(${error})`);
    },
    onSettled: async () => {
      fileRef.current.value = "";
    },
  });
  const fileRef = useRef(null);
  const onExport = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download`);
    await convertExcelFile(`${name}${subName ? `_subName` : ""}`, response);
  };
  const onTemplateDownload = () => {
    createXLSXTemplate({ sheets, columns, filename: `${name}${subName ? `_${subName}` : ""}_template` });
  };

  const onFileOpen = () => {
    fileRef.current.click();
  };
  const onUpload = async (e) => {
    if (!e.target.files.length) return;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    // note: fetch 에서 multipart/form-data 처리시 headers content-type 을 설정하지 않아야 함
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/common/upload-private?path=${encodeURIComponent(url.slice(1))}`,
      {
        method: "POST",
        body: formData,
      } as any,
    );
    const { path } = await res.json();
    // 앞 슬래시 제거된 path 로 벌크 호출
    uploadMutate(path.slice(1));
  };

  return (
    <>
      {useImageUploaderPage && <ImageUploaderModal />}
      <IconButton className="flex gap-1 !rounded" onClick={onFileOpen}>
        <ArrowUpwardIcon />
        <span className="text-[16px]">Import</span>
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={onUpload}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
      </IconButton>
      <IconButton className="flex gap-1 !rounded" onClick={onExport}>
        <DownloadIcon />
        <span className="text-[16px]">Export</span>
      </IconButton>
      <IconButton className="flex gap-1 !rounded" onClick={onTemplateDownload}>
        <DownloadIcon />
        <span className="text-[16px]">Template</span>
      </IconButton>
    </>
  );
}

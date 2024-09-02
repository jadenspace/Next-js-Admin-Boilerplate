import { Modal as BaseModal } from "@mui/base/Modal";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";

import Checkboxes from "@/components/ui/form-elements/Checkboxes";
import ImagePreviewUploader from "@/components/ui/tables/ImagePreviewUploader";
import { isProductCut } from "@/helpers/pages/product";
import i18n from "@/i18n";
import { kyDefault } from "@/libs/fetchExtended";

export default function ImageUploaderModal() {
  const queryClient = useQueryClient();
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const { mutate: multiUpload } = useMutation({
    mutationFn: async ({ body }) =>
      kyDefault.post(`admin/common/multi-upload?path=${encodeURIComponent("service/product/image")}`, { body }).json(),
    onError: async (error) => {
      alert(`S3 업로드에 실패했습니다.\n(${error})`);
    },
  });
  const { mutate: updateBulkImages } = useMutation({
    mutationFn: ({ body }) => kyDefault.post(`admin/catalog/product/bulk/image`, { json: body }).json(),
    onSuccess: async () => {
      alert("업로드가 완료되었습니다.");
      await queryClient.invalidateQueries({ queryKey: ["catalog", "product", "bulk"] });
    },
    onError: async (error) => {
      alert(`업로드에 실패했습니다.\n(${error})`);
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (props: { upload_branch: string[] }) => {
    // validation
    if (files.some((file) => !isProductCut(file.name))) {
      alert("이미지 파일명 규칙을 확인해주세요.");
      return;
    }

    // process
    const { upload_branch: countryList } = props;
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    multiUpload(
      {
        body: formData,
      },
      {
        onSuccess: async (data: { uploadPathList: []; urlList: [] }) => {
          const { urlList: imagePathList } = data;
          updateBulkImages({
            body: {
              countryList,
              imagePathList,
            },
          });
        },
      },
    );
    // handleClose();
  };

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      upload_branch: i18n.branch.slice(1).map((item) => item),
    },
  });
  const uploadBranch = watch("upload_branch" as any);
  return (
    <>
      <IconButton className="flex gap-1 !rounded" onClick={handleOpen}>
        <ArrowUpwardIcon />
        <span className="text-[16px]">Image Upload</span>
      </IconButton>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent>
          <div
            id="unstyled-modal-title"
            className="modal-title flex justify-between items-center h-[72px] m-0 bg-skyblue px-6"
          >
            <h2 className="text-white text-[24px] text-bold">Upload Product Image</h2>
            <Button onClick={handleClose}>
              <CloseIcon htmlColor="white" sx={{ fontSize: "48px" }} />
            </Button>
          </div>
          <div id="unstyled-modal-description" className="modal-description m-6 flex flex-col border">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-end items-center px-6 py-3 border-b">
                <Button
                  type="submit"
                  variant="contained"
                  className="text-[13px]"
                  disabled={!files.length || !uploadBranch.length}
                >
                  Upload
                </Button>
              </div>
              <div>
                <div className="flex w-[480px] mx-auto my-6">
                  <Checkboxes
                    options={i18n.branch.slice(1).map((item) => item)}
                    control={control}
                    name="upload_branch"
                    isAll
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      width: "100%",
                      "& .MuiFormControlLabel-root": {
                        display: "flex",
                        justifyContent: "center",
                      },
                      "& .MuiFormControlLabel-label": {
                        fontSize: "16px",
                        textTransform: "uppercase",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="border-t">
                <ImagePreviewUploader setFiles={setFiles} />
              </div>
            </form>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

const Backdrop = forwardRef<HTMLDivElement, { open?: boolean; className: string }>((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={`${open ? "base-Backdrop-open" : ""} ${className}`} ref={ref} {...other} />;
});

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")`
  //font-family: 'IBM Plex Sans', sans-serif;
  width: 1080px;
  font-weight: 500;
  text-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
  padding: 0;
  color: #1c2025;
`;

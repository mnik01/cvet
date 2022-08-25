import { formatFileSize } from "../utils/formatFileSize";
import { FC, useState } from "react";
import { Button } from "@mantine/core";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  PDF_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  MS_EXCEL_MIME_TYPE,
  MS_POWERPOINT_MIME_TYPE,
} from "@mantine/dropzone";

const allowedFileTypes = [
  ...IMAGE_MIME_TYPE,
  ...PDF_MIME_TYPE,
  ...MS_WORD_MIME_TYPE,
  ...MS_EXCEL_MIME_TYPE,
  ...MS_POWERPOINT_MIME_TYPE,
];

type ModalContentProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setOpenedModal: React.Dispatch<
    React.SetStateAction<"print" | "prices" | null>
  >;
};

export const ModalContent: FC<ModalContentProps> = ({
  files,
  setFiles,
  setOpenedModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState<"success" | "error" | "default">(
    "default"
  );
  const [printType, setPrintType] = useState<"colored" | "mono">("mono");

  const handlePrintTypeChange = () => {
    setPrintType((prevType) => (prevType === "mono" ? "colored" : "mono"));
  };

  const printPrices = {
    mono: { title: "Чёрно-белая", price: 5 },
    colored: { title: "Цветная", price: 25 },
  };

  const sendPrintRequestHandler = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append(file.name, file, file.name);
      }

      const response = await fetch('https://mnik01-cvet-be.deno.dev/', {
        method: 'POST',
        body: formData,
      });

      if(response.status === 200) {
        setModalState("success");
      } else {
        throw new Error(`${response.statusText} - ${response.status}`)
      }

    } catch (error) {
      setModalState("error");
    } finally {
      setIsLoading(false);
    }
  };

  const getFinalMarkup = () => {
    if (modalState === "success") {
      return (
        <div className="h-[378px] text-ui-black flex flex-col gap-3 text-center items-center justify-center">
          <div className="text-ui-green flex flex-col items-center">
            <svg
              strokeWidth={1.7}
              className="w-[91px] h-[91px]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.563 9.75a12.014 12.014 0 00-3.427 5.136L9 12.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
            <p className="font-bold text-xl">Отправлено</p>
          </div>
          <div className="font-medium text-sm">
            <p>Теперь вы можете оплатить и забрать</p>
            <p>у нас файлы по адресу:</p>
          </div>
          <a
            href="https://go.2gis.com/ui5tl"
            className="flex items-center border-b-[3px] border-dashed border-[#FED260] gap-1 "
          >
            <p className="font-semibold">Сибирский тракт, 24Г</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.4}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </a>
        </div>
      );
    }
    return (
      <div className="h-[378px] text-ui-black flex flex-col gap-2 text-center items-center justify-center">
        <div className="text-ui-red flex flex-col items-center">
          <svg
            strokeWidth={1.7}
            className="w-[91px] h-[91px]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-bold text-xl">Ошибка</p>
        </div>
        <div className="font-medium">
          <p>К сожалению произошла какая-то ошибка</p>
          <p>Попробуйте позже :(</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="font-medium text-lg">Заказать распечатку</p>
        <button onClick={() => setOpenedModal(null)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m-15 0l15 15"
            />
          </svg>
        </button>
      </div>
      <div>
        {modalState === "default" ? (
          <>
            {!files.length ? (
              <Dropzone
                loading={isLoading}
                className="rounded-xl mt-2"
                onDrop={(files) => {
                  setFiles(files);
                }}
                onReject={() => {
                  alert(
                    "Такой тип файлов мы не принимаем... Попробуйте: pdf, doc, docx, xlsx, png, jpg, jpeg"
                  );
                }}
                maxSize={3 * 1024 ** 2}
                accept={allowedFileTypes}
                styles={{ root: { border: `3px dashed #C2C2C2` } }}
              >
                <div className="flex items-center text-ui-gray flex-col justify-center min-h-[220px] pointer-events-none">
                  <Dropzone.Accept>
                    <svg
                      className="w-[50px] h-[50px]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M14.563 12a12.014 12.014 0 00-3.427 5.136L9 15m1.5-12.75H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <svg
                      className="w-[50px] h-[50px]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <svg
                      className="w-[50px] h-[50px]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </Dropzone.Idle>
                  <div className="text-center mt-3 font-medium">
                    <p>Нажмите сюда</p>
                    <p>Что бы загрузить файлы</p>
                  </div>
                </div>
              </Dropzone>
            ) : (
              <div className="bg-[#F1F1F1] min-h-[220px] p-4 text-ui-gray rounded-xl mt-2">
                <p>Выбранные файлы:</p>
                <ul className="list-inside list-disc">
                  {files.map((file, index) => (
                    <li key={`${file.name}-${file.size}-${index}`} className="flex justify-between">
                      <p className="pl-3">{file.name}</p>
                      <p>{formatFileSize(file.size)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div
              className={`${
                !!files.length ? "visible" : "invisible"
              } flex overflow-hidden justify-between w-full mt-4 h-11 text-ui-black rounded-lg hover:bg-ui-orange-mute`}
            >
              <button
                onClick={handlePrintTypeChange}
                className="w-full cursor-pointer items-center flex justify-between px-4 bg-[#F4F4F4]"
              >
                <div>{printPrices[printType].title}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="bg-ui-orange-main flex gap-1 items-center justify-center w-36">
                <p className="text-xs text-ui-black">итого: </p>
                <p>{printPrices[printType].price * files.length}₽</p>
              </div>
            </div>
            <Button
              disabled={!files.length}
              loading={isLoading}
              onClick={sendPrintRequestHandler}
              className="w-full mt-4 h-11 bg-ui-orange-main uppercase text-ui-black tracking-widest rounded-lg disabled:hover:bg-[#E9ECEF] hover:bg-ui-orange-mute"
            >
              отправить
            </Button>
          </>
        ) : (
          getFinalMarkup()
        )}
      </div>
    </>
  );
};

import { Modal } from "@mantine/core";
import { useState } from "react";
import mapUrl from "./assets/map.png";
import wordIconPath from "./assets/back_word.png";
import excelIconPath from "./assets/back_excel.png";
import pdfIconPath from "./assets/back_pdf.png";
import rarIconPath from "./assets/back_rar.png";
import { ModalContent } from "./components/ModalContent";

export default function App() {
  const [openedModal, setOpenedModal] = useState<null | "print" | "prices">(
    null
  );
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);


  return (
    <div className="h-screen bg-ui-pre-white text-ui-black">
      <Modal
        opened={!!openedModal}
        onClose={() => {
          setOpenedModal(null);
          setUploadedFiles([]);
        }}
        withCloseButton={false}
        transitionDuration={0}
        lockScroll={false}
        classNames={{ modal: "absolute bottom-0 w-full rounded-t-2xl" }}
      >
        {openedModal === "prices" ? (
          <>
            <div className="flex justify-between">
              <p className="font-medium text-lg">Цены на товары и услуги</p>
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
            <ul className="mt-4 space-y-2">
              <li className="flex text-md justify-between">
                <p>Распечатка <b className="text-ui-gray text-xs">ч/б</b></p>
                <p>5 ₽</p>
              </li>
              <li className="flex text-md justify-between">
                <p>Распечатка</p>
                <p>25 ₽</p>
              </li>
              <li className="flex text-md justify-between">
                <p>Сканирование</p>
                <p>7 ₽</p>
              </li>
              <li className="flex text-md justify-between">
                <p>Ксеро-копия <b className="text-ui-gray text-xs">ч/б</b></p>
                <p>7 ₽</p>
              </li>
              <li className="flex text-md justify-between">
                <p>Ламинирование</p>
                <p>40 ₽</p>
              </li>
              <li className="flex text-md justify-between">
                <p className="flex gap-1 items-center">
                  Фото 3x4
                  <p className="text-xs font-bold text-ui-gray">(4шт)</p>
                </p>
                <p>250 ₽</p>
              </li>
              <li className="flex text-md justify-between">
                <p className="flex gap-1 items-center">
                  Дополнительные фото 3x4
                  <p className="text-xs font-bold text-ui-gray">(2шт)</p>
                </p>
                <p>50 ₽</p>
              </li>
              <li className="flex text-md justify-between">
                <p>Чехлы на телефон</p>
                <p>240 - 290 ₽</p>
              </li>
              <li className="flex text-md justify-between">
                <p>Зарядки на телефон</p>
                <p>250 - 500 ₽</p>
              </li>
              <li className="flex text-md justify-between">
                <p>Наушники на телефон</p>
                <p>250 - 2000 ₽</p>
              </li>
            </ul>
            <p className="font-medium text-sm text-ui-gray text-center mt-4">
              Цены указаны за 1 лист с одной стороны
            </p>
          </>
        ) : (
          <ModalContent
            setFiles={setUploadedFiles}
            files={uploadedFiles}
            setOpenedModal={setOpenedModal}
          />
        )}
      </Modal>
      <div className="flex h-full flex-col justify-between relative overflow-x-clip">
        <div className="pointer-events-none h-full w-full overflow-clip opacity-30 absolute top-0 left-0">
          <img
            className="w-16 h-16 absolute top-32 -left-6 -rotate-12"
            src={wordIconPath}
            alt="backgroundImage"
          />
          <img
            className="w-16 h-16 absolute top-48 -right-4 rotate-[8deg]"
            src={excelIconPath}
            alt="backgroundImage"
          />
          <img
            className="w-16 h-16 absolute bottom-48 -left-4 rotate-[20deg]"
            src={pdfIconPath}
            alt="backgroundImage"
          />
          <img
            className="w-16 h-16 absolute bottom-8 -right-6 -rotate-[15deg]"
            src={rarIconPath}
            alt="backgroundImage"
          />
        </div>
        <header className="bg-ui-blue p-2 text-center text-xl font-medium text-white md:text-left">
          <h1>
            Копи-центр
          </h1>
        </header>
        <main className="flex z-10 gap-4 h-full flex-col justify-between px-4 pt-4">
          <div className="w-full rounded-lg bg-ui-white p-4 shadow-md">
            <h2>Что мы делаем?</h2>
            <ul className="list-inside list-disc text-ui-gray">
              <li>Ксеро-копия документов</li>
              <li>Распечатка</li>
              <li>Сканирование</li>
              <li>Ламинат</li>
              <li>Фото 3x4</li>
              <li>Печать фото 10x15</li>
              <li>Продажа чехлов, наушников, зарядок на телефон</li>
            </ul>
          </div>
          <div className="w-full flex flex-col justify-between h-full rounded-lg bg-ui-white p-4 shadow-md">
            <h2 className="mb-2 text-lg">Где мы находимся?</h2>
            <a className="grow pb-2" href="https://go.2gis.com/ui5tl">
              <div
                style={{ backgroundImage: `url(${mapUrl})` }}
                className="h-full relative cover bg-no-repeat rounded-lg bg-center"
              >
                <div className="absolute right-0 top-0 bg-ui-white p-2 flex items-center justify-center m-2 rounded-lg text-ui-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </div>
              </div>
            </a>
            <p className="text-sm text-ui-gray">Сибирский тракт, 24г</p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <button
              onClick={() => setOpenedModal("print")}
              className="bg-ui-orange-main hover:bg-ui-orange-mute rounded-lg py-2 uppercase transition-colors"
            >
              заказать распечатку
            </button>
            <button
              onClick={() => setOpenedModal("prices")}
              className="bg-ui-orange-main hover:bg-ui-orange-mute rounded-lg py-2 uppercase transition-colors"
            >
              узнать цены
            </button>
          </div>
        </main>
        <footer className="py-3 text-center text-sm text-ui-gray">
          <p>8-922-136-88-89</p>
          <p>romanso445@gmail.com</p>
        </footer>
      </div>
    </div>
  );
}

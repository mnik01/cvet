import {
  Dropzone,
  IMAGE_MIME_TYPE,
  PDF_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  MS_EXCEL_MIME_TYPE,
  MS_POWERPOINT_MIME_TYPE,
} from '@mantine/dropzone';
import { Modal, Button } from '@mantine/core';
import { useState } from "react"
import mapUrl from './assets/map.png'

export default function App() {
  const [openedModal, setOpenedModal] = useState<null | 'print' | 'prices'>(null)
  const [isLoading, setIsLoading] = useState(false)
  const allowedFileTypes = [
      ...IMAGE_MIME_TYPE,
      ...PDF_MIME_TYPE,
      ...MS_WORD_MIME_TYPE,
      ...MS_EXCEL_MIME_TYPE,
      ...MS_POWERPOINT_MIME_TYPE,
    ]

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const modalContent = openedModal === 'print' ? (
    <>
      <div className="flex justify-between">
        <p className="font-medium text-lg">Заказать распечатку</p>
        <button onClick={() => setOpenedModal(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m-15 0l15 15" />
          </svg>
        </button>
      </div>
      {!uploadedFiles.length ?
        <Dropzone
          loading={isLoading}
          className="rounded-xl mt-2"
          onDrop={(files) => {setUploadedFiles(files)}}
          maxSize={3 * 1024 ** 2}
          accept={allowedFileTypes}
          styles={{root: { border: `3px dashed #C2C2C2` }}}
        >
          <div className="flex items-center text-ui-gray flex-col justify-center min-h-[220px] pointer-events-none">
            <Dropzone.Accept>
              <svg className="w-[50px] h-[50px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M14.563 12a12.014 12.014 0 00-3.427 5.136L9 15m1.5-12.75H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </Dropzone.Accept>
            <Dropzone.Reject>
              <svg className="w-[50px] h-[50px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </Dropzone.Reject>
            <Dropzone.Idle>
              <svg className="w-[50px] h-[50px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </Dropzone.Idle>
            <div className="text-center mt-3 font-medium">
              <p>Нажмите сюда</p>
              <p>Что бы загрузить файлы</p>
            </div>
          </div>
        </Dropzone>
      : (
        <div className="bg-[#F1F1F1] min-h-[220px] p-4 text-ui-gray rounded-xl mt-2">
          <p>Выбранные файлы:</p>
          <ul className="list-inside list-disc">
            {uploadedFiles.map(file => (
              <li className="flex justify-between"><p className="pl-3">{file.name}</p><p>{file.size} kb</p></li>
            ))}
          </ul>
        </div>
      )}
        <Button className={`${!!uploadedFiles.length ? 'visible' : 'invisible'} w-full mt-4 h-11 bg-ui-orange-main uppercase text-ui-black tracking-widest rounded-lg hover:bg-ui-orange-mute`}>
          отправить
        </Button>
        <Button loading={isLoading} onClick={() => {setIsLoading(true)}} className="w-full mt-4 h-11 bg-ui-orange-main uppercase text-ui-black tracking-widest rounded-lg hover:bg-ui-orange-mute">
          отправить
        </Button>

    </>
  ) : (
    <>
      <div className="flex justify-between">
        <p className="font-medium text-lg">Цены на товары и услуги</p>
        <button onClick={() => setOpenedModal(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m-15 0l15 15" />
          </svg>
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        <li className="flex text-md justify-between">
          <p>Распечатка ч/б</p>
          <p>20 ₽</p>
        </li>
        <li className="flex text-md justify-between">
          <p>Распечатка цветная</p>
          <p>45 ₽</p>
        </li>
        <li className="flex text-md justify-between">
          <p>Сканирование документа</p>
          <p>30 ₽</p>
        </li>
        <li className="flex text-md justify-between">
          <p>Ксеро-копия ч/б</p>
          <p>20 ₽</p>
        </li>
        <li className="flex text-md justify-between">
          <p>Ксеро-копия цветная</p>
          <p>45 ₽</p>
        </li>
        <li className="flex text-md justify-between">
          <p>Ламинирование</p>
          <p>70 ₽</p>
        </li>
        <li className="flex text-md justify-between">
          <p>Установка защитного стекла на телефон</p>
          <p>325 ₽</p>
        </li>
        <li className="flex text-md justify-between">
          <p>Фото 3x4 на паспорт</p>
          <p>440 ₽</p>
        </li>
      </ul>
      <p className="font-medium text-sm text-ui-gray text-center mt-4">Цены указаны за 1 лист с одной стороны</p>
    </>
  )

  return (
    <div className="h-screen bg-ui-pre-white text-ui-black">
       <Modal
        opened={!!openedModal}
        onClose={() => setOpenedModal(null)}
        withCloseButton={false}
        transitionDuration={0}
        lockScroll={false}
        classNames={{ modal: 'absolute bottom-0 w-full rounded-t-2xl' }}
      >
        {modalContent}
      </Modal>
      <div className="flex h-full flex-col justify-between">
        <header className="bg-ui-blue p-2 text-center text-xl font-medium text-white md:text-left">Копи-центр</header>
        <main className="flex gap-4 h-full flex-col justify-between px-4 pt-4">
          <div className="w-full rounded-lg bg-ui-white p-4 shadow-md">
            <p>Что мы делаем?</p>
            <ul className="list-inside list-disc text-ui-gray">
              <li>Ксеро-копия документов</li>
              <li>Распечатка</li>
              <li>Сканирование</li>
              <li>Ламинат</li>
              <li>Видео-монтаж</li>
              <li>Обработка фото</li>
              <li>Фото 3x4 на паспорт</li>
              <li>Продажа чехлов, наушников, зарядок на телефон</li>
            </ul>
          </div>
          <div className="w-full flex flex-col justify-between h-full rounded-lg bg-ui-white p-4 shadow-md">
            <p className="mb-2 text-lg">Где мы находимся?</p>
            <a className="grow pb-2" href="https://go.2gis.com/ui5tl">
              <div style={{backgroundImage: `url(${mapUrl})`}} className="h-full cover bg-no-repeat rounded-lg bg-center"></div>
            </a>
            <p className="text-sm text-ui-gray">Сибирский тракт, 24г</p>
          </div>
          <div className="flex w-full flex-col gap-2">
            {/* <button onClick={() => setOpenedModal('print')} className="bg-ui-orange-main hover:bg-ui-orange-mute rounded-lg py-2 uppercase transition-colors">заказать распечатку</button> */}
            <button onClick={() => setOpenedModal('prices')} className="bg-ui-orange-main hover:bg-ui-orange-mute rounded-lg py-2 uppercase transition-colors">узнать цены</button>
          </div>
        </main>
        <footer className="py-3 text-center text-sm text-ui-gray">
          <p>8-912-236-77-85</p>
          <p>maksimgrinberg01@gmail.com</p>
        </footer>
      </div>
    </div>
  )
}

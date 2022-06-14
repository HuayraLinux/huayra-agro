import { useState, useEffect, useRef } from 'react';

import { pdfjs, Document, Page } from 'react-pdf';

import { EmojiButton } from 'components';
import { ArrowLeft, ArrowRight } from 'assets/emojis';

import Wrapper from './style';
pdfjs.GlobalWorkerOptions.workerSrc = './pdf.worker.min.js'

export default ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoadad] = useState(false);
  const viewerEl = useRef(null);

  const onPDFLoad = ({ numPages }) => {
    setNumPages(numPages);
    setLoadad(true);
  };
  
  useEffect(() => {
    setLoadad(false);
    setCurrentPage(1);
    setNumPages(null);
  }, [file]);

  useEffect(() => {
    if (!viewerEl) return;
    viewerEl.current.scrollIntoView({ behavior: 'smooth' });
  }, [currentPage]);

  return (
    <Wrapper.Main key={file} ref={viewerEl}>
      <div className="justify-self-end mr-12">
        <EmojiButton src={ArrowLeft}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage - 1 === 0}
          title="Página previa"
        />
      </div>
      <div className="justify-self-start ml-12">
        <EmojiButton src={ArrowRight}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage + 1 > numPages}
          title="Página siguiente"
        />
      </div>
      {
        numPages &&
        <div className="col-span-2 text-center italic">{ currentPage } / { numPages }</div>
      }
      <div className="col-span-2 mt-4">
        <div className="h-screen flex flex-col items-center">

          <Document key={file} file={file} onLoadSuccess={onPDFLoad}>
            { loaded && <Page pageNumber={currentPage} /> }
          </Document>
          {
            numPages &&
            <div className="col-span-2 text-center italic">{ currentPage } / { numPages }</div>
          }
          <div className="flex">
            <div className="mr-12">
              <EmojiButton src={ArrowLeft}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage - 1 === 0}
                title="Página previa"
              />
            </div>
            <div className="ml-12">
              <EmojiButton src={ArrowRight}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage + 1 > numPages}
                title="Página siguiente"
              />
            </div>
          </div>
        </div>
      </div>

    </Wrapper.Main>
  );
};

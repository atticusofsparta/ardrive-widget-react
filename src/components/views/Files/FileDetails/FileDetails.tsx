import DocViewer, {
  DocRenderer,
  DocViewerRenderers,
} from '@cyntler/react-doc-viewer';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Arweave from 'arweave';
import { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import ReactPlayer from 'react-player';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { eventEmitter } from '../../../../utils/constants';
import {
  decodeJsonDataUri,
  decodeStringDataUri,
  formatByteCount,
} from '../../../../utils/searchUtils';
import { FileDownloadIcon } from '../../../icons';
import CopyTextButton from '../../../inputs/buttons/CopyTextButton/CopyTextButton';
import CircleProgressBar from '../../../progress/CircleProgressBar/CircleProgressBar';

function FileDetails({ row, hideOnCopy }: { row: any; hideOnCopy?: boolean }) {
  const [meta, setMeta] = useState<any>({});
  const [mime, setMime] = useState<any>('');

  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  });

  useEffect(() => {
    arweave.transactions
      .getData(row.txId, { decode: true, string: true })
      .then((val: string | Uint8Array) => {
        const data = val.toString();
        setMeta(JSON.parse(data));
        const highMimeType = JSON.parse(data)?.dataContentType.split('/')[0];
        setMime(highMimeType);
      });
  }, [row]);

  const CustomHTMLRenderer: DocRenderer = ({
    mainState: { currentDocument },
  }: {
    mainState: Record<string, any>;
  }) => {
    if (!currentDocument) return null;

    return (
      <div
        id="widget-html-renderer"
        style={{
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          height: window.innerHeight - window.innerHeight * 0.25,
        }}
      >
        <iframe
          title="html-renderer"
          src={currentDocument.uri}
          style={{ overflow: 'scroll', display: 'flex', height: '100%' }}
          width={'100%'}
        ></iframe>
      </div>
    );
  };

  CustomHTMLRenderer.fileTypes = ['html', 'text/html'];
  CustomHTMLRenderer.weight = 1;

  const CustomJSONRenderer: DocRenderer = ({
    mainState: { currentDocument },
  }: {
    mainState: Record<string, any>;
  }) => {
    if (!currentDocument) return null;

    let data: any = {};
    if (
      currentDocument.fileData &&
      typeof currentDocument.fileData === 'string'
    ) {
      data = decodeJsonDataUri(currentDocument.fileData) ?? {};
    }

    return (
      <div
        id="widget-json-renderer"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          width: '100%',
          height: 'fit-content',
        }}
      >
        <ReactJson
          src={data}
          theme={'ashes'}
          name={currentDocument.fileName}
          groupArraysAfterLength={100}
          quotesOnKeys={false}
          style={{
            display: 'flex',
            width: '100%',
            border: 'solid white 2px',
            background: 'var(--background-dark-theme)',
            padding: '10px',
          }}
        />
      </div>
    );
  };

  CustomJSONRenderer.fileTypes = ['json', 'application/json'];
  CustomJSONRenderer.weight = 1;

  const CustomCodeRenderer: DocRenderer = ({
    mainState: { currentDocument },
  }: {
    mainState: Record<string, any>;
  }) => {
    const [formatted, setFormatted] = useState<string | null>(null);
    const [language, setLanguage] = useState<string>('text');
    const [show, setShow] = useState<boolean>(true);

    useEffect(() => {
      if (
        currentDocument &&
        currentDocument.fileData &&
        typeof currentDocument.fileData === 'string'
      ) {
        const data = decodeStringDataUri(currentDocument.fileData) ?? '';
        const fileExt = meta.name?.split('.')?.pop()?.toLowerCase() ?? '';
        // TODO: map file extensions to languages supported by react-syntax-highlighter, improve mime type detection
        setLanguage(
          fileExt === 'tsx' || fileExt === 'jsx' || fileExt === 'ts'
            ? fileExt
            : currentDocument.fileType?.split('/')[1] ?? 'text',
        );
        setFormatted(data);
        if (meta.size > 1_000_000) {
          setShow(false);
        }
      }
    }, []);

    if (!formatted) return null;

    return (
      <div
        id="widget-json-renderer"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          width: '100%',
          height: 'fit-content',
        }}
      >
        {show ? (
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={true}
          >
            {formatted}
          </SyntaxHighlighter>
        ) : (
          <div className="flex-column center" style={{ gap: '20px' }}>
            {/*
          TODO: add code formatter to format files (eg prettier)
          TODO: add react render virtualization. Attempted to with this package, but its broken: https://github.com/conorhastings/react-syntax-highlighter-virtualized-renderer/blob/master/src/index.jsx  */}
            <span className="textMedium white">
              The selected {language} file is large (
              {formatByteCount(meta.size)}) and may cause issues rendering. Do
              you wish to continue?
            </span>
            <button
              className="button-primary white"
              style={{ height: '30px', fontSize: '16px' }}
              onClick={() => setShow(true)}
            >
              Render File
            </button>
          </div>
        )}
      </div>
    );
  };
  CustomCodeRenderer.fileTypes = [
    'text',
    'javascript',
    'text/javascript',
    'tsx',
    'jsx',
    'application/octet-stream',
    'application/javascript',
    'application/x-javascript',
    'application/typescript',
    'application/x-typescript',
    'application/x-sh', // Shell script
    'application/x-python-code', // Python
    'application/x-ruby', // Ruby
    'application/x-perl', // Perl
    'application/x-php', // PHP
    'application/sql', // SQL
    'application/json', // JSON
    'application/ld+json', // JSON-LD
    'application/x-yaml', // YAML
    'application/x-tex', // TeX
    'application/x-latex', // LaTeX
    'application/vnd.api+json', // JSON API
    'application/graphql', // GraphQL
    'text/css',
    'text/plain',
    'text/xml',
    'text/x-',
    'text/yaml',
    'application/postscript',
    'application/vnd.ms-fontobject', // EOT font files
    'application/font-woff', // WOFF font files
    'application/font-woff2', // WOFF2 font files
    'application/x-font-ttf', // TTF font files
    'application/x-font-otf', // OTF font files
    'application/x-font-bdf', // BDF font files
    'application/x-font-pcf', // PCF font files
    'application/x-font-speedo', // Speedo font files
    'application/x-font-type1', // Type 1 font files
    'application/vnd.ms-opentype', // OpenType font files
    'application/vnd.oasis.opendocument.text', // ODT files
    'application/vnd.oasis.opendocument.spreadsheet', // ODS files
    'application/vnd.oasis.opendocument.presentation', // ODP files
    'application/vnd.oasis.opendocument.graphics', // ODG files
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX files
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX files
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX files
    'application/vnd.ms-excel', // XLS files
    'application/vnd.ms-powerpoint', // PPT files
    'application/msword', // DOC files
    'application/rtf', // RTF files
    'application/csv', // CSV files
    'application/tsv', // TSV files
    'application/vnd.mozilla.xul+xml', // XUL files
    'application/rss+xml', // RSS feed files
    'application/atom+xml', // Atom feed files
    'application/pkix-cert', // X.509 certificates
    'application/pkix-crl', // X.509 CRLs
    'application/pkcs12', // PKCS #12 files
    'application/pkcs7-mime', // PKCS #7 files
    'application/x-x509-ca-cert', // CA certificates
    'application/x-x509-user-cert', // User certificates
    'application/x-pkcs7-certificates', // PKCS #7 certificate chain
    'application/x-pkcs7-certreqresp', // PKCS #7 certificate request response
    'application/x-pkcs7-signature', // PKCS #7 detached signature
  ];

  CustomCodeRenderer.weight = 1;

  async function downloadFile(url: string, name: string) {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div
      className="flex-column"
      style={{ gap: '15px', width: '100%', paddingRight: '5px' }}
    >
      {meta && meta.dataTxId ? (
        <>
          {mime === 'video' || mime === 'audio' ? (
            <>
              <ReactPlayer
                url={`https://arweave.net/${meta.dataTxId}`}
                controls={true}
                light={false}
                width={'100%'}
                height={'100%'}
                pip={true}
              />
            </>
          ) : (
            <>
              <DocViewer
                prefetchMethod="GET"
                documents={[
                  {
                    uri: `https://arweave.net/${meta.dataTxId}`,
                  },
                ]}
                pluginRenderers={[
                  ...DocViewerRenderers,
                  CustomHTMLRenderer,
                  CustomJSONRenderer,
                  CustomCodeRenderer,
                ]}
                theme={{
                  primary: 'var(--primary)',
                  secondary: '--text-dark-theme',
                  tertiary: 'var(--input-placeholder)',
                  textPrimary: '#ffffff',
                  textSecondary: '#5296d8',
                  textTertiary: 'var(--input-placeholder)',
                  disableThemeScrollbar: false,
                }}
                language="en"
                style={{
                  display: 'flex',
                  background: 'var(--background-dark-theme)',
                  overflow: 'hidden',
                  width: '100%',
                }}
                config={{
                  header: {
                    disableHeader: true,
                  },
                  loadingRenderer: {
                    overrideComponent: () => (
                      <div className={'flex-row justify-center align-center'}>
                        <CircleProgressBar size={80} color="var(--primary)" />
                      </div>
                    ),
                  },
                  noRenderer: {
                    overrideComponent: () => (
                      <div
                        className={'flex flex-column center white'}
                        style={{ width: '100%', gap: '20px', padding: '20px' }}
                      >
                        File preview unavailable for that mime type.
                      </div>
                    ),
                  },
                }}
              />{' '}
            </>
          )}{' '}
        </>
      ) : (
        <></>
      )}
      <div className="flex-row space-between" style={{ width: '100%' }}>
        <span className="flex-column textMedium white">
          File ID:
          <br />
          <span
            className="textSmall"
            style={{ color: 'var(--text-subtle)', fontSize: '10px' }}
          >
            {row.entityId.toString()}
          </span>
        </span>
        <CopyTextButton
          copyText={row.entityId.toString()}
          position="static"
          copyButtonStyle={{
            cursor: 'pointer',
            fill: 'var(--foreground-muted)',
          }}
        />
      </div>

      <div className="flex-row space-between" style={{ width: '100%' }}>
        <span className="flex-column textMedium white">
          Data ID:
          <br />
          <span
            className="textSmall"
            style={{ color: 'var(--text-subtle)', fontSize: '10px' }}
          >
            {row.txId.toString()}
          </span>
        </span>
        <div className="flex-row center" style={{ gap: '10px' }}>
          {/* Copy Button */}
          <CopyTextButton
            onCopy={() => {
              eventEmitter.emit('TX_COPY', row.txId.toString());
              if (hideOnCopy) {
                eventEmitter.emit('HIDE_ARDRIVE_WIDGET');
              }
            }}
            copyText={meta.dataTxId?.toString()}
            position="static"
            copyButtonStyle={{
              cursor: 'pointer',
              fill: 'var(--foreground-muted)',
            }}
          />
          {/* Download Button */}
          <button
            className="button flex-column center"
            onClick={() =>
              downloadFile(`https://arweave.net/${meta.dataTxId}`, row.name)
            }
          >
            <FileDownloadIcon
              width={15}
              height={15}
              fill={'var(--foreground-muted)'}
            />
          </button>

          {/* External Link Button */}
          <a
            className="button flex-column center"
            href={`https://arweave.net/${meta.dataTxId}`}
            rel="noreferrer"
            target="_blank"
          >
            <ExternalLinkIcon
              width={15}
              height={15}
              color="var(--foreground-muted)"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FileDetails;

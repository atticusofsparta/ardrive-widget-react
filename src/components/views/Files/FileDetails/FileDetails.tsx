import ReactPlayer from 'react-player';
import { CopyIcon } from '../../../icons';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import Arweave from 'arweave';
import {useState, useEffect} from 'react'
import CircleProgressBar from '../../../progress/CircleProgressBar/CircleProgressBar';

function FileDetails({ row }: { row: any }) {

  const [meta, setMeta] = useState<any>({})
  const [mime, setMime] = useState<any>("")

  const arweave = Arweave.init({})

  useEffect(()=>{
    arweave.transactions.getData(row.txId, {decode: true, string: true}).then((val:string | Uint8Array)=>{
      const data = val.toString()
      setMeta(JSON.parse(data))
      const highMimeType = JSON.parse(data)?.dataContentType.split('/')[0]
      setMime(highMimeType)
      console.log(data)
      console.log(JSON.parse(data)?.dataTxId)
    })
  },[row])

  return (
    <div
      className="flex-column"
      style={{ gap: '15px', width: '100%', paddingRight: '5px' }}
    >{ meta && meta.dataTxId  ? <>
        {mime === "video" || mime === "audio" ? <>
      <ReactPlayer 
      url={`https://arweave.net/${meta.dataTxId}`}
      controls={true}
      light={false}
      width={'100%'}
      height={'100%'}
      pip={true}
      

      /></> : <>
    <DocViewer 
      documents={[{uri: `https://arweave.net/${meta.dataTxId}`}]}
      pluginRenderers={DocViewerRenderers}
      theme={{
        primary: "var(--primary)",
        secondary: "--text-dark-theme",
        tertiary: "green",
        textPrimary: "#ffffff",
        textSecondary: "#5296d8",
        textTertiary: "green",
        disableThemeScrollbar: false,
      }}
      language='en'
      style={{
        display: "flex",
        background:"var(--background-dark-theme)",
        overflow: "hidden",
        width: "100%",
      }}
      config={{
        header:{
          disableHeader: true,
        },
        loadingRenderer: {
          overrideComponent:({document, fileName})=> <div className={'flex-row justify-cente align-center'}><CircleProgressBar size={80} color='var(--primary)' /></div>,
        },

      }}
      /> </> } </>: <></>
      }<div className="flex-row space-between" style={{ width: '100%' }}>
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
        <button className="button flex-column center">
          <CopyIcon width={15} height={15} fill={'var(--foreground-muted)'} />
        </button>
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
        <button className="button flex-column center">
          <CopyIcon width={15} height={15} fill={'var(--foreground-muted)'} />
        </button>
      </div>
    </div>
  );
}

export default FileDetails;

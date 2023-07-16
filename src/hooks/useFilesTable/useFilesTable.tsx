import {useState, useEffect} from 'react'
import { ChevronDownIcon, FileCodeIcon, FileMusicIcon, FileTextIcon, FolderIcon, MovieIcon, VideoIcon } from '../../components/icons'
import { ArFSDriveEntity, ArFSPublicFile, ArFSPublicFolder } from '@atticusofsparta/arfs-lite-client'
import { set } from 'lodash'
import { formatByteCount } from '../../utils/searchUtils'



function useFilesTable (entities: Array<ArFSPublicFile | ArFSPublicFolder>) {

    const [rows, setRows] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<boolean>(false)

    useEffect(()=>{
        const newRows = generateRows(entities)
    },[entities])


    function generateTableColumns(){
        return [
          {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            render: (type: string, row:any) => row?.entityType === 'folder' ? <FolderIcon /> : mapMimeToIcon(type)
          },
          {
            title: "Name",
            dataIndex: 'name',
            key: 'name',
            render: (name:string, row:any) => <div className='flex-column white'  style={{gap:"10px"}}>
                <span style={{fontSize:"12px"}}>{name}</span>
                <span style={{fontSize:"12px", color: 'var(--text-subtle)'}}>{formatByteCount(row.size)}</span>
            </div>
          },
          {
            title: "Date",
            dataIndex: 'date',
            key: 'date',
            render: (date:number) => <div className='flex-column white' style={{gap:"10px"}}>
                <span style={{fontSize:"12px"}}>{new Date(date).toLocaleDateString()}</span>
                <span style={{fontSize:"12px", color: 'var(--text-subtle)'}}>{new Date(date).toLocaleTimeString()}</span>
            </div>
          },
          {
            title: "",
            dataIndex: 'action',
            key: 'action',
            render: () => <button><ChevronDownIcon width={30} height={30} /></button>,
          },
        ];
      }

      async function generateRows(arfsEntities:Array<ArFSPublicFile | ArFSPublicFolder>) {
        setIsLoading(true);
        const fetchedRows = [];

        for (const entity of arfsEntities) {
          try {
            const rowData = {
            ...entity,
              type: entity.dataContentType,
              name: entity.name,
              size: entity.size,
              date: entity.lastModifiedDate,
            };
            // sort by confirmation count (ASC) by default
            fetchedRows.push(rowData);
            fetchedRows.sort((a, b) => +a.date - +b.date);
         
          } catch (error) {
            console.error(error)
          } finally {
           setIsLoading(false)
          }
        }
        setRows(fetchedRows);
        setIsLoading(false);
      }

    function mapMimeToIcon (type: string) {

        const mimeType = type.split('/')[0]

        switch(mimeType) {
            case 'image':
                return <MovieIcon width={30} height={30} />
            case 'video':
                return <VideoIcon width={30} height={30} />
            case 'audio':
                return <FileMusicIcon width={30} height={30} />
            case 'text':
                return <FileTextIcon width={30} height={30} />
            case 'application':
                return <FileCodeIcon width={30} height={30} />
            default:<FileCodeIcon width={30} height={30} />
        }


    }

    return {
        rows,
        columns: generateTableColumns(),
        isLoading,
        errors
    }
}


export default useFilesTable;
import {useState, useEffect} from 'react'
import { ChevronDownIcon, FileCodeIcon, FileMusicIcon, FileTextIcon, FilesIcon, FolderIcon, MovieIcon, VideoIcon } from '../../components/icons'
import { ArFSDriveEntity, ArFSPublicFile, ArFSPublicFolder, EntityID } from '@atticusofsparta/arfs-lite-client'
import { set } from 'lodash'
import { formatByteCount } from '../../utils/searchUtils'
import ArFSDrive from '../../services/ArFSDrive'



function useFilesTable (drive?: ArFSDrive) {

    const [rows, setRows] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<boolean>(false)
    const [expandedRow, setExpandedRow] = useState<string>();
   

    useEffect(()=>{
        if(!drive) return
        const entities = [...drive._folderEntities, ...drive._fileEntities]
        generateRows(entities)
        
    },[drive])


    function generateTableColumns(){
        return [
          {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            render: (type: string, row:any) => row?.entityType === 'folder' ? <FolderIcon width={30} height={30} /> : mapMimeToIcon(type)
          },
          {
            title: "Name",
            dataIndex: 'name',
            key: 'name',
            render: (name:string, row:any) => <div className='flex-column white'  style={{gap:"5px"}}>
                <span style={{fontSize:"12px"}}>{name}</span>
                <span style={{fontSize:"12px", color: 'var(--text-subtle)'}}>{
                row.entityType === "folder" ? <> <FilesIcon width={12} height={12} fill='var(--text-subtle)' />({row.size})</> : formatByteCount(row.size)
                }</span>
            </div>
          },
          {
            title: "Date",
            dataIndex: 'date',
            key: 'date',
            render: (date:number) => <div className='flex-column white' style={{gap:"5px"}}>
                <span style={{fontSize:"12px"}}>{Intl.DateTimeFormat('en', {
                    year: "numeric",
                    month: "numeric",
                    day: "2-digit",
                    
                }).format(date).split('/').join('-')}</span>
                <span style={{fontSize:"12px", color: 'var(--text-subtle)'}}>{Intl.DateTimeFormat("en", {
                   timeStyle: "short",
                   timeZone: "GMT",
                   hour12: false,
                    
                }).format(date)} GMT</span>
            </div>
          },
          {
            title: "",
            dataIndex: 'action',
            key: 'action',
            render: (row:any) => <button 
            style={{
                border:"none", 
                background:"transparent", 
                width:"fit-content",
                margin:"0px", 
                padding:"0px"}}>
              {row?.isExpanded ? (
              <ChevronDownIcon width={10} height={10} fill="var(--foreground-muted)" style={{transform:"rotate(180deg)"}} />
            ) : (
              <ChevronDownIcon width={10} height={10} fill="var(--foreground-muted)" />
            )}
                    </button>,
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
              size: entity.entityType === "folder" ? getFileCountForFolder(entity.folderId) : entity.size,
              date: +entity.lastModifiedDate > 0 ? +entity.lastModifiedDate : +entity.unixTime * 1000, 
              key: entity.entityId.toString(),        
              isExpanded: expandedRow === entity.entityId.toString(),
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

    function getFileCountForFolder (folderId: EntityID): number { 
        let count = 0

        for (const entity of [...drive!._fileEntities, ...drive!._folderEntities]) {
            if(entity.parentFolderId.toString() === folderId.toString()) {
                count++
            }
        }
        return count
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
    function handleRowExpand(row: any) {
      
        if (expandedRow === row.entityId.toString()){
            setExpandedRow(undefined)
            return
          }
        setExpandedRow(row.entityId.toString())
        console.log(expandedRow)
      }

    return {
        rows: rows,
        columns: generateTableColumns(),
        isLoading,
        errors,
        expandRow: handleRowExpand,
        expandedRowKey: expandedRow
    }
}


export default useFilesTable;
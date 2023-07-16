import Table from 'rc-table';
import { useEffect, useState } from 'react';

import '../../../index.css';
import ScrollContainer from '../../ScrollContainer/ScrollContainer';
import './styles.css';
import useFilesTable from '../../../hooks/useFilesTable/useFilesTable';
import ArFSDrive from '../../../services/ArFSDrive';
import CircleProgressBar from '../../progress/CircleProgressBar/CircleProgressBar';

function Files({drive}:{drive?:ArFSDrive}) {

  const {isLoading, rows, columns} = useFilesTable(drive);
  const [fileData, setFileData] = useState<any[]>([]);
  const [fileColumns, setFileColumns] = useState<any[]>([]);

  useEffect(()=>{

    setFileData(rows);
    setFileColumns(columns);

  },[drive])
  

  if (isLoading) {

    return <div className='flex-column center' style={{height:"100%", marginTop:"70px", position:"relative"}}>
      <span className='textLarge white' style={{position:"absolute"}}>Loading Drive...</span>
      <CircleProgressBar size={250} color='var(--primary)' />
      </div>
  }

  return (
    <div
      className="flex-column"
      style={{
        position: 'relative',
        height: '450px',
        width: '100%',
        boxShadow: 'var(--shadow)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          position: 'absolute',
          overflow: 'hidden',
          justifyContent: 'center',
        }}
      >
        <ScrollContainer
          scrollBarContainerStyle={{}}
          scrollBarContainerHeight={rows.length > 0 ? 275 : 0}
        >
          <Table
            columns={fileColumns}
            data={rows}
            prefixCls="files-table"
            rowClassName="files-table-row"
            tableLayout="auto"
            emptyText={<div className='flex-column white textLarge center' style={{width:"100%", height:"100%", marginTop:"20%", marginLeft:"20px"}}>
            No files found.
            <br />
            <br />
            <span className='textMedium'>Try importing a drive, folder, or file on the import screen.</span>
          </div>}
          />
        </ScrollContainer>
      </div>
    </div>
  );
}

export default Files;

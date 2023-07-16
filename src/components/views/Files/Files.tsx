import Table from 'rc-table';
import { useEffect, useState } from 'react';

import '../../../index.css';
import ScrollContainer from '../../ScrollContainer/ScrollContainer';
import './styles.css';
import useFilesTable from '../../../hooks/useFilesTable/useFilesTable';
import { EntityID } from '@atticusofsparta/arfs-lite-client';

function Files({ids}:{ids?:EntityID[]}) {

  const {isLoading, rows, columns} = useFilesTable(ids ?? []);
  const [fileData, setFileData] = useState<any[]>([]);
  const [fileColumns, setFileColumns] = useState<any[]>([]);

  useEffect(()=>{

    setFileData(rows);
    setFileColumns(columns);

  },[rows, columns])
  

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
          scrollBarContainerHeight={275}
        >
          <Table
            columns={fileColumns}
            data={fileData}
            prefixCls="files-table"
            rowClassName="files-table-row"
            tableLayout="auto"
          />
        </ScrollContainer>
      </div>
    </div>
  );
}

export default Files;

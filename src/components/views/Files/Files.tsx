import Table from 'rc-table';
import { useEffect, useState } from 'react';
import '../../../index.css';
import ScrollContainer from '../../ScrollContainer/ScrollContainer';
import './styles.css';
import useFilesTable from '../../../hooks/useFilesTable/useFilesTable';
import ArFSDrive from '../../../services/ArFSDrive';
import CircleProgressBar from '../../progress/CircleProgressBar/CircleProgressBar';
import FileDetails from './FileDetails/FileDetails';

function Files({ drive }: { drive?: ArFSDrive }) {
  const { isLoading, rows, columns, expandRow, expandedRowKey } = useFilesTable(drive);
  const [fileData, setFileData] = useState<any[]>([]);
  const [fileColumns, setFileColumns] = useState<any[]>([]);

  useEffect(() => {
    setFileData(rows);
    setFileColumns(columns);
  }, [rows]);

  if (isLoading) {
    return (
      <div
        className="flex-column center"
        style={{ height: '100%', marginTop: '70px', position: 'relative' }}
      >
        <span className="textLarge white" style={{ position: 'absolute' }}>
          Loading Drive...
        </span>
        <CircleProgressBar size={250} color="var(--primary)" />
      </div>
    );
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
        className="fade-in"
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
            data={fileData}
            prefixCls="files-table"
            rowClassName="files-table-row"
            tableLayout="auto"
            expandable={{
              rowExpandable: () => true,
              expandRowByClick: true,
              expandedRowKeys: [expandedRowKey ?? ""],
              expandedRowRender: (record) => <FileDetails row={record} />
            }}
            onRow={(record) => ({
              onClick: () => {
                expandRow(record);
              }
            })}
            emptyText={
              <div className="flex-column white textLarge center" style={{ width: '100%', height: '100%', marginTop: '20px' }}>
                No files found.
                <br />
                <br />
                <span className="textMedium">Try importing a drive, folder, or file on the import screen.</span>
              </div>
            }
          />
        </ScrollContainer>
      </div>
    </div>
  );
}

export default Files;

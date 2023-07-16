import Table from 'rc-table';
import { useEffect, useState } from 'react';

import '../../../index.css';
import ScrollContainer from '../../ScrollContainer/ScrollContainer';
import './styles.css';

function Files() {
  const [filePath, setFilePath] = useState();

  const [tableItems, setTableItems] = useState<JSX.Element[]>([<></>]);
  const [maxItemCount, setMaxItemCount] = useState(10);
  const [pageRange, setPageRange] = useState<number[]>([0, maxItemCount]);
  const [sortType, setSortType] = useState<string>(); // newest, oldest, filesize, name a-z z-a, file type
  const [filterType, setFilterType] = useState<string[]>();
  // only show by file type, size range, older than or newer than set date (datepicker) - multi filter

  function updateTableItems() {}

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: 30,
    },
  ];

  const data = [
    { type: 'file', name: 'john', date: 'some where', action: '>' },
    { type: 'file', name: 'john', date: 'some where', action: '>' },
    { type: 'file', name: 'john', date: 'some where', action: '>' },
    { type: 'file', name: 'john', date: 'some where', action: '>' },
    { type: 'file', name: 'john', date: 'some where', action: '>' },
    { type: 'file', name: 'john', date: 'some where', action: '>' },
  ];

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
            columns={columns}
            data={data}
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

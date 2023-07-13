import { useEffect, useState } from 'react';

function Files() {
  const [filePath, setFilePath] = useState();

  const [tableItems, setTableItems] = useState<JSX.Element[]>([<></>]);
  const [maxItemCount, setMaxItemCount] = useState(10);
  const [pageRange, setPageRange] = useState<number[]>([0, maxItemCount]);
  const [sortType, setSortType] = useState<string>(); // newest, oldest, filesize, name a-z z-a, file type
  const [filterType, setFilterType] = useState<string[]>();
  // only show by file type, size range, older than or newer than set date (datepicker) - multi filter

  function updateTableItems() {}

  return (
    <>
      <table className="files-table">
        <tr className="files-table-header">
          <td className="table-data-item">Type</td>
          <td className="table-data-item">Name</td>
          <td className="table-data-item">Date</td>
        </tr>
        {tableItems.map((item: JSX.Element) => item)}
      </table>
    </>
  );
}

export default Files;

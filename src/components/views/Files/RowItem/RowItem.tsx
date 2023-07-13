function RowItem({
  bgColor,
  col1,
  col2,
  col3,
}: {
  bgColor: string;
  col1: JSX.Element;
  col2: JSX.Element;
  col3: JSX.Element;
}) {
  return (
    <>
      <tr className="files-table-header" style={{ backgroundColor: bgColor }}>
        <td className="table-data-item">{col1}</td>
        <td className="table-data-item">{col2}</td>
        <td className="table-data-item">{col3}</td>
      </tr>
    </>
  );
}

export default RowItem;

import { CopyIcon } from "../../../icons";

function FolderDetails({
  row
}: {
  row: any;
}) {
  return (
    <div className="flex-column" style={{gap:"15px", width:"100%", paddingRight:"5px"}}>

      <div className="flex-row space-between" style={{width:"100%"}}>
        <span className="flex-column textMedium white">
          File ID:
          <br />
          <span className="textSmall" style={{color:"var(--text-subtle)", fontSize:"10px"}}>{row.entityId.toString()}</span>
        </span>
        <button className="button flex-column center"><CopyIcon width={15} height={15} fill={'var(--foreground-muted)'}/></button>
      </div>

      <div className="flex-row space-between"  style={{width:"100%"}}>
        <span className="flex-column textMedium white">
          Data ID:
          <br />
          <span className="textSmall" style={{color:"var(--text-subtle)", fontSize:"10px"}}>{row.txId.toString()}</span>
        </span>
        <button className="button flex-column center"><CopyIcon width={15} height={15} fill={'var(--foreground-muted)'}/></button>
      </div>

    </div>
  );
}

export default FolderDetails;

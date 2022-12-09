function Notifications() {
  return (
    <div className="hollowButton buttonLarge" style={{ border: 'none' }}>
      <span className="hollowButton buttonMedium space-between" style={{padding:"0 6px"}}>
        <button className="accentButton white textMedium"style={{height:"30px",width:"30px"}}><b>{`<`}</b></button>
        <span className="textSmall white">Notes</span>  
        <span className="textSmall white">address</span>      
        <span className="textSmall white">file count</span>
        <button className="accentButton white textMedium"style={{height:"30px",width:"30px"}}><b>{`>`}</b></button>
        </span>
    </div>
  );
}

export default Notifications;

import './styles.css';

function CircleProgressBar({ size, color }: { size: number; color?: string }) {
  const height = size / 2;
  const width = size / 2;
  return (
    <div
      className="spinnerContainer"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div
        className="spinner spin1"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderColor: color,
          left: width,
        }}
      ></div>

      <div
        className="spinner spin2"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderColor: color,
          left: width,
        }}
      ></div>
    </div>
  );
}

export default CircleProgressBar;

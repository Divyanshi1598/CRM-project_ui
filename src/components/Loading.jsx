export default function (props) {
  const message = props.message ?? 'Loading...';
  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
      <div className="text-center">
        <div
          className="spinner-grow"
          style={{ width: "50px", height: "50px" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <h1>{message}</h1>
      </div>
    </div>
  );
}

import '../App.css';

function Error({msg,btn,logOut}) {
  return (
    <>
    <div className="App" style={{position:"absolute",top:0,right:0,left:0,bottom:0}}>
      <header className="App-header">
        <p>
         {msg}
        </p>
        {btn ==="reload" && <button className="btn btn-primary" onClick={logOut}>Log in </button>}
      </header>
    </div>
    </>
  );
}

export default Error;

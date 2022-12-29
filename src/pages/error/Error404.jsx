export default function Error404(props) {
  const PageData = {
    text1:"found",
    text2:" Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.",
    text3:" Go back home",
  }

  console.log("Error404: ", props)
  return (
    <section className="vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center d-flex align-items-center justify-content-center">
            <div>
              <a href="/">
                <img
                  className="img-fluid w-75"
                  src="/theme_files/assets/img/illustrations/404.svg"
                  alt="404 not found"
                />
              </a>
              <h1 className="mt-5">
                Page not{" "}
                <span className="font-weight-bolder text-primary">{PageData.text1}</span>
              </h1>
              <p className="lead my-4">
              {PageData.text2}
              </p>
              <a className="btn btn-primary animate-hover" href="/">
                <i className="fas fa-chevron-left mr-3 pl-2 animate-left-3"></i>
                {PageData.text3}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

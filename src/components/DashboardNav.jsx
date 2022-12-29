export default function DashboardNav() {
  return (
    <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-md-none">
      <a className="navbar-brand mr-lg-5" href="/">
        <img
          className="navbar-brand-dark"
          src="/theme_files/assets/img/brand/light.svg"
          alt="Volt logo"
        />{" "}
        <img
          className="navbar-brand-light"
          src="/theme_files/assets/img/brand/dark.svg"
          alt="Volt logo"
        />
      </a>
      <div className="d-flex align-items-center">
        <button
          className="navbar-toggler d-md-none collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        </button>
      </div>
    </nav>
  );
}

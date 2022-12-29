import { Link } from "react-router-dom";

export default function Footer() {
  const socialLinks = [
   
    {
      channel: "About Us",
      channelLink: "/about",
      icon: "fas fa-globe",
    },
    {
      channel: "FAQ",
      channelLink: "/faq",
      icon: "fas fa-globe",
    },
    {
      channel: "Terms & Condition",
      channelLink: "/terms",
      icon: "fas fa-globe",
    },
   
  ];
  return (
    <>
      <footer className="app-footer-bg app-footer text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="mb-2">
                <img
                  src="/theme_files/assets/logo_footer.png"
                  alt=""
                  style={{ height: "50px" }}
                />
              </div>
              <p>
                
              </p>
            </div>
            <div className="col-md-6 col-lg-4">
              <h1 className="font-righteous text-white">Office</h1>
              <p>
                
              </p>
            </div>
            <div className="col-md-6 col-lg-4">
              <nav class="nav flex-column">
                {socialLinks.map((item) => (
                  <Link
                    className="nav-link text-muted my-1 py-0"
                    to={item.channelLink}
                    target="_parent"
                  >
                    <div>{item.channel}</div>
                  </Link>
                ))}
                <a
                  href="https://www.facebook.com/globaldefipool"
                  target="_blank"
                  className="nav-link text-muted my-1 py-0"
                >
                  Facebook
                </a>
                <a
                  href="https://t.me/globaldefipoolofficial"
                  target="_blank"
                  className="nav-link text-muted my-1 py-0"
                >
                  Telegram
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    
    </>
  );
}

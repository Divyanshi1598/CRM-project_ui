import { Link } from "react-router-dom";
// import pageContents from "../helpers/page_contents";

export default function Home(props) {
  const pageContent = "pageContents.home;"
  const community = [
    {
      banner: "/theme_files/assets/icon-1.webp",
      title: "Learn crypto",
      description:
        "Learn about crypto from experts, enthusiasts, and fellow community members. Our community is a think tank made of crypto traders, developers, miners, and influencers.",
    },
    {
      banner: "/theme_files/assets/icon-2.webp",
      title: "Promote Crypto",
      description:
        "Know why crypto is hailed as the future of money. Get connected to a vast network of crypto enthusiasts, introduce new members, get your friends and family on board, propagate crypto knowledge, and adopt crypto before the world does.",
    },
    {
      banner: "/theme_files/assets/icon-3.webp",
      title: "Be An Influencer",
      description:
        "Grow from being ‘the influenced’ to an ‘influencer’ and become a leading figure within our global crypto community. Our community transforms not just the way you handle your finances, but also the way you lead your lives.",
    },
    {
      banner: "/theme_files/assets/icon-3.webp",
      title: "Be An Influencer",
      description:
        "Grow from being ‘the influenced’ to an ‘influencer’ and become a leading figure within our global crypto community. Our community transforms not just the way you handle your finances, but also the way you lead your lives.",
    },
    {
      banner: "/theme_files/assets/icon-3.webp",
      title: "Be An Influencer",
      description:
        "Grow from being ‘the influenced’ to an ‘influencer’ and become a leading figure within our global crypto community. Our community transforms not just the way you handle your finances, but also the way you lead your lives.",
    },
  ];
  return (
    <>
    {/* <Popup /> */}
      <section className="container-fluid">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md">
              <h1 className="font-righteous mb-4">
                Bull or Bear, Enjoy Guaranteed Yields
              </h1>
              <p className="app-para mb-4">
              Stake and Grow your Crypto assets 

              </p>
              <div>
                <Link
                  to="/signup"
                  className="btn yamgo-blue darken-3 me-3 rounded shadow-sm py-3 px-5 fw-bold"
                >
                  Register
                </Link>

                <Link
                  to="/signin"
                  className="btn orange rounded shadow-sm py-3 px-5 fw-bold"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="col-md">
              <img src="/theme_files/yamgo/yamgo-paid-for-life.png" />
            </div>
          </div>
        </div>
      </section>

      {/* community section */}
      {/* <section className="container-fluid py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-3">
              <h1>Join the Community</h1>
              <p>
                Join the world’s leading crypto community leading the crypto
                revolution.
              </p>
            </div>
            <div className="col-md-9">
              <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
                {community.map((aboutSec, index) => (
                  <div class="col my-2">
                    <div className="card card-body text-center rounded h-100 rounded-card shadow border-0">
                      <div class="">
                        <img src={aboutSec.banner} alt={aboutSec.banner} />
                      </div>
                      <h5 className="card-title fw-bold font-righteous mb-2">{aboutSec.title}</h5>
                      <p className="card-text app-para">{aboutSec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="">
        {pageContent.sections &&
          pageContent.sections.map((aboutSec, index) => (
            <div
              className={
                index % 2 == 0
                  ? "contsiner-fluid left-sec h-100"
                  : "container-fluid right-sec h-100"
              }
            >
              <div className="container h-100">
                <div className="row align-items-center h-100">
                  {aboutSec.banner && (
                    <div
                      className={
                        index % 2 == 0
                          ? "col-md-4 order-first"
                          : "col-md-4 order-last"
                      }
                    >
                      <img src={aboutSec.banner} />
                    </div>
                  )}
                  {aboutSec.descriptions && (
                    <div
                      className={
                        index % 2 == 0
                          ? "col-md order-last"
                          : "col-md order-first"
                      }
                    >
                      {aboutSec.descriptions.map((desc) => (
                        <div className="mb-2">
                          {desc.title && (
                            <h1 className="my-0 font-righteous mb-4">
                              {desc.title}
                            </h1>
                          )}
                          {desc.subtitle && (
                            <h5 className="my-0 font-righteous mb-2">
                              {desc.subtitle}
                            </h5>
                          )}
                          {desc.description && (
                            <p className="my-0 app-para">{desc.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}

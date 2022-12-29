import pageContents from "../helpers/page_contents";

export default function FAQ() {
  const pageContent = pageContents.faq;
  return (
    <section className="section">
      {pageContent.title && (
        <div className="app-bg-color page-title-area">
          <h1 className="page-title text-center">{pageContent.title}</h1>
          {pageContent.description && (
            <p className="text-center text-light my-0">
              {pageContent.description}
            </p>
          )}
        </div>
      )}

      {pageContent.sections && (
        <div className="container-fluid py-5 right-sec">
          <div className="container">
            <div class="accordion" id="accordionExample">
              {pageContent.sections.map((aboutSec, index) => (
                <div class="accordion-item">
                  <h2 class="accordion-header" id={`heading${index}`}>
                    <button
                      class={
                        index === 0
                          ? "accordion-button"
                          : "accordion-button collapsed"
                      }
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="true"
                      aria-controls={`collapse${index}`}
                    >
                      {aboutSec.title}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    class={
                      index === 0
                        ? "accordion-collapse collapse show"
                        : "accordion-collapse collapse"
                    }
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">{aboutSec.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

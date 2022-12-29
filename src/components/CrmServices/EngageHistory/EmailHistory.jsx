import React from "react";

export default function EmailHistory() {
  return (
    <>
      <div class="row">
        <div class="table-responsive">
          <table striped bordered hover className="table table-hover">
            <thead>
              <tr>
                <th>Send Time</th>
                <th>Email Id</th>
                <th>Time & Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="../invoice.html" className="font-weight-bold">
                    12:00PM
                  </a>
                </td>
                <td>
                  <span className="font-weight-normal">a@gmail.com</span>
                </td>
                <td>
                  <span className="font-weight-normal">1/1/2022</span>
                </td>
                <td>
                  <span className="font-weight-bold">intrested</span>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="../invoice.html" className="font-weight-bold">
                    12:00PM
                  </a>
                </td>
                <td>
                  <span className="font-weight-normal">b@gmail.com</span>
                </td>
                <td>
                  <span className="font-weight-normal"> 1/1/2022</span>
                </td>
                <td>
                  <span className="font-weight-normal">Recive</span>
                </td>
                <td>
                  <span className="font-weight-bold">intrested</span>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="../invoice.html" className="font-weight-bold">
                    12:00PM
                  </a>
                </td>
                <td>
                  <span className="font-weight-normal">1/1/2022</span>
                </td>
                <td>
                  <span className="font-weight-normal">5Mint.</span>
                </td>
                <td>
                  <span className="font-weight-normal">Recive</span>
                </td>
                <td>
                  <span className="font-weight-bold">intrested</span>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="../invoice.html" className="font-weight-bold">
                    12:00PM
                  </a>
                </td>
                <td>
                  <span className="font-weight-normal">1/1/2022</span>
                </td>
                <td>
                  <span className="font-weight-normal">5Mint.</span>
                </td>
                <td>
                  <span className="font-weight-normal">Recive</span>
                </td>
                <td>
                  <span className="font-weight-bold">intrested</span>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="../invoice.html" className="font-weight-bold">
                    12:00PM
                  </a>
                </td>
                <td>
                  <span className="font-weight-normal">1/1/2022</span>
                </td>
                <td>
                  <span className="font-weight-normal">5Mint.</span>
                </td>
                <td>
                  <span className="font-weight-normal">Recive</span>
                </td>
                <td>
                  <span className="font-weight-bold">intrested</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="d-flex justify-content-end mt-mb-1">
            <button type="button" class="btn btn-primary btn-sm col-sm-2 mr-1">
              More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function DashboardTrasactions() {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h2 className="h4">All Orders</h2>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-primary">
              Share
            </button>
            <button type="button" className="btn btn-sm btn-outline-primary">
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="table-settings mb-4">
        <div className="row align-items-center justify-content-between">
          <div className="col col-md-6 col-lg-3 col-xl-4">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon2">
                <span className="fas fa-search"></span>
              </span>
              <input
                type="text"
                className="form-control"
                id="exampleInputIconLeft"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
            </div>
          </div>
          <div className="col-4 col-md-2 col-xl-1 pl-md-0 text-right">
            <div className="btn-group">
              <button
                className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="icon icon-sm icon-gray">
                  <span className="fas fa-cog"></span>
                </span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                <span className="dropdown-item font-weight-bold text-dark">
                  Show
                </span>
                <a className="dropdown-item d-flex font-weight-bold" href="#">
                  10{" "}
                  <span className="icon icon-small ml-auto">
                    <span className="fas fa-check"></span>
                  </span>
                </a>
                <a className="dropdown-item font-weight-bold" href="#">
                  20
                </a>
                <a className="dropdown-item font-weight-bold" href="#">
                  30
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-body border-light shadow-sm table-wrapper table-responsive pt-0">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Bill For</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="../invoice.html" className="font-weight-bold">
                  456478
                </a>
              </td>
              <td>
                <span className="font-weight-normal">
                  Platinum Subscription Plan
                </span>
              </td>
              <td>
                <span className="font-weight-normal">1 May 2020</span>
              </td>
              <td>
                <span className="font-weight-normal">1 Jun 2020</span>
              </td>
              <td>
                <span className="font-weight-bold">$799,00</span>
              </td>
              <td>
                <span className="font-weight-bold text-warning">Due</span>
              </td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon icon-sm">
                      <span className="fas fa-ellipsis-h icon-dark"></span>
                    </span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="../invoice.html">
                      <span className="fas fa-eye mr-2"></span>View Details
                    </a>
                    <a className="dropdown-item" href="#">
                      <span className="fas fa-edit mr-2"></span>Edit
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <span className="fas fa-trash-alt mr-2"></span>Remove
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <a href="../invoice.html" className="font-weight-bold">
                  456423
                </a>
              </td>
              <td>
                <span className="font-weight-normal">
                  Platinum Subscription Plan
                </span>
              </td>
              <td>
                <span className="font-weight-normal">1 Apr 2020</span>
              </td>
              <td>
                <span className="font-weight-normal">1 May 2020</span>
              </td>
              <td>
                <span className="font-weight-bold">$799,00</span>
              </td>
              <td>
                <span className="font-weight-bold text-success">Paid</span>
              </td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon icon-sm">
                      <span className="fas fa-ellipsis-h icon-dark"></span>
                    </span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="../invoice.html">
                      <span className="fas fa-eye mr-2"></span>View Details
                    </a>
                    <a className="dropdown-item" href="#">
                      <span className="fas fa-edit mr-2"></span>Edit
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <span className="fas fa-trash-alt mr-2"></span>Remove
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <a href="../invoice.html" className="font-weight-bold">
                  456420
                </a>
              </td>
              <td>
                <span className="font-weight-normal">
                  Platinum Subscription Plan
                </span>
              </td>
              <td>
                <span className="font-weight-normal">1 Mar 2020</span>
              </td>
              <td>
                <span className="font-weight-normal">1 Apr 2020</span>
              </td>
              <td>
                <span className="font-weight-bold">$799,00</span>
              </td>
              <td>
                <span className="font-weight-bold text-success">Paid</span>
              </td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon icon-sm">
                      <span className="fas fa-ellipsis-h icon-dark"></span>
                    </span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="../invoice.html">
                      <span className="fas fa-eye mr-2"></span>View Details
                    </a>
                    <a className="dropdown-item" href="#">
                      <span className="fas fa-edit mr-2"></span>Edit
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <span className="fas fa-trash-alt mr-2"></span>Remove
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <a href="../invoice.html" className="font-weight-bold">
                  456421
                </a>
              </td>
              <td>
                <span className="font-weight-normal">
                  Platinum Subscription Plan
                </span>
              </td>
              <td>
                <span className="font-weight-normal">1 Feb 2020</span>
              </td>
              <td>
                <span className="font-weight-normal">1 Mar 2020</span>
              </td>
              <td>
                <span className="font-weight-bold">$799,00</span>
              </td>
              <td>
                <span className="font-weight-bold text-success">Paid</span>
              </td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon icon-sm">
                      <span className="fas fa-ellipsis-h icon-dark"></span>
                    </span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="../invoice.html">
                      <span className="fas fa-eye mr-2"></span>View Details
                    </a>
                    <a className="dropdown-item" href="#">
                      <span className="fas fa-edit mr-2"></span>Edit
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <span className="fas fa-trash-alt mr-2"></span>Remove
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <a href="../invoice.html" className="font-weight-bold">
                  456420
                </a>
              </td>
              <td>
                <span className="font-weight-normal">
                  Platinum Subscription Plan
                </span>
              </td>
              <td>
                <span className="font-weight-normal">1 Jan 2020</span>
              </td>
              <td>
                <span className="font-weight-normal">1 Feb 2020</span>
              </td>
              <td>
                <span className="font-weight-bold">$799,00</span>
              </td>
              <td>
                <span className="font-weight-bold text-success">Paid</span>
              </td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon icon-sm">
                      <span className="fas fa-ellipsis-h icon-dark"></span>
                    </span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="../invoice.html">
                      <span className="fas fa-eye mr-2"></span>View Details
                    </a>
                    <a className="dropdown-item" href="#">
                      <span className="fas fa-edit mr-2"></span>Edit
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <span className="fas fa-trash-alt mr-2"></span>Remove
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <a href="../invoice.html" className="font-weight-bold">
                  456479
                </a>
              </td>
              <td>
                <span className="font-weight-normal">
                  Platinum Subscription Plan
                </span>
              </td>
              <td>
                <span className="font-weight-normal">1 Dec 2019</span>
              </td>
              <td>
                <span className="font-weight-normal">1 Jan 2020</span>
              </td>
              <td>
                <span className="font-weight-bold">$799,00</span>
              </td>
              <td>
                <span className="font-weight-bold text-success">Paid</span>
              </td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon icon-sm">
                      <span className="fas fa-ellipsis-h icon-dark"></span>
                    </span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="../invoice.html">
                      <span className="fas fa-eye mr-2"></span>View Details
                    </a>
                    <a className="dropdown-item" href="#">
                      <span className="fas fa-edit mr-2"></span>Edit
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <span className="fas fa-trash-alt mr-2"></span>Remove
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <a href="../invoice.html" className="font-weight-bold">
                  456478
                </a>
              </td>
              <td>
                <span className="font-weight-normal">
                  Platinum Subscription Plan
                </span>
              </td>
              <td>
                <span className="font-weight-normal">1 Nov 2019</span>
              </td>
              <td>
                <span className="font-weight-normal">1 Dec 2019</span>
              </td>
              <td>
                <span className="font-weight-bold">$799,00</span>
              </td>
              <td>
                <span className="font-weight-bold text-success">Paid</span>
              </td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon icon-sm">
                      <span className="fas fa-ellipsis-h icon-dark"></span>
                    </span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="../invoice.html">
                      <span className="fas fa-eye mr-2"></span>View Details
                    </a>
                    <a className="dropdown-item" href="#">
                      <span className="fas fa-edit mr-2"></span>Edit
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <span className="fas fa-trash-alt mr-2"></span>Remove
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <a href="../invoice.html" className="font-weight-bold">
                  453673
                </a>
              </td>
              <td>
                <span className="font-weight-normal">
                  Gold Subscription Plan
                </span>
              </td>
              <td>
                <span className="font-weight-normal">1 Oct 2019</span>
              </td>
              <td>
                <span className="font-weight-normal">1 Nov 2019</span>
              </td>
              <td>
                <span className="font-weight-bold">$533,42</span>
              </td>
              <td>
                <span className="font-weight-bold text-danger">Canceled</span>
              </td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon icon-sm">
                      <span className="fas fa-ellipsis-h icon-dark"></span>
                    </span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="../invoice.html">
                      <span className="fas fa-eye mr-2"></span>View Details
                    </a>
                    <a className="dropdown-item" href="#">
                      <span className="fas fa-edit mr-2"></span>Edit
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <span className="fas fa-trash-alt mr-2"></span>Remove
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <a href="../invoice.html" className="font-weight-bold">
                  456468
                </a>
              </td>
              <td>
                <span className="font-weight-normal">
                  Gold Subscription Plan
                </span>
              </td>
              <td>
                <span className="font-weight-normal">1 Sep 2019</span>
              </td>
              <td>
                <span className="font-weight-normal">1 Oct 2019</span>
              </td>
              <td>
                <span className="font-weight-bold">$533,42</span>
              </td>
              <td>
                <span className="font-weight-bold text-success">Paid</span>
              </td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon icon-sm">
                      <span className="fas fa-ellipsis-h icon-dark"></span>
                    </span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="../invoice.html">
                      <span className="fas fa-eye mr-2"></span>View Details
                    </a>
                    <a className="dropdown-item" href="#">
                      <span className="fas fa-edit mr-2"></span>Edit
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <span className="fas fa-trash-alt mr-2"></span>Remove
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <a href="../invoice.html" className="font-weight-bold">
                  456478
                </a>
              </td>
              <td>
                <span className="font-weight-normal">
                  Flexible Subscription Plan
                </span>
              </td>
              <td>
                <span className="font-weight-normal">1 Aug 2019</span>
              </td>
              <td>
                <span className="font-weight-normal">1 Sep 2019</span>
              </td>
              <td>
                <span className="font-weight-bold">$233,42</span>
              </td>
              <td>
                <span className="font-weight-bold text-success">Paid</span>
              </td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon icon-sm">
                      <span className="fas fa-ellipsis-h icon-dark"></span>
                    </span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="../invoice.html">
                      <span className="fas fa-eye mr-2"></span>View Details
                    </a>
                    <a className="dropdown-item" href="#">
                      <span className="fas fa-edit mr-2"></span>Edit
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <span className="fas fa-trash-alt mr-2"></span>Remove
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="card-footer px-3 border-0 d-flex align-items-center justify-content-between">
          <nav aria-label="Page navigation example">
            <ul className="pagination mb-0">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
          <div className="font-weight-bold small">
            Showing <b>5</b> out of <b>25</b> entries
          </div>
        </div>
      </div>
    </>
  );
}

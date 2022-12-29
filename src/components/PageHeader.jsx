import React from 'react'

export default function PageHeader(props) {
    return (
        <div className="container-fluid py-4 bg ">
            <div className="row">
                <div className="card col-xl-12 bg-dark" >
                    <div className="row row-cols-md-2 m-2 p-2 row-cols-lg-2 row-cols-xl-2 font-weight-bold">
                        <span className="text-left text-light ">{props.heading}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

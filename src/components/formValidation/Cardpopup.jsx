import React from 'react'
import BasicTabs from './BasicTabs'
import '../CrmServices/Style.css';

function Cardpopup(props) {
    return (
        <div class="modal fade" id={`cardtoggel${props.data.sno}`} tabindex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered ml-1" role="document">
                <div class="modal-content " style={{ marginTop: "250px" }}>
                    <div class="modal-header">
                    <BasicTabs  subscript={{subscript: props.data.subscript, script: props.data.script_temp_body, name: props.data.script_name}} customer={props.customer} camp={props.camp.campid} />
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cardpopup
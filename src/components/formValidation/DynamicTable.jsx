import React from 'react'
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {  Stack } from "@mui/material";
import { useState } from 'react';


function DynamicTable(row, columns, key) {
    console.log("row, columns, key", row, columns, key)
    const [filterColumn, setFilterColumn] = useState("");
    const [filterValue, setFilterValue] = useState("");
    function CustomToolbar() {
        return (
            <Stack direction="row" justifyContent="flex-end">
                <GridToolbarContainer className={gridClasses.toolbarContainer}>
                    <GridToolbarExport />
                    <GridToolbarFilterButton />
                </GridToolbarContainer>
            </Stack>
        );
    }

    const onFilterChange = React.useCallback(async (filterModel) => {
        if (
            filterModel?.items?.[0]?.value &&
            filterModel?.items?.[0]?.value.length > 0
        ) {
            setFilterColumn(filterModel?.items?.[0]?.columnField);
            setFilterValue(filterModel?.items?.[0]?.value);
        }
    }, []);

    return (

        <div>
            <div className="table-settings mb-4">
                <div className="my-2">
                    <DataGrid
                        //loading={loadingData}
                        getRowId={(r) => r.sno}
                        rows={row}
                        columns={columns}
                        //rowCount={totalUsers}
                        pageSize={10}
                        rowsPerPageOptions={[10, 25, 25, 50, 100]}
                        //checkboxSelection
                        //paginationMode="server"
                        //onFilterModelChange={onFilterChange}
                        //onPageChange={handlePageChange}
                        autoHeight={true}
                        className="bg-white"
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        density="compact"
                    />
                </div>
            </div>
        </div>
    )
}

export default DynamicTable
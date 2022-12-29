import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


function createData(AgentId, Name, Score) {
  return { AgentId, Name, Score };
}
const rows = [
  createData("1", "Ram", 234),
  createData("2", "john", 567),
  createData("3", "Herry", 675),
  createData("4", "washid", 456),
  createData("5", "Surendra ", 356),
];
export default function DenseTable() {
  return (
    <TableContainer className="overflow-scroll-x">
      <Table sx={{ minWidth: 350}} size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Agent ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell align="left"> {row.AgentId}</TableCell>
              <TableCell align="left"> {row.Name}</TableCell>
              <TableCell align="left"> {row.Score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import {
    TableContainer,
    TableCell,
    TableBody,
    TableHead,
    Table,
    TableRow,
    Paper,
} from "@mui/material";

const TableComponent = (props) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="left">Exchange rate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(props.exchangeHistory).map((currentValue) => {
                        return (
                            <TableRow
                                key={currentValue[0]}
                                sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {currentValue[0]}
                                </TableCell>
                                <TableCell align="left">
                                    {currentValue[1][props.currency]}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default TableComponent;
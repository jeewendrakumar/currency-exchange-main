import {
    TableContainer,
    TableCell,
    TableBody,
    TableHead,
    Table,
    TableRow,
    Paper,
} from "@mui/material";

const TableStatisticsComponent = (props) => {
    return (<TableContainer component={Paper}>
        <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Statistics</TableCell>
                    <TableCell align="left"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow
                    sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                    }}
                >
                    <TableCell component="th" scope="row">
                        Lowest
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {props.minCurrencyValue}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Highest
                    </TableCell>
                    <TableCell align="left">{props.maxCurrencyValue}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Average
                    </TableCell>
                    <TableCell align="left">{props.averageCurrencyValue}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>)
}

export default TableStatisticsComponent;
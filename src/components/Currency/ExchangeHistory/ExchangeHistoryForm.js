import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    FormControlLabel,
    Radio,
    RadioGroup
} from "@mui/material";
const ExchangeHistoryForm = (props) => {
    return (
        <form>
            <h2> Exchange History</h2>
            <div className="form-group">
                <div className="form-control" style={{ 'flexDirection': 'row', 'alignItems': 'center', 'justifyContent': 'space-between', 'maxWidth': '50%' }}>
                    <FormControl variant="standard" sx={{ minWidth: 250 }}>
                        <InputLabel id="demo-simple-select-standard-label">
                            Duration
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            name="to"
                            value={props.duration ? props.duration : ""}
                            onChange={props.getExchangeHistory}
                            label="Duration"
                        >
                            <MenuItem key={"7"} value={"7"}>
                                7 Days
                            </MenuItem>
                            <MenuItem key={"14"} value={"14"}>
                                14 Days
                            </MenuItem>
                            <MenuItem key={"30"} value={"30"}>
                                30 Days
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={props.showReport}
                            onChange={props.switchReportHandler}
                        >
                            <FormControlLabel
                                value="table"
                                control={<Radio />}
                                label="Table"
                            />
                            <FormControlLabel
                                value="chart"
                                control={<Radio />}
                                label="Chart"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </form>
    )
}
export default ExchangeHistoryForm;
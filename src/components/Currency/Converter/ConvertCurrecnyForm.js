import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
const ConvertCurrecnyFrom = (props) => {

    return (<form>
        <h1>I want to convert</h1>
        <div className="form-group">
            <div className="form-control">
                <TextField
                    id="standard-basic"
                    label="Amount"
                    variant="standard"
                    inputRef={props.selectedAmount}
                    defaultValue='1'
                    InputProps={{
                        inputProps: { min: 0 }
                    }}
                />
            </div>
            <div className="form-control">
                <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">
                        From
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="from"
                        value={props.currencyFrom}
                        defaultValue={props.currencyFrom}
                        onChange={props.currencyFromHandler}
                        label="From"
                    >
                        {Object.entries(props.currencyList).map((currentValue) => {
                            return (
                                <MenuItem key={currentValue[1]} value={currentValue[0]}>
                                    {currentValue[0]}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </div>
            <div className="form-control f-0">
                <Button
                    variant="contained"
                    className="btn-invert"
                    onClick={props.handleSwapCurrency}
                    style={{
                        minWidth: "45px",
                        color: "#009688",
                        backgroundColor: "#fff",
                    }}
                >
                    <span className="material-icons">compare_arrows</span>
                </Button>
            </div>
            <div className="form-control">
                <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">To</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="to"
                        value={props.currencyTo}
                        defaultValue={props.currencyTo}
                        onChange={props.currencyToHandler}
                        label="To"
                    >
                        {Object.entries(props.currencyList).map((currentValue) => {
                            return (
                                <MenuItem key={currentValue[1]} value={currentValue[0]}>
                                    {currentValue[0]}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </div>
            <Button
                variant="contained"
                className="btn btn-primary"
                style={{
                    backgroundColor: "#009688",
                    marginRight: 15,
                    width: "100%",
                }}
                onClick={props.convertCurrencyHandler}
            >
                Convert
            </Button>
        </div>
    </form>)
}

export default ConvertCurrecnyFrom;
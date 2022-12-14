// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// ** Icons Imports
import { Typography } from "@mui/material";

interface TableHeaderProps {
  plan: string;
  value: string;
  handleFilter: (val: string) => void;
  handlePlanChange: (e: SelectChangeEvent) => void;
}

const TableHeader = () => {
  // ** Props
  // const { plan, handlePlanChange, handleFilter, value } = props

  return (
    <Box
      sx={{
        pr: 0,
        pl: 0,
        mb: 7,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography>
        <Box
          component="span"
          sx={{ fontSize: "1.2rem", fontWeight: "500", color: "#ffffff" }}
        >
          Your Contacts
        </Box>
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          size="small"
          value={null}
          placeholder="Search User"
          //onChange={e => handleFilter(e.target.value)}
          color="success"
        />
      </Box>
    </Box>
  );
};

export default TableHeader;

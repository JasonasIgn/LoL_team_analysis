import React from "react";
import styled from "styled-components";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";

interface ChampionInputProps {
  options: any[];
  control: any;
  name: string;
}

const Container = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid grey;
`;

const ChampionImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const ChampionInput: React.FC<ChampionInputProps> = ({
  options = [],
  control,
  name,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState<any>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={-1}
      render={({ onChange }) => (
        <Container>
          <ChampionImageContainer onClick={handleClick}>
            {value ? value.title : "-"}
          </ChampionImageContainer>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            style={{ padding: "100px" }}
            anchorOrigin={{ horizontal: "right", vertical: "center" }}
          >
            <Autocomplete
              options={options}
              getOptionLabel={(option) => option.title}
              style={{ width: 200 }}
              onChange={(e, value) => {
                setValue(value);
                handleClose();
                onChange(Number(value.id))
              }}
              renderInput={(params) => (
                <TextField {...params} label="Champion" variant="outlined" autoFocus/>
              )}
            />
          </Popover>
        </Container>
      )}
    />
  );
};

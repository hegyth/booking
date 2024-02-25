import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useDispatch } from 'react-redux';
import { sortedRoomsThunk } from '../../redux/actions/roomAction';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   'Одноместный',
//   'Двухместный',
//   'Трехместный',
//   'Для курящих',
//   'Для не курящих',
//   'С детьми',
//   'Комфорт',
//   'Повышенный комфорт',
// ];
const names = [
  'Стандартный',
  'Двухместный',
  'Люкс',
];

let catArr = [];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
  };
}

export default function RoomsSelector({ filter, setFilter }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const dispatch = useDispatch();
  const arrayHandler = (name) => {
    const cat = { name };
    let track = '';
    for (let i = 0; i <= catArr.length; i += 1) {
      if (cat?.name === catArr[i]?.name) { track = 'found'; }
    }
    if (track === 'found') {
      catArr = catArr.filter((el) => el?.name !== cat?.name);
    } else {
      catArr.push(cat);
    }
    console.log('SELECTOR:', catArr);
    setFilter((prev) => ({ ...prev, catArr }));
    dispatch(sortedRoomsThunk({ ready: filter.ready, catArr }));

    console.log(catArr);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: '300px', maxWidth: '600px' }}>
        <InputLabel id="demo-multiple-chip-label">Категория</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Категория" />}
          label="Категория"
          renderValue={(selected) => (
            <Box sx={{
              display: 'flex', flexWrap: 'wrap', gap: 0.5,
            }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              onClick={() => arrayHandler(name)}
              name={name}
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

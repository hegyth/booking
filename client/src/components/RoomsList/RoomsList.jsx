import * as React from 'react';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { sortedRoomsThunk } from '../../redux/actions/roomAction';

export default function RoomsList({ filter }) {
  const rows = useSelector((state) => state.rooms);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sortedRoomsThunk(filter));
  }, []);

  return (
    <div>
      {rows
        ?.map((row) => (
          <Accordion key={row.id} style={{ width: '55vw' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {`№${row?.number}`}
                {' - '}
                {row?.category}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div style={{ display: 'flex', columnGap: '10px', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', columnGap: '15px' }}>
                    <div>
                      <div style={{ fontWeight: '900' }}>
                        {'Этаж: '}
                      </div>
                      <div>
                        {row?.floor}
                      </div>
                    </div>
                    <br />
                    <div>
                      <div style={{ fontWeight: '900' }}>
                        {'Цена за сутки: '}
                      </div>
                      <div>
                        {`${row?.price} ₽`}
                      </div>
                    </div>
                  </div>
                  <br />
                  <AccountBoxIcon />
                </div>
                <div>
                  <div style={{ fontWeight: '900', marginTop: '30px' }}>
                    {'Комментарий: '}
                  </div>
                  <div>
                    {row?.comment}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}

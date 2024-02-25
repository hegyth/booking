// import React from 'react';
import * as React from 'react';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { setTodayReservationThunk } from '../../redux/actions/reservationAction';
import ReservationModal from '../ReservationModal';
import { setReservModal } from '../../redux/slices/reservationModalSlice';
// import ReservationItem from '../ReservationItem/ReservationItem';

const columns = [
  {
    id: 'lastName', label: 'Фамилия', minWidth: 100,
  },
  { id: 'firstName', label: 'Имя', minWidth: 80 },
  { id: 'middleName', label: 'Отчество', minWidth: 100 },
  { id: 'checkIN', label: 'Заезд', minWidth: 80 },
  { id: 'phone', label: 'Телефон', minWidth: 80 },
  {
    id: 'checkOut',
    label: 'Выезд',
    minWidth: 80,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Тариф',
    minWidth: 80,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'category',
    label: 'Категория',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'number',
    label: 'Номер',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

export default function ReservationList() {
  // начальный лист И минимальное начальное количество отображаемых строк
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // смена страницы
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // смена количества строк
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = useSelector((state) => state.reservation);
  //
  const dispatch = useDispatch();
  useEffect(() => {
  }, [rows.length]);

  useEffect(() => {
    dispatch(setTodayReservationThunk());
  }, []);

  console.log(rows);

  const modalHandler = (el) => {
    console.log(el);
    dispatch(setReservModal(el));
  };

  return (
    <div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ height: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={() => modalHandler(row)}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ReservationModal />
    </div>
  );
}

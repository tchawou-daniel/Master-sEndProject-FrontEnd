import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Meta } from '@storybook/react/types-6-0';
import React, { FC } from 'react';

import DataGrid from './DataGrid';

export default {
  title: 'Generic/Tables/DataGrid',
  component: DataGrid,
} as Meta;

export const Example: FC = () => (
  <Container>
    <h2>Basic</h2>

    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DataGrid
          id="id"
          columns={[
            { name: 'bookingDate', title: 'Booking Date' },
            { name: 'customerName', title: 'Customer Name' },
            { name: 'amount', title: 'Amount' },
            { name: 'payout', title: 'Payout' },
          ]}
          rows={[
            {
              bookingDate: '01/04/2020', customerName: 'Nintendo', amount: '85 849 €', payout: '5 108 €',
            },
            {
              bookingDate: '01/04/2020', customerName: 'IBM', amount: '76 232 €', payout: '3 422 €',
            },
            {
              bookingDate: '05/04/2020', customerName: 'Gillette', amount: '33 820 €', payout: '2 305 €',
            },
            {
              bookingDate: '06/04/2020', customerName: 'MasterCard', amount: '33 618 €', payout: '2 005 €',
            },
          ]}
        />
      </Grid>
    </Grid>
  </Container>
);
export const WithPagination: FC = () => (
  <Container>
    <h2>Paginated</h2>
    <Grid container spacing={3}>
      <DataGrid
        id="id"
        columns={[
          { name: 'bookingDate', title: 'Booking Date' },
          { name: 'customerName', title: 'Customer Name' },
          { name: 'amount', title: 'Amount' },
          { name: 'payout', title: 'Payout' },
        ]}
        rows={[
          {
            bookingDate: '01/04/2020', customerName: 'Nintendo', amount: '85 849 €', payout: '5 108 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'IBM', amount: '76 232 €', payout: '3 422 €',
          },
          {
            bookingDate: '05/04/2020', customerName: 'Gillette', amount: '33 820 €', payout: '2 305 €',
          },
          {
            bookingDate: '06/04/2020', customerName: 'MasterCard', amount: '33 618 €', payout: '2 005 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'Nintendo', amount: '85 849 €', payout: '5 108 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'IBM', amount: '76 232 €', payout: '3 422 €',
          },
          {
            bookingDate: '05/04/2020', customerName: 'Gillette', amount: '33 820 €', payout: '2 305 €',
          },
          {
            bookingDate: '06/04/2020', customerName: 'MasterCard', amount: '33 618 €', payout: '2 005 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'Nintendo', amount: '85 849 €', payout: '5 108 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'IBM', amount: '76 232 €', payout: '3 422 €',
          },
          {
            bookingDate: '05/04/2020', customerName: 'Gillette', amount: '33 820 €', payout: '2 305 €',
          },
          {
            bookingDate: '06/04/2020', customerName: 'MasterCard', amount: '33 618 €', payout: '2 005 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'Nintendo', amount: '85 849 €', payout: '5 108 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'IBM', amount: '76 232 €', payout: '3 422 €',
          },
          {
            bookingDate: '05/04/2020', customerName: 'Gillette', amount: '33 820 €', payout: '2 305 €',
          },
          {
            bookingDate: '06/04/2020', customerName: 'MasterCard', amount: '33 618 €', payout: '2 005 €',
          },
        ]}
        options={{ pages: { paginable: true } }}
      />
    </Grid>
  </Container>
);

export const WithPaginationAndSearch: FC = () => (
  <Container>
    <h2>Paginated with search</h2>
    <Grid container spacing={3}>
      <DataGrid
        id="id"
        columns={[
          { name: 'bookingDate', title: 'Booking Date' },
          { name: 'customerName', title: 'Customer Name' },
          { name: 'amount', title: 'Amount' },
          { name: 'payout', title: 'Payout' },
        ]}
        rows={[
          {
            bookingDate: '01/04/2020', customerName: 'Nintendo', amount: '85 849 €', payout: '5 108 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'IBM', amount: '76 232 €', payout: '3 422 €',
          },
          {
            bookingDate: '05/04/2020', customerName: 'Gillette', amount: '33 820 €', payout: '2 305 €',
          },
          {
            bookingDate: '06/04/2020', customerName: 'MasterCard', amount: '33 618 €', payout: '2 005 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'Nintendo', amount: '85 849 €', payout: '5 108 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'IBM', amount: '76 232 €', payout: '3 422 €',
          },
          {
            bookingDate: '05/04/2020', customerName: 'Gillette', amount: '33 820 €', payout: '2 305 €',
          },
          {
            bookingDate: '06/04/2020', customerName: 'MasterCard', amount: '33 618 €', payout: '2 005 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'Nintendo', amount: '85 849 €', payout: '5 108 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'IBM', amount: '76 232 €', payout: '3 422 €',
          },
          {
            bookingDate: '05/04/2020', customerName: 'Gillette', amount: '33 820 €', payout: '2 305 €',
          },
          {
            bookingDate: '06/04/2020', customerName: 'MasterCard', amount: '33 618 €', payout: '2 005 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'Nintendo', amount: '85 849 €', payout: '5 108 €',
          },
          {
            bookingDate: '01/04/2020', customerName: 'IBM', amount: '76 232 €', payout: '3 422 €',
          },
          {
            bookingDate: '05/04/2020', customerName: 'Gillette', amount: '33 820 €', payout: '2 305 €',
          },
          {
            bookingDate: '06/04/2020', customerName: 'MasterCard', amount: '33 618 €', payout: '2 005 €',
          },
        ]}
        options={{ pages: { paginable: true }, search: { searchable: true } }}
      />
    </Grid>
  </Container>
);

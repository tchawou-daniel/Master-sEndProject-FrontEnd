import {
  Box,
  Chip, Dialog, DialogActions, DialogContent, MenuItem,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { Form, Formik } from 'formik';
import React, {
  FC, memo,
} from 'react';
import * as Yup from 'yup';

import DialogTitleWithCloseButton from 'react/ui/Generic/DialogTitleWithCloseButton';

import {
  Company, CompanySector, CompanyStatus, HiringStatus,
} from '../../../../types/Company';
import { empreinttTheme } from '../../branding/theme';
import { CancelButton, DefaultActionButton } from '../../Generic/Button/Button';
import TextField from '../../Generic/formElements/inputs/TextField/TextField';

interface CompaniesFormAddProps {
  onSubmit: (values: Partial<Company>) => Promise<any>;
  isOpen: boolean;
  onCancel: () => any;
}

const companySchema = Yup.object().shape({
  name: Yup.string().required('Required').min(2, 'At least 2').max(100, 'Maximum 100'),
  street: Yup.string().required('Required').required('Required'),
  town: Yup.string().required('Required').min(2, 'At least 2').max(100, 'Maximum 100'),
  zipCode: Yup.string().required('Required').min(2, 'At least 2').max(100, 'Maximum 100'),
  companySector: Yup.mixed<CompanySector>().oneOf(Object.values(CompanySector)),
  companyStatus: Yup.mixed<CompanyStatus>().oneOf(Object.values(CompanyStatus)),
  country: Yup.string(),
  description: Yup.string(),
  hiringStatus: Yup.mixed<HiringStatus>().oneOf(Object.values(HiringStatus)),
});

export const CompaniesFormAddModal: FC<CompaniesFormAddProps> = ({
  isOpen, onCancel, onSubmit,
}) => {
  const initialValues = {
    name: '',
    street: '',
    town: '',
    zipCode: '',
    companySector: CompanySector.AGRICULTURE,
    companyStatus: CompanyStatus.ACTIVE,
    country: '',
    description: '',
    hiringStatus: HiringStatus.ONGOING,
  };

  const [companySector, setCompanySector] = React.useState<string | CompanySector>(CompanySector.AGRICULTURE);
  const [companyStatus, setCompanyStatus] = React.useState<string | CompanySector>(CompanyStatus.ACTIVE);
  const [hiringStatus, setHiringStatus] = React.useState<string | CompanySector>(HiringStatus.ONGOING);

  const handleChangeCompanySector = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCompanySector(event.target.value as CompanySector);
  };

  const handleChangeCompanyStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCompanyStatus(event.target.value as CompanyStatus);
  };
  const handleChangeCompanyHiring = (event: React.ChangeEvent<{ value: unknown }>) => {
    setHiringStatus(event.target.value as HiringStatus);
  };
  return (
    <Formik
      enableReinitialize
      validationSchema={companySchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isValid, values }) => (
        <Dialog
          open={isOpen}
          onClose={onCancel}
          fullWidth
          className="create-company-modal"
        >
          <Form autoComplete="off">

            <DialogTitleWithCloseButton handleClose={onCancel}>
              Create a company
            </DialogTitleWithCloseButton>
            <DialogContent dividers>

              <br />
              <TextField
                id="name"
                name="name"
                label="Name"
                placeholder="Name"
                type="text"
                component={TextField}
                required
              />
              <TextField
                id="street"
                name="street"
                label="street"
                placeholder="street"
                type="text"
                component={TextField}
                required
              />
              <TextField
                id="town"
                name="town"
                label="town"
                placeholder="town"
                type="text"
                component={TextField}
                required
              />
              <TextField
                id="zipCode"
                name="zipCode"
                label="zipCode"
                placeholder="zipCode"
                type="text"
                component={TextField}
                required
              />

              <Box marginTop={empreinttTheme.spacing(0.3)}>
                <Select
                  labelId="companySector"
                  id="companySector"
                  value={companySector}
                  onChange={handleChangeCompanySector}
                >
                  {Object.values(CompanySector).map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <Box marginTop={empreinttTheme.spacing(0.2)}>
                  <Select
                    labelId="companyStatus"
                    id="companyStatus"
                    value={companyStatus}
                    onChange={handleChangeCompanyStatus}
                  >
                    {Object.values(CompanyStatus).map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <TextField
                  id="country"
                  name="country"
                  label="country"
                  placeholder="country"
                  type="text"
                  component={TextField}
                  required
                />
                <TextField
                  id="description"
                  name="description"
                  label="description"
                  placeholder="description"
                  type="text"
                  component={TextField}
                  required
                />
                <Box marginTop={empreinttTheme.spacing(0.2)}>
                  <Select
                    labelId="hiringStatus"
                    id="hiringStatus"
                    value={hiringStatus}
                    onChange={handleChangeCompanyHiring}
                  >
                    {Object.values(HiringStatus).map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>

            </DialogContent>
            <DialogActions>
              <CancelButton onClick={onCancel}>
                Cancel
              </CancelButton>
              <DefaultActionButton type="submit" disabled={!isValid} onClick={() => { onSubmit(values); }}>
                Submit
              </DefaultActionButton>
            </DialogActions>

          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default memo(CompaniesFormAddModal);

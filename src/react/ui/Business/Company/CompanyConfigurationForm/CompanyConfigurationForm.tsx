import {
  Box,
  Dialog, DialogActions, DialogContent, MenuItem,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import React, {
  FC, memo, useCallback, useMemo,
} from 'react';
import * as Yup from 'yup';

import {
  Company, CompanySector, CompanyStatus, HiringStatus,
} from '../../../../../types/Company';
import { empreinttTheme } from '../../../branding/theme';
import { CancelButton, DefaultActionButton } from '../../../Generic/Button/Button';
import DialogTitleWithCloseButton from '../../../Generic/DialogTitleWithCloseButton';
import TextField from '../../../Generic/formElements/inputs/TextField/TextField';
import { H5 } from '../../../Generic/typography';

interface CompanyConfigurationFormProps {
  isOpen: boolean,
  company: Company | null;
  handleSubmit: (company: Partial<Company>) => any;
  handleCancel: () => any;
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
const useStyles = makeStyles(() => ({
  selectStyle: {
    width: '100%',
  },
}));

const CompanyConfigurationForm: FC<CompanyConfigurationFormProps> = memo(({
  isOpen,
  company,
  handleSubmit,
  handleCancel,
  // users,
}) => {
  const classes = useStyles();
  const [companySector, setCompanySector] = React.useState<string | CompanySector>(company?.companySector);
  const [companyStatus, setCompanyStatus] = React.useState<string | CompanyStatus>(company?.companyStatus);
  const [hiringStatus, setHiringStatus] = React.useState<string | HiringStatus>(company?.hiringStatus);

  const handleChangeCompanySector = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCompanySector(event.target.value as CompanySector);
  };

  const handleChangeCompanyStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCompanyStatus(event.target.value as CompanyStatus);
  };

  const handleChangeCompanyHiring = (event: React.ChangeEvent<{ value: unknown }>) => {
    setHiringStatus(event.target.value as HiringStatus);
  };

  const handleSubmitProxy = useCallback((values: any) => {
    handleSubmit({
      id: company?.id,
      name: values.name,
      street: values.street,
      town: values.town,
      zipCode: values.zipCode,
      companySector: companySector as CompanySector,
      companyStatus: companyStatus as CompanyStatus,
      country: values.country,
      description: values.description,
      hiringStatus: hiringStatus as HiringStatus,
    });
  }, [company?.id, companySector, companyStatus, handleSubmit, hiringStatus]);

  const initialValues = useMemo(() => ({
    id: company?.id,
    name: company?.name,
    street: company?.street,
    town: company?.town,
    zipCode: company?.zipCode,
    companySector: company?.companySector,
    companyStatus: company?.companyStatus,
    country: company?.country,
    description: company?.description,
    hiringStatus: company?.hiringStatus,
  }), [company]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      aria-labelledby="company-dialog-title"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitleWithCloseButton
        id="company-dialog-title"
        handleClose={handleCancel}
      >
        <H5 color="secondary" align="center" style={{ fontWeight: 'bold' }}>Edit Company</H5>
      </DialogTitleWithCloseButton>
      <Formik
        validationSchema={companySchema}
        initialValues={initialValues}
        onSubmit={handleSubmitProxy}
      >
        {({ isValid, values }) => (
          <Form>
            <DialogContent>
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
                    variant="outlined"
                    labelId="companySector"
                    id="companySector"
                    value={companySector || initialValues.companySector}
                    onChange={handleChangeCompanySector}
                    className={classes.selectStyle}
                  >
                    {Object.values(CompanySector).map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box marginTop={empreinttTheme.spacing(0.2)}>
                    <Select
                      variant="outlined"
                      labelId="companyStatus"
                      id="companyStatus"
                      value={companyStatus || initialValues.companyStatus}
                      onChange={handleChangeCompanyStatus}
                      className={classes.selectStyle}
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
                      variant="outlined"
                      labelId="hiringStatus"
                      id="hiringStatus"
                      value={hiringStatus || initialValues.hiringStatus}
                      onChange={handleChangeCompanyHiring}
                      className={classes.selectStyle}
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
                <CancelButton name="cancel-button" onClick={handleCancel}>
                  Cancel
                </CancelButton>
                <DefaultActionButton name="submit-button" type="submit" disabled={!isValid} onClick={() => { handleSubmit(values); }}>
                  Submit
                </DefaultActionButton>
              </DialogActions>
            </DialogContent>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
});

export default memo(CompanyConfigurationForm);

// @mui
import { Card, CardContent, Box, TextField, Grid, FormHelperText } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
// _mock_
import mockData from '../../assets/mock_up_data.json';
// components
// import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const { countries, top100Films } = mockData;

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

export default function FaqsList() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent sx={{ padding: '15px !important' }}>
            <Autocomplete
              id="filter-demo"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              filterOptions={filterOptions}
              renderInput={(params) => <TextField {...params} label="Search for Global fundraisers" />}
            />
            <FormHelperText>Search for Global fundraisers</FormHelperText>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent sx={{ padding: '15px !important' }}>
            <Autocomplete
              id="country-select-demo"
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label} ({option.code})
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search a country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <FormHelperText>Enter Country to find federal level fundraisers</FormHelperText>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent sx={{ padding: '15px !important' }}>
            <Autocomplete
              id="filter-demo"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              filterOptions={filterOptions}
              renderInput={(params) => <TextField {...params} label="Search for American State or Other Regional Subdivison" />}
            />
            <FormHelperText>Enter American State or Other Regional Subdivision to find  + fundraisers</FormHelperText>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent sx={{ padding: '15px !important' }}>
            <Autocomplete
              id="filter-demo"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              filterOptions={filterOptions}
              renderInput={(params) => <TextField {...params} label="Search for local county, city, or town" />}
            />
            <FormHelperText>Enter local county, city, or town to find fundraisers</FormHelperText>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

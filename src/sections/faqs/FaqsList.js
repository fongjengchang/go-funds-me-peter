import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { Stack, Typography, Box, Button, IconButton, InputAdornment } from '@mui/material';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// components
import Iconify from '../../components/Iconify';
import InputStyle from '../../components/InputStyle';

import mockData from '../../assets/mock_up_data.json';

const { federalFundraisers, countries } = mockData;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const AccordionSummary = styled((props) => {
  const { expanded } = props;
  return (
    <MuiAccordionSummary
      expandIcon={<Iconify icon={expanded === 'true' ? 'akar-icons:minus' : 'akar-icons:plus'} />}
      {...props}
    />
  );
})(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-content': {
    justifyContent: 'center',
  },
}));

export default function CustomizedAccordions() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState('');
  const [subExpended, setSubExpended] = useState('');
  const [federalExpended, setFederalExpended] = useState('');

  const [countryFilterName, setCountryFilterName] = useState('');
  const [federalFilterName, setFederalFilterName] = useState('');

  const handleSubChange = (panel) => (event, newExpanded) => {
    setSubExpended(newExpanded ? panel : false);
  };

  const dataCountryFiltered = applySortFilter({
    data: countries,
    filterName: countryFilterName,
  });

  const dataFederalFiltered = applySortFilter({
    data: federalFundraisers,
    filterName: federalFilterName,
  });

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'}>
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expanded={expanded === 'panel1' ? 'true' : 'false'}
          expandIcon={
            <IconButton
              color="secondary"
              size="small"
              aria-label="expend icon"
              onClick={() => setExpanded(expanded === 'panel1' ? false : 'panel1')}
            >
              <Iconify icon={expanded === 'panel1' ? 'akar-icons:minus' : 'akar-icons:plus'} />
            </IconButton>
          }
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <InputStyle
            stretchStart={280}
            placeholder="Search for Global Fundraisers"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 40,
                width: 280,
                [theme.breakpoints.up('md')]: {
                  width: 460,
                },
              },
            }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: 'center' }}> There is no fundraisers</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'}>
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
          expanded={expanded === 'panel2' ? 'true' : 'false'}
          expandIcon={
            <IconButton
              color="secondary"
              size="small"
              aria-label="expend icon"
              onClick={() => setExpanded(expanded === 'panel2' ? false : 'panel2')}
            >
              <Iconify icon={expanded === 'panel2' ? 'akar-icons:minus' : 'akar-icons:plus'} />
            </IconButton>
          }
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <InputStyle
            value={countryFilterName}
            onChange={(e) => setCountryFilterName(e.target.value)}
            stretchStart={280}
            placeholder="Enter Country for Federal Fundraisers"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 40,
                width: 280,
                [theme.breakpoints.up('md')]: {
                  width: 460,
                },
              },
            }}
          />
        </AccordionSummary>
        <AccordionDetails>
          {dataCountryFiltered.length > 0 ? (
            <>
              {dataCountryFiltered.map((country, index) => (
                <Accordion key={index} expanded={federalExpended === `federal-panel${index}`}>
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    expanded={federalExpended === `federal-panel${index}` ? 'true' : 'false'}
                    expandIcon={
                      <IconButton
                        color="secondary"
                        size="small"
                        aria-label="expend icon"
                        onClick={() =>
                          setFederalExpended(
                            federalExpended === `federal-panel${index}` ? false : `federal-panel${index}`
                          )
                        }
                      >
                        <Iconify
                          icon={federalExpended === `federal-panel${index}` ? 'akar-icons:minus' : 'akar-icons:plus'}
                        />
                      </IconButton>
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                    }}
                  >
                    {federalExpended === `federal-panel${index}` ? (
                      <InputStyle
                        value={federalFilterName}
                        onChange={(e) => setFederalFilterName(e.target.value)}
                        stretchStart={300}
                        placeholder={`Search fundraisers in ${country.label}`}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Iconify
                                icon={'eva:search-fill'}
                                sx={{ color: 'text.disabled', width: 20, height: 20 }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            height: 40,
                            width: 280,
                            [theme.breakpoints.up('md')]: {
                              width: 360,
                            },
                          },
                        }}
                      />
                    ) : (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <img
                          loading="lazy"
                          width="20"
                          height="11"
                          src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                          alt=""
                        />
                        <Typography variant="body2">
                          {country.label} ({country.code}) +{country.phone}
                        </Typography>
                      </Stack>
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    {dataFederalFiltered.length > 0 ? (
                      <>
                        {dataFederalFiltered.map((fundraiser) => (
                          <Accordion
                            key={fundraiser.id}
                            expanded={subExpended === `sub-panel${fundraiser.id}`}
                            onChange={handleSubChange(`sub-panel${fundraiser.id}`)}
                          >
                            <AccordionSummary
                              aria-controls={`sub-panel${fundraiser.id}d-content`}
                              id={`sub-panel${fundraiser.id}d-header`}
                              expanded={subExpended === `sub-panel${fundraiser.id}` ? 'true' : 'false'}
                            >
                              <Typography>{fundraiser.label}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                                <Typography>
                                  Increase Servicememeber Salaries <br />
                                  Goal: $50,000,000
                                </Typography>
                                <Box sx={{ position: 'relative', flexGrow: 1 }}>
                                  <BorderLinearProgress variant="determinate" value={11} />
                                  <Typography
                                    style={{
                                      position: 'absolute',
                                      color: 'white',
                                      top: 0,
                                      left: '5%',
                                      transform: 'translateX(-50%)',
                                    }}
                                  >
                                    11%
                                  </Typography>
                                  <Typography
                                    style={{
                                      position: 'absolute',
                                      color: 'text.primary',
                                      top: 0,
                                      left: '95%',
                                      transform: 'translateX(-50%)',
                                    }}
                                  >
                                    100%
                                  </Typography>
                                </Box>
                                <Button variant="contained">Donate</Button>
                              </Stack>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </>
                    ) : (
                      <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        No Results
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              No Results
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'}>
        <AccordionSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
          expanded={expanded === 'panel3' ? 'true' : 'false'}
          expandIcon={
            <IconButton
              color="secondary"
              size="small"
              aria-label="expend icon"
              onClick={() => setExpanded(expanded === 'panel3' ? false : 'panel3')}
            >
              <Iconify icon={expanded === 'panel3' ? 'akar-icons:minus' : 'akar-icons:plus'} />
            </IconButton>
          }
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <InputStyle
            stretchStart={280}
            placeholder="Enter American State or other Regional Subdivision for fundraisers"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 40,
                width: 280,
                [theme.breakpoints.up('md')]: {
                  width: 460,
                },
              },
            }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: 'center' }}> There is no fundraisers</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'}>
        <AccordionSummary
          aria-controls="panel4d-content"
          id="panel4d-header"
          expanded={expanded === 'panel4' ? 'true' : 'false'}
          expandIcon={
            <IconButton
              color="secondary"
              size="small"
              aria-label="expend icon"
              onClick={() => setExpanded(expanded === 'panel4' ? false : 'panel4')}
            >
              <Iconify icon={expanded === 'panel4' ? 'akar-icons:minus' : 'akar-icons:plus'} />
            </IconButton>
          }
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <InputStyle
            stretchStart={280}
            placeholder="Enter local Country, City, or town for local fundraisers"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 40,
                width: 280,
                [theme.breakpoints.up('md')]: {
                  width: 460,
                },
              },
            }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: 'center' }}> There is no fundraisers</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function applySortFilter({ data, filterName }) {
  if (filterName) {
    data = data.filter((item) => item.label.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return data;
}

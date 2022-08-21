import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { Stack, Typography, Box, Button } from '@mui/material';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// components
import Iconify from '../../components/Iconify';

import mockData from '../../assets/mock_up_data.json';

const { federalFundraisers } = mockData;

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
  const [expanded, setExpanded] = useState('');
  const [subExpended, setSubExpended] = useState('');
  const [federalExpended, setFederalExpended] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleFederalChange = (panel) => (event, newExpanded) => {
    setFederalExpended(newExpanded ? panel : false);
  };

  const handleSubChange = (panel) => (event, newExpanded) => {
    setSubExpended(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expanded={expanded === 'panel1' ? 'true' : 'false'}
        >
          <Typography>Global</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
          expanded={expanded === 'panel2' || subExpended ? 'true' : 'false'}
        >
          <Typography>Federal</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion
            expanded={federalExpended === 'federal-panel1'}
            onChange={handleFederalChange('federal-panel1')}
            sx={{ '& .Mui-expanded': { border: 'none' } }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              expanded={federalExpended === 'federal-panel1' ? 'true' : 'false'}
            >
              <Typography>United States</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {federalFundraisers.map((fundraiser) => (
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
                    <Typography>{fundraiser.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack direction="row" spacing={2} alignItems="center">
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
              F
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
          expanded={expanded === 'panel3' ? 'true' : 'false'}
        >
          <Typography>State (or other regional subdivision)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          aria-controls="panel4d-content"
          id="panel4d-header"
          expanded={expanded === 'panel4' ? 'true' : 'false'}
        >
          <Typography>Local (town or county - in the case of the USA)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

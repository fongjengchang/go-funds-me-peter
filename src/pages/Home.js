// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';
import { FaqsCategory, FaqsList } from '../sections/faqs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Faqs() {
  return (
    <Page title="Home">
      <RootStyle>
        <Container sx={{ mt: 5, mb: 0, position: 'relative' }}>

          <Grid container spacing={10}>
            <Grid item xs={12}>
              <FaqsList />
            </Grid>
          </Grid>
          <Box sx={{ mb: 10}} />
          <FaqsCategory />
        </Container>
      </RootStyle>
    </Page>
  );
}

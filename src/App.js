import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  App: {
    backgroundColor: '#14161a',
    color: '#fff',
    minHeight: '100vh'
  },
});

function App() {
  const classes = useStyles();
  
  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

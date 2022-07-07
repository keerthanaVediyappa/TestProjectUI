import './App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from './Popup';

function GetAllMovies() {
  const [allMovies, setAllMovies] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const getMovieList = () => {
    axios.get('http://localhost:3001/home')
      .then((res) => {
        setAllMovies(res.data)
      })
  }

  const ViewMovieDetails = (id) => {
    setIsOpen(!isOpen);
    axios.post('http://localhost:3001/home/id', {id})
    .then((res) => {
document.getElementById("json").textContent = JSON.stringify(res.data, undefined, 2);
    })
  }

  

  const url = "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000";
  const myStyle = {
    backgroundImage:
      `url(${url})`,
    height: '100vh',
    marginTop: '-1px',
    fontSize: '20px',
    backgroundPosition: 'center',
    backgroundrepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };
  return (<>
  <div className='container' style={myStyle}>
    <div className='row'>
    <button type='button' onClick={() => getMovieList()}>show All Movies</button>
    {allMovies.length ? (
    <table className='table table-brodered'>
      <thead>
        <tr><th>S.No</th><th>MovieName</th><th>Genre</th></tr>
      </thead>
      <tbody>
        {allMovies.map((result, index) => {
          return (<tr key={index}>
            <td>{index + 1}</td>
            <td><button onClick={() => ViewMovieDetails(result._id)}>{result.name}</button></td>
            <td>{result.genre}</td>
          </tr>)
        })}
      </tbody>
    </table>
    ):null}
  </div>
  </div>
  <div>
    {isOpen && <Popup
      content={<>
        <pre id="json"></pre>
      </>}
      handleClose={togglePopup}
    />}
  </div>
  </>
  )

}

function App() {

  const [movieList, setMovieList] = useState([]);


  const getTopMovies = () => {
    axios.get('http://localhost:3001/home/top')
      .then((res) => {
        const a = res.data
        setMovieList(a)
      })
  }


  useEffect(() => {
    getTopMovies();
  }, []);



  const url = "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000";
  const myStyle = {
    backgroundImage:
      `url(${url})`,
    height: '100vh',
    marginTop: '-1px',
    fontSize: '20px',
    backgroundPosition: 'center',
    backgroundrepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={myStyle}>
      <div className='container'>
        <div className="panel panel-default panel-info">
          <div className='panel-heading'><h2>Movie_Details</h2></div>
          <div className='panel-body p-3'>
            <div className='row'>
              <div className='col-5'>
                <div className='card'>
                  <h3>Top Movies</h3>
                  <table className='table table-brodered'>
                    <thead>
                      <tr><th>S.No</th><th>MovieId</th><th>MovieName</th><th>Genre</th><th>Votes</th></tr>
                    </thead>
                    <tbody>
                      {movieList.map((result, index) => {
                        return (<tr key={index}>
                          <td>{index + 1}</td>
                          <td>{result._id}</td>
                          <td>{result.name}</td>
                          <td>{result.genre}</td>
                          <td>{result.vote}</td>
                        </tr>)
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='col-10'>
            <GetAllMovies />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App(){
  const [user, setUser] = useState(null);
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState({});
  const [top, setTop] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(()=> {
    axios.get(process.env.REACT_APP_SERVER_URL + '/auth/me', { withCredentials: true })
      .then(r => setUser(r.data.user))
      .catch(()=> setUser(null));
    fetchTop();
  }, []);

  const fetchTop = async ()=> {
    try{
      const r = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/top-searches');
      setTop(r.data.top || []);
    }catch(e){}
  }

  const loginUrl = (provider) => process.env.REACT_APP_SERVER_URL + '/auth/' + provider;

  const doSearch = async (e) => {
    e && e.preventDefault();
    if(!term) return;
    try{
      const r = await axios.post(process.env.REACT_APP_SERVER_URL + '/api/search', { term }, { withCredentials: true });
      setResults(r.data.results || []);
      setSelected({});
      // fetch history
      const h = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/history', { withCredentials: true });
      setHistory(h.data.history || []);
    }catch(err){
      alert('Make sure you are logged in and server has UNSPLASH key. ' + (err.response && err.response.data && err.response.data.error || ''));
    }
  }

  const toggleSelect = (id) => {
    setSelected(prev => {
      const copy = {...prev};
      if(copy[id]) delete copy[id];
      else copy[id]=true;
      return copy;
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Image Search - Internship Task</h1>
        <div className="auth">
          {user ? (
            <>
              <span>Hi {user.displayName}</span>
              <a href={process.env.REACT_APP_SERVER_URL + '/auth/logout'}>Logout</a>
            </>
          ) : (
            <>
              <a href={loginUrl('google')}>Login with Google</a> | <a href={loginUrl('github')}>GitHub</a> | <a href={loginUrl('facebook')}>Facebook</a>
            </>
          )}
        </div>
      </header>

      <section className="top-banner">
        <strong>Top searches:</strong>
        {top.map(t => <button key={t.term} onClick={()=>{ setTerm(t.term); setTimeout(()=>doSearch(), 50); }}>{t.term} ({t.count})</button>)}
      </section>

      <main>
        <form onSubmit={doSearch} className="search-form">
          <input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search term..." />
          <button type="submit">Search</button>
        </form>

        <div className="info">Selected: {Object.keys(selected).length} images</div>

        <div className="grid">
          {results.map(img => (
            <div key={img.id} className="card">
              <label className="checkbox">
                <input type="checkbox" checked={!!selected[img.id]} onChange={()=>toggleSelect(img.id)} />
              </label>
              <img src={img.thumb} alt={img.alt || 'img'} />
            </div>
          ))}
        </div>

        {user && (
        <aside className="history">
          <h3>Your recent searches</h3>
          <ul>
            {history.map(h => <li key={h._id}>{h.term} — {new Date(h.timestamp).toLocaleString()}</li>)}
          </ul>
        </aside>
        )}
      </main>
    </div>
  );
}

export default App;

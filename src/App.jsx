import { useEffect, useState } from 'react';
import Header from './components/Header';
import RingkasanFilm from './components/RingkasanFilm';
import FormTambahFilm from './components/FormTambahFilm';
import DaftarFilm from './components/DaftarFilm';
import RekomendasiFilmAPI from './components/RekomendasiFilmAPI';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/films';

export default function App() {
  const [daftarFilm, setDaftarFilm] = useState([]);
  const [activeTab, setActiveTab] = useState('koleksi');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const muatDaftarFilm = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Gagal memuat data (status ${response.status})`);
      }
      const data = await response.json();
      setDaftarFilm(data);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal terhubung ke server backend.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    muatDaftarFilm();
  }, []);

  const handleTambahFilm = async (filmBaru) => {
    const { id: _ignoredId, ...payload } = filmBaru;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Gagal menyimpan film (status ${response.status})`);
      }
      const filmTersimpan = await response.json();
      setDaftarFilm((prevDaftar) => [filmTersimpan, ...prevDaftar]);
    } catch (err) {
      alert(err.message || 'Gagal menyimpan film ke server.');
    }
  };

  const handleHapusFilm = async (id) => {
    const konfirmasi = window.confirm('Hapus film ini dari katalog?');
    if (!konfirmasi) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Gagal menghapus film (status ${response.status})`);
      }
      setDaftarFilm((prevDaftar) => prevDaftar.filter((film) => film.id !== id));
    } catch (err) {
      alert(err.message || 'Gagal menghapus film di server.');
    }
  };

  const handleToggleStatus = async (id) => {
    const target = daftarFilm.find((film) => film.id === id);
    if (!target) return;
    const statusBaru =
      target.status === 'Sudah Ditonton' ? 'Belum Ditonton' : 'Sudah Ditonton';
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusBaru }),
      });
      if (!response.ok) {
        throw new Error(`Gagal memperbarui status (status ${response.status})`);
      }
      const filmTerbaru = await response.json();
      setDaftarFilm((prevDaftar) =>
        prevDaftar.map((film) => (film.id === id ? filmTerbaru : film)),
      );
    } catch (err) {
      alert(err.message || 'Gagal memperbarui status film di server.');
    }
  };

  return (
    <div className="site-wrapper">
      <Header />

      <div className="tab-navigation">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'koleksi' ? 'active' : ''}`}
          onClick={() => setActiveTab('koleksi')}
        >
          Koleksi Film ({daftarFilm.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'eksplorasi' ? 'active' : ''}`}
          onClick={() => setActiveTab('eksplorasi')}
        >
          Eksplorasi Film
        </button>
      </div>

      <main className="main-layout">
        {activeTab === 'koleksi' ? (
          <>
            <RingkasanFilm daftarFilm={daftarFilm} />
            <FormTambahFilm onTambahFilm={handleTambahFilm} />
            {isLoading ? (
              <div className="api-state-panel loading-panel">
                <div className="spinner"></div>
                <p className="state-title">Memuat koleksi film...</p>
              </div>
            ) : errorMessage ? (
              <div className="api-state-panel error-panel">
                <p className="state-title">Gagal Memuat Koleksi</p>
                <p className="state-desc">{errorMessage}</p>
                <button type="button" onClick={muatDaftarFilm} className="btn-retry">
                  Coba Lagi
                </button>
              </div>
            ) : (
              <DaftarFilm
                daftarFilm={daftarFilm}
                onHapusFilm={handleHapusFilm}
                onToggleStatus={handleToggleStatus}
              />
            )}
          </>
        ) : (
          <RekomendasiFilmAPI onImportFilm={handleTambahFilm} />
        )}
      </main>

      <footer className="site-footer">
        <p>2026 Filmfolio - Movie Watchlist & Catalog System</p>
      </footer>
    </div>
  );
}

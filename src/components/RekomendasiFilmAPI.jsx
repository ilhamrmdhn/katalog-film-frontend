import { useState, useEffect } from 'react';
import { Search, RotateCcw, AlertCircle, Plus, Star } from 'lucide-react';

export default function RekomendasiFilmAPI({ onImportFilm }) {
  const [keyword, setKeyword] = useState('marvel');
  const [inputCari, setInputCari] = useState('marvel');
  const [daftarAPI, setDaftarAPI] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchFilmDariAPI = async (queryParam) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(queryParam)}`);

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const hasil = await response.json();
      setDaftarAPI(hasil);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal mengambil data dari API eksternal.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilmDariAPI(keyword);
  }, [keyword]);

  const handleCari = (e) => {
    e.preventDefault();
    if (inputCari.trim()) {
      setKeyword(inputCari.trim());
    }
  };

  const handleTambahKeKatalog = (item) => {
    const show = item.show;
    const sinopsisBersih = show.summary
      ? show.summary.replace(/<[^>]+>/g, '').trim()
      : 'Sinopsis tidak tersedia.';

    const filmBaru = {
      id: Date.now(),
      judul: show.name,
      sutradara: show.network ? show.network.name : 'Studio Eksternal',
      genre: show.genres && show.genres.length > 0 ? show.genres[0] : 'Umum',
      tahun: show.premiered ? parseInt(show.premiered.slice(0, 4), 10) : new Date().getFullYear(),
      rating: show.rating && show.rating.average ? show.rating.average : 7.5,
      status: 'Belum Ditonton',
      sinopsis: sinopsisBersih,
    };

    onImportFilm(filmBaru);
  };

  return (
    <section className="api-section">
      <div className="section-bar">
        <div>
          <h2 className="section-heading">Eksplorasi Film (API Publik)</h2>
          <p className="section-subheading">Data real-time diambil secara asinkron dari TVMaze REST API</p>
        </div>

        <form onSubmit={handleCari} className="api-search-form">
          <input
            type="text"
            placeholder="Cari film di API..."
            value={inputCari}
            onChange={(e) => setInputCari(e.target.value)}
            className="api-search-input"
          />
          <button type="submit" className="api-search-btn">
            <Search size={15} />
            <span>Cari</span>
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="api-state-panel loading-panel">
          <div className="spinner"></div>
          <p className="state-title">Sedang memuat data dari API...</p>
          <p className="state-desc">Mengambil daftar film rekomendasi secara asinkron</p>
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="api-state-panel error-panel">
          <AlertCircle size={36} className="error-icon" />
          <p className="state-title">Pengambilan Data Gagal</p>
          <p className="state-desc">{errorMessage}</p>
          <button
            type="button"
            onClick={() => fetchFilmDariAPI(keyword)}
            className="btn-retry"
          >
            <RotateCcw size={14} />
            <span>Coba Lagi</span>
          </button>
        </div>
      )}

      {!isLoading && !errorMessage && daftarAPI.length === 0 && (
        <div className="api-state-panel empty-api-panel">
          <p className="state-title">Tidak ada hasil ditemukan</p>
          <p className="state-desc">Silakan coba kata kunci pencarian yang lain.</p>
        </div>
      )}

      {!isLoading && !errorMessage && daftarAPI.length > 0 && (
        <div className="api-movie-grid">
          {daftarAPI.map((item) => (
            <article key={item.show.id} className="api-card">
              <div className="api-card-top">
                <span className="api-genre">
                  {item.show.genres && item.show.genres.length > 0
                    ? item.show.genres[0]
                    : 'Umum'}
                </span>
                <span className="api-year">
                  {item.show.premiered ? item.show.premiered.slice(0, 4) : '-'}
                </span>
              </div>

              <h4 className="api-title">{item.show.name}</h4>

              <p className="api-summary">
                {item.show.summary
                  ? item.show.summary.replace(/<[^>]+>/g, '').trim()
                  : 'Tidak ada sinopsis tersedia.'}
              </p>

              <div className="api-card-bottom">
                <div className="api-rating">
                  <Star size={13} className="star-fill" />
                  <span>{item.show.rating && item.show.rating.average ? item.show.rating.average : '-'}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleTambahKeKatalog(item)}
                  className="btn-import"
                  title="Tambahkan ke katalog pribadi Anda"
                >
                  <Plus size={13} />
                  <span>Koleksi</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}


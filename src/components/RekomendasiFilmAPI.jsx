import { useState, useEffect } from 'react';
import { Search, RotateCcw, AlertCircle, Plus, Star } from 'lucide-react';

export default function RekomendasiFilmAPI({ onImportFilm }) {
  const [keyword, setKeyword] = useState('');
  const [inputCari, setInputCari] = useState('');
  const [daftarAPI, setDaftarAPI] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchFilmDariAPI = async (queryParam) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const url = queryParam.trim()
        ? `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(queryParam)}`
        : 'https://api.tvmaze.com/shows';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const hasil = await response.json();
      const listNormal = hasil.map((item) => (item.show ? item.show : item));
      const hasilTampil = queryParam.trim() ? listNormal : listNormal.slice(0, 12);
      
      setDaftarAPI(hasilTampil);
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
    setKeyword(inputCari.trim());
  };

  const handleTambahKeKatalog = (show) => {
    const sinopsisBersih = show.summary
      ? show.summary.replace(/<[^>]+>/g, '').trim()
      : 'Sinopsis tidak tersedia.';

    const filmBaru = {
      id: Date.now(),
      judul: show.name,
      sutradara: show.network ? show.network.name : (show.webChannel ? show.webChannel.name : 'Studio Eksternal'),
      genre: show.genres && show.genres.length > 0 ? show.genres[0] : 'Umum',
      tahun: show.premiered ? parseInt(show.premiered.slice(0, 4), 10) : new Date().getFullYear(),
      rating: show.rating && show.rating.average ? show.rating.average : 7.5,
      status: 'Belum Ditonton',
      sinopsis: sinopsisBersih,
    };

    onImportFilm(filmBaru);
    alert(`"${show.name}" berhasil ditambahkan ke Koleksi Saya!`);
  };

  return (
    <section className="catalog-section">
      <div className="section-bar">
        <div>
          <h2 className="section-heading">Eksplorasi Film</h2>
          <p className="section-subheading">Data real-time diambil dari TVMaze REST API</p>
        </div>

        <form onSubmit={handleCari} className="api-search-form">
          <input
            type="text"
            placeholder="Cari judul film..."
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
        <div className="movie-grid">
          {daftarAPI.map((show) => {
            const studio = show.network ? show.network.name : (show.webChannel ? show.webChannel.name : 'Studio Eksternal');
            const genre = show.genres && show.genres.length > 0 ? show.genres[0] : 'Umum';
            const year = show.premiered ? show.premiered.slice(0, 4) : '-';
            const ratingScore = show.rating && show.rating.average ? show.rating.average : '7.5';
            const synopsis = show.summary
              ? show.summary.replace(/<[^>]+>/g, '').trim()
              : 'Sinopsis tidak tersedia.';

            return (
              <article key={show.id} className="movie-card">
                <div className="card-top">
                  <div className="card-heading">
                    <span className="genre-pill">{genre}</span>
                    <h3 className="movie-title">{show.name}</h3>
                    <p className="movie-director">Oleh {studio}</p>
                  </div>
                  <span className="year-pill">{year}</span>
                </div>

                <p className="movie-synopsis">{synopsis}</p>

                <div className="card-meta">
                  <div className="rating-tag">
                    <Star size={14} className="star-fill" />
                    <span className="rating-score">{ratingScore}</span>
                    <span className="rating-max">/10</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button
                    type="button"
                    onClick={() => handleTambahKeKatalog(show)}
                    className="btn-action btn-import-action"
                    title="Tambahkan film ini ke koleksi saya"
                  >
                    <Plus size={14} />
                    <span>Tambahkan ke Koleksi</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

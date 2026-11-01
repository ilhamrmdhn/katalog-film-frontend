import { Star, Check, RotateCcw, Trash2 } from 'lucide-react';

export default function KartuFilm({ film, onHapusFilm, onToggleStatus }) {
  const isWatched = film.status === 'Sudah Ditonton';

  return (
    <article className="movie-card">
      <div className="card-top">
        <div className="card-heading">
          <span className="genre-pill">{film.genre}</span>
          <h3 className="movie-title">{film.judul}</h3>
          <p className="movie-director">Oleh {film.sutradara}</p>
        </div>
        <span className="year-pill">{film.tahun}</span>
      </div>

      <p className="movie-synopsis">{film.sinopsis}</p>

      <div className="card-meta">
        <div className="rating-tag">
          <Star size={14} className="star-fill" />
          <span className="rating-score">{film.rating}</span>
          <span className="rating-max">/10</span>
        </div>
        <span className={`status-pill ${isWatched ? 'pill-watched' : 'pill-unwatched'}`}>
          {film.status}
        </span>
      </div>

      <div className="card-actions">
        <button
          type="button"
          onClick={() => onToggleStatus(film.id)}
          className={`btn-action ${isWatched ? 'btn-status-toggle' : 'btn-status-mark'}`}
          title={isWatched ? 'Tandai belum ditonton' : 'Tandai sudah ditonton'}
        >
          {isWatched ? (
            <>
              <RotateCcw size={14} />
              <span>Watchlist</span>
            </>
          ) : (
            <>
              <Check size={14} />
              <span>Selesai Nonton</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onHapusFilm(film.id)}
          className="btn-action btn-danger"
          title="Hapus film dari katalog"
        >
          <Trash2 size={14} />
          <span>Hapus</span>
        </button>
      </div>
    </article>
  );
}

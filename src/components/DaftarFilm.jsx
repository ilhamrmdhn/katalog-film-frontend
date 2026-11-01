import { Film } from 'lucide-react';
import KartuFilm from './KartuFilm';

export default function DaftarFilm({ daftarFilm, onHapusFilm, onToggleStatus }) {
  return (
    <section className="catalog-section">
      <div className="section-bar">
        <div>
          <h2 className="section-heading">Koleksi Film</h2>
          <p className="section-subheading">Daftar film yang tersimpan dalam arsip</p>
        </div>
        <span className="badge-counter">{daftarFilm.length} Judul</span>
      </div>

      {daftarFilm.length === 0 ? (
        <div className="empty-panel">
          <div className="empty-icon-wrap">
            <Film size={32} strokeWidth={1.5} />
          </div>
          <h3 className="empty-title">Belum ada data film</h3>
          <p className="empty-description">
            Katalog masih kosong. Tambahkan film pertama Anda melalui formulir di atas.
          </p>
        </div>
      ) : (
        <div className="movie-grid">
          {daftarFilm.map((film) => (
            <KartuFilm
              key={film.id}
              film={film}
              onHapusFilm={onHapusFilm}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </section>
  );
}

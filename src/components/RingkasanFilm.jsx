export default function RingkasanFilm({ daftarFilm }) {
  const totalFilm = daftarFilm.length;
  const sudahDitonton = daftarFilm.filter((f) => f.status === 'Sudah Ditonton').length;
  const belumDitonton = totalFilm - sudahDitonton;

  const rataRataRating =
    totalFilm > 0
      ? (
          daftarFilm.reduce((acc, curr) => acc + Number(curr.rating), 0) /
          totalFilm
        ).toFixed(1)
      : '0.0';

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <span className="stat-label">Total Koleksi</span>
        <span className="stat-number">{totalFilm}</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Sudah Ditonton</span>
        <span className="stat-number">{sudahDitonton}</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Watchlist</span>
        <span className="stat-number">{belumDitonton}</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Rata-rata Rating</span>
        <span className="stat-number">{rataRataRating} <small>/10</small></span>
      </div>
    </section>
  );
}

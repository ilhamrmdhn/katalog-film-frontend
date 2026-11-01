import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function FormTambahFilm({ onTambahFilm }) {
  const [judul, setJudul] = useState('');
  const [sutradara, setSutradara] = useState('');
  const [genre, setGenre] = useState('Action');
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [rating, setRating] = useState('8.0');
  const [status, setStatus] = useState('Belum Ditonton');
  const [sinopsis, setSinopsis] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!judul.trim() || !sutradara.trim()) {
      alert('Judul film dan sutradara wajib diisi!');
      return;
    }

    const filmBaru = {
      id: Date.now(),
      judul: judul.trim(),
      sutradara: sutradara.trim(),
      genre,
      tahun: Number(tahun),
      rating: parseFloat(rating),
      status,
      sinopsis: sinopsis.trim() || 'Sinopsis belum ditambahkan.',
    };

    onTambahFilm(filmBaru);

    setJudul('');
    setSutradara('');
    setGenre('Action');
    setTahun(new Date().getFullYear());
    setRating('8.0');
    setStatus('Belum Ditonton');
    setSinopsis('');
  };

  return (
    <section className="panel-card form-panel">
      <div className="panel-header">
        <h2 className="panel-title">Tambah Film</h2>
        <p className="panel-desc">Lengkapi formulir untuk menambahkan catatan film baru</p>
      </div>

      <form onSubmit={handleSubmit} className="entry-form">
        <div className="form-grid">
          <div className="field-group">
            <label htmlFor="judul">Judul Film <span className="req">*</span></label>
            <input
              id="judul"
              type="text"
              placeholder="Contoh: Inception"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="sutradara">Sutradara <span className="req">*</span></label>
            <input
              id="sutradara"
              type="text"
              placeholder="Contoh: Christopher Nolan"
              value={sutradara}
              onChange={(e) => setSutradara(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Horor">Horor</option>
              <option value="Komedi">Komedi</option>
              <option value="Animasi">Animasi</option>
              <option value="Thriller">Thriller</option>
              <option value="Petualangan">Petualangan</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="tahun">Tahun Rilis</label>
            <input
              id="tahun"
              type="number"
              min="1900"
              max="2099"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="rating">Rating (1.0 - 10.0)</label>
            <input
              id="rating"
              type="number"
              step="0.1"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="status">Status Tonton</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Belum Ditonton">Belum Ditonton</option>
              <option value="Sudah Ditonton">Sudah Ditonton</option>
            </select>
          </div>
        </div>

        <div className="field-group full-span">
          <label htmlFor="sinopsis">Sinopsis Singkat</label>
          <textarea
            id="sinopsis"
            rows="2"
            placeholder="Tulis ringkasan singkat alur cerita film..."
            value={sinopsis}
            onChange={(e) => setSinopsis(e.target.value)}
          />
        </div>

        <div className="form-footer">
          <button type="submit" className="btn-primary">
            <Plus size={16} strokeWidth={2.5} />
            <span>Simpan ke Katalog</span>
          </button>
        </div>
      </form>
    </section>
  );
}

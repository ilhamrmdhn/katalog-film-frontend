import { useState } from 'react';
import Header from './components/Header';
import RingkasanFilm from './components/RingkasanFilm';
import FormTambahFilm from './components/FormTambahFilm';
import DaftarFilm from './components/DaftarFilm';
import './App.css';

const DATA_AWAL_FILM = [
  {
    id: 1,
    judul: 'Oppenheimer',
    sutradara: 'Christopher Nolan',
    genre: 'Drama',
    tahun: 2023,
    rating: 8.9,
    status: 'Sudah Ditonton',
    sinopsis:
      'Kisah fisikawan teoretis J. Robert Oppenheimer yang memimpin Proyek Manhattan untuk menciptakan senjata nuklir pertama dalam sejarah.',
  },
  {
    id: 2,
    judul: 'Interstellar',
    sutradara: 'Christopher Nolan',
    genre: 'Sci-Fi',
    tahun: 2014,
    rating: 8.7,
    status: 'Sudah Ditonton',
    sinopsis:
      'Sekelompok penjelajah melintasi lubang cacing di luar angkasa dalam misi mencari planet baru yang layak huni bagi kelangsungan umat manusia.',
  },
  {
    id: 3,
    judul: 'Spirited Away',
    sutradara: 'Hayao Miyazaki',
    genre: 'Animasi',
    tahun: 2001,
    rating: 8.6,
    status: 'Sudah Ditonton',
    sinopsis:
      'Gadis 10 tahun bernama Chihiro tanpa sengaja masuk ke alam roh dan bekerja di pemandian ajaib milik penyihir Yubaba demi menyelamatkan orang tuanya.',
  },
  {
    id: 4,
    judul: 'Laskar Pelangi',
    sutradara: 'Riri Riza',
    genre: 'Drama',
    tahun: 2008,
    rating: 8.0,
    status: 'Belum Ditonton',
    sinopsis:
      'Kisah inspiratif perjuangan 10 anak di Pulau Belitung yang gigih menuntut ilmu di sekolah Muhammadiyah sederhana demi meraih impian masa depan.',
  },
  {
    id: 5,
    judul: 'The Dark Knight',
    sutradara: 'Christopher Nolan',
    genre: 'Action',
    tahun: 2008,
    rating: 9.0,
    status: 'Sudah Ditonton',
    sinopsis:
      'Batman menghadapi ujian terbesarnya ketika psikopat jenius berjuluk The Joker menyebarkan kekacauan dan anarki di Kota Gotham.',
  },
  {
    id: 6,
    judul: 'Parasite',
    sutradara: 'Bong Joon-ho',
    genre: 'Thriller',
    tahun: 2019,
    rating: 8.5,
    status: 'Belum Ditonton',
    sinopsis:
      'Sebuah keluarga miskin menyusup dan bekerja satu per satu di kediaman keluarga kaya raya dengan intrik tipu daya yang berujung tak terduga.',
  },
];

export default function App() {
  const [daftarFilm, setDaftarFilm] = useState(DATA_AWAL_FILM);

  const handleTambahFilm = (filmBaru) => {
    setDaftarFilm((prevDaftar) => [filmBaru, ...prevDaftar]);
  };

  const handleHapusFilm = (id) => {
    const konfirmasi = window.confirm('Hapus film ini dari katalog?');
    if (konfirmasi) {
      setDaftarFilm((prevDaftar) => prevDaftar.filter((film) => film.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setDaftarFilm((prevDaftar) =>
      prevDaftar.map((film) => {
        if (film.id === id) {
          const statusBaru =
            film.status === 'Sudah Ditonton'
              ? 'Belum Ditonton'
              : 'Sudah Ditonton';
          return { ...film, status: statusBaru };
        }
        return film;
      })
    );
  };

  return (
    <div className="site-wrapper">
      <Header />

      <main className="main-layout">
        <RingkasanFilm daftarFilm={daftarFilm} />
        <FormTambahFilm onTambahFilm={handleTambahFilm} />
        <DaftarFilm
          daftarFilm={daftarFilm}
          onHapusFilm={handleHapusFilm}
          onToggleStatus={handleToggleStatus}
        />
      </main>

      <footer className="site-footer">
        <p>2026 Filmfolio  - Movie Watchlist & Catalog System</p>
      </footer>
    </div>
  );
}

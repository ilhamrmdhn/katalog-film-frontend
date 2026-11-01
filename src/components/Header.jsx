export default function Header() {
  return (
    <header className="header-bar">
      <div className="header-brand">
        <h1 className="brand-title">Filmfolio</h1>
        <p className="brand-tagline">Katalog & Manajemen Film Favorit</p>
      </div>
      <div className="header-meta">
        <span className="live-status-pill">Personal Watchlist</span>
      </div>
    </header>
  );
}

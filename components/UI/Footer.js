export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <section>
          <span className="footer-pageTitle">RicknMorty House</span> by &nbsp;
          <a
            href="https://github.com/thanhhoan77"
            target="_blank"
            className="footer-link"
          >
            Thanh Hoan
          </a>
        </section>
        <section style={{ margin: "10px 0 10px 0" }}>
          All data are from{" "}
          <a
            href="https://rickandmortyapi.com/"
            target="_blank"
            className="footer-link"
          >
            The Rick and Morty API{" "}
          </a>
        </section>
        <section>
          This website is not produced, endorsed, supported, or affiliated with
          any companies.
        </section>
      </div>
    </>
  );
}

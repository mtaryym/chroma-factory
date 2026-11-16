import React, { useState } from "react";

// ==========================================
// 1. INFORMACIÓN DE LAS PLANTILLAS: ITEMS
// ==========================================

const diseños = [
  {
    id: 1,
    nombre: "Fresh Business",
    tipo: "Poster",
    categoria: "Alimentos",
    descripcion: "Diseño publicitario para promocionar productos alimenticios.",
    imagen: "plantilla-01.jpg"
  },
  {
    id: 2,
    nombre: "Sweet Moments",
    tipo: "Poster",
    categoria: "Alimentos",
    descripcion: "Plantilla para cafeterías, pastelerías y emprendimientos gastronómicos.",
    imagen: "plantilla-02.jpg"
  },
  {
    id: 3,
    nombre: "Daily Fresh",
    tipo: "Banner",
    categoria: "Alimentos",
    descripcion: "Diseño fresco para promocionar productos y ofertas alimenticias.",
    imagen: "plantilla-03.jpg"
  },
  {
    id: 4,
    nombre: "Taste & Share",
    tipo: "Poster",
    categoria: "Alimentos",
    descripcion: "Una propuesta visual para destacar productos y promociones gastronómicas.",
    imagen: "plantilla-04.jpg"
  },
  {
    id: 5,
    nombre: "Bakery Bloom",
    tipo: "Banner",
    categoria: "Alimentos",
    descripcion: "Plantilla para panaderías, reposterías y pequeños negocios de comida.",
    imagen: "plantilla-05.jpg"
  },
  {
    id: 6,
    nombre: "Urban Style",
    tipo: "Banner",
    categoria: "Ropa y calzado",
    descripcion: "Diseño para promocionar colecciones de ropa, zapatos y accesorios.",
    imagen: "plantilla-06.jpg"
  },
  {
    id: 7,
    nombre: "Color Pop",
    tipo: "Poster",
    categoria: "Ropa y calzado",
    descripcion: "Una propuesta creativa para destacar prendas y accesorios.",
    imagen: "plantilla-07.jpg"
  },
  {
    id: 8,
    nombre: "Tech Revolution",
    tipo: "Poster",
    categoria: "Tecnología",
    descripcion: "Plantilla para promocionar productos tecnológicos.",
    imagen: "plantilla-08.jpg"
  },
  {
    id: 9,
    nombre: "Digital Future",
    tipo: "Banner",
    categoria: "Tecnología",
    descripcion: "Diseño moderno para destacar productos y servicios digitales.",
    imagen: "plantilla-09.jpg"
  },
  {
    id: 10,
    nombre: "Glow & Care",
    tipo: "Poster",
    categoria: "Cuidado personal",
    descripcion: "Diseño para promocionar productos de belleza y cuidado personal.",
    imagen: "plantilla-10.jpg"
  }
];

// ==========================================
// 2. BARRA DE NAVEGACIÓN
// ==========================================

function Navbar() {
  return (
    <header className="navbar">

      <a href="#inicio" className="logo">

        <img
          src={`${import.meta.env.BASE_URL}imagenes/logo/logo.png`}
          alt="Logo Chroma Factory"
          className="logo-image"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <span>
          Chroma Factory<span className="logo-dot">.</span>
        </span>

      </a>

      <nav className="nav-links">
        <a href="#inicio">Inicio</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <a href="#catalogo" className="nav-button">
        Explorar diseños ↗
      </a>

    </header>
  );
}

// ==========================================
// 3. PORTADA PRINCIPAL
// ==========================================

function Hero() {
  return (
    <section className="hero" id="inicio">

      <div className="hero-content">

        <span className="eyebrow">
          ✳ TU CREATIVIDAD, SIN LÍMITES
        </span>

        <h1>
          Crea y edita publicidad para
          <span> tu negocio.</span>
        </h1>

        <p>
          Dale vida a tu negocio con diseños publicitarios únicos.
          Explora, personaliza y crea anuncios que transmitan
          la esencia y propósito de tu marca.
        </p>

        <div className="hero-actions">

          <a href="#catalogo" className="primary-button">
            Explorar catálogo →
          </a>

          <a href="#nosotros" className="secondary-button">
            Conoce más
          </a>

        </div>

        <div className="hero-note">
          <span>✳</span>
          Creatividad diseñada para pequeños negocios.
        </div>

      </div>

      <div className="hero-art">

        <div className="art-decoration decoration-one">
          ✳
        </div>

        <div className="art-decoration decoration-two">
          ✦
        </div>

        <div className="poster poster-back">
          <span>OFERTA DEL 50%</span>
          <strong>NUEVOS
            CLIENTES
          </strong>
          <span>NUEVOS PRODUCTOS</span>
        </div>

        <div className="poster poster-front">

          <span className="poster-tag">
            ESTUDIO CREATIVO
          </span>

          <h2>
            DISEÑO
            <br />
            Y ARTE
          </h2>

          <div className="poster-circle"></div>

          <span className="poster-bottom">
            NUEVOS LIENZOS ✳
          </span>

        </div>

        <div className="floating-label">
          ✦ Empieza a crear!
        </div>

      </div>

    </section>
  );
}

// ==========================================
// 4. VISTA PREVIA DE CADA PLANTILLA
// ==========================================

function DesignPreview({ diseño }) {

  const [imagenDisponible, setImagenDisponible] = useState(true);

  return (
    <div className="design-preview">

      {imagenDisponible ? (

        <img
          src={
            `${import.meta.env.BASE_URL}imagenes/plantillas/${diseño.imagen}`
          }
          alt={`Vista previa de ${diseño.nombre}`}
          className="template-image"
          onError={() => setImagenDisponible(false)}
        />

      ) : (

        <div className="preview-placeholder">

          <span>✳</span>

          <strong>
            Vista previa
          </strong>

          <small>
            Agrega tu imagen en la carpeta de plantillas
          </small>

        </div>

      )}

    </div>
  );
}

// ==========================================
// 5. VENTANA DE INFORMACIÓN DEL DISEÑO
// ==========================================

function ModalDiseno({ diseño, cerrar, editar }) {

  if (!diseño) return null;

  return (
    <div
      className="modal-overlay"
      onClick={cerrar}
    >

      <div
        className="design-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >

        <button
          className="modal-close"
          onClick={cerrar}
          aria-label="Cerrar ventana"
        >
          ×
        </button>

        <div className="modal-preview">
          <DesignPreview diseño={diseño} />
        </div>

        <div className="modal-content">

          <span className="eyebrow">
            DETALLES DE LA PLANTILLA
          </span>

          <h2 id="modal-title">
            {diseño.nombre}
          </h2>

          <p className="modal-description">
            {diseño.descripcion}
          </p>

          <div className="design-details">

            <div className="detail-item">
              <span>Tipo de diseño</span>
              <strong>{diseño.tipo}</strong>
            </div>

            <div className="detail-item">
              <span>Categoría</span>
              <strong>{diseño.categoria}</strong>
            </div>

          </div>

          <button
            className="primary-button modal-edit"
            onClick={editar}
          >
            Editar diseño →
          </button>

          <p className="modal-note">
            Personaliza esta plantilla y conviértela
            en tu propia creación.
          </p>

        </div>

      </div>

    </div>
  );
}

// ==========================================
// 6. CATÁLOGO
// ==========================================

function Catalogo() {

  const [seleccionado, setSeleccionado] = useState(null);

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const categorias = [
    "Todos",
    "Alimentos",
    "Ropa y calzado",
    "Tecnología",
    "Cuidado personal"
  ];

  const diseñosFiltrados =
    categoriaActiva === "Todos"
      ? diseños
      : diseños.filter(
          (diseño) => diseño.categoria === categoriaActiva
        );

  function abrirEditor() {

    alert(
      "¡Plantilla seleccionada! Próximamente conectaremos el editor de diseños."
    );

    setSeleccionado(null);
  }

  return (
    <section className="catalog-section" id="catalogo">

      <div className="section-heading">

        <div>

          <span className="eyebrow">
            ✳ INSPIRACIÓN PARA TU NEGOCIO
          </span>

          <h2>
            Explora nuestras <span>plantillas.</span>
          </h2>

          <p>
            Encuentra en nuestro catálogo la plantilla perfecta para promocionar
            tus ideas y destacar tu emprendimiento.
          </p>

        </div>

        <span className="catalog-count">
          {String(diseñosFiltrados.length).padStart(2, "0")}
          {" "}DISEÑOS DISPONIBLES
        </span>

      </div>

      <div className="category-filters">

        {categorias.map((categoria) => (

          <button
            key={categoria}
            className={
              categoriaActiva === categoria
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setCategoriaActiva(categoria)}
          >
            {categoria}
          </button>

        ))}

      </div>

      <div className="catalog-grid">

        {diseñosFiltrados.map((diseño) => (

          <article
            className="design-card"
            key={diseño.id}
            onClick={() => setSeleccionado(diseño)}
            onKeyDown={(event) => {

              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
                setSeleccionado(diseño);
              }

            }}
            role="button"
            tabIndex={0}
            aria-label={`Ver detalles de ${diseño.nombre}`}
          >

            <DesignPreview diseño={diseño} />

            <div className="design-info">

              <div>

                <span className="design-category">
                  {diseño.categoria}
                </span>

                <h3>
                  {diseño.nombre}
                </h3>

                <p>
                  {diseño.descripcion}
                </p>

              </div>

              <span className="design-explore">
                Ver diseño ↗
              </span>

            </div>

          </article>

        ))}

      </div>

      <ModalDiseno
        diseño={seleccionado}
        cerrar={() => setSeleccionado(null)}
        editar={abrirEditor}
      />

    </section>
  );
}

// ==========================================
// 7. SECCIÓN NOSOTROS
// ==========================================

function Nosotros() {
  return (
    <section className="about-section" id="nosotros">

      <div className="about-symbol">
        ✳
      </div>

      <div className="about-content">

        <span className="eyebrow">
          SOBRE NOSOTROS:
        </span>

        <h2>
          Tu negocio también merece <span>brillar.</span>
        </h2>

        <p>
          Chroma Factory nace como una ayuda y espacio creativo pensado
          para pequeños emprendedores que desean aprender a comunicar
          sus ideas de una manera más efectiva, visual, original
          y diferente.
        </p>

        <a href="#catalogo" className="about-button">
          Encuentra tu inspiración →
        </a>

      </div>

    </section>
  );
}

// ==========================================
// 8. SECCIÓN DE CONTACTO
// ==========================================

function Contacto() {
  return (
    <section className="contact-section" id="contacto">

      <div className="contact-heading">

        <span className="eyebrow">
          HABLEMOS DE TUS IDEAS
        </span>

        <h2>
          ¿Tienes un proyecto en mente?
        </h2>

        <p>
          Escríbenos y cuéntanos qué tienes en mente.
          Nos encantará conocer tu idea.
        </p>

      </div>

      <form
        className="contact-form"
        onSubmit={(event) => {

          event.preventDefault();

          alert(
            "Formulario preparado. Próximamente conectaremos el servidor."
          );

          event.target.reset();

        }}
      >

        <div className="form-row">

          <div className="form-group">

            <label htmlFor="nombre">
              Nombre
            </label>

            <input
              type="text"
              id="nombre"
              placeholder="Tu nombre"
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="correo">
              Correo electrónico
            </label>

            <input
              type="email"
              id="correo"
              placeholder="correo@ejemplo.com"
              required
            />

          </div>

        </div>

        <div className="form-group">

          <label htmlFor="mensaje">
            Cuéntanos tu idea
          </label>

          <textarea
            id="mensaje"
            rows="5"
            placeholder="Me gustaría crear un anuncio para..."
            required
          ></textarea>

        </div>

        <button
          type="submit"
          className="primary-button"
        >
          Enviar mensaje →
        </button>

      </form>

    </section>
  );
}

// ==========================================
// 9. FOOTER
// ==========================================

function Footer() {
  return (
    <footer className="footer">

      <a href="#inicio" className="logo footer-logo">

        <span>
          Chroma Factory<span className="logo-dot">.</span>
        </span>

      </a>

      <p>
        Convierte tus ideas en algo extraordinario. ✳
      </p>

      <span className="copyright">
        © 2026 Chroma Factory. Todos los derechos reservados.
      </span>

    </footer>
  );
}

// ==========================================
// 10. APLICACIÓN PRINCIPAL
// ==========================================

function App() {

  return (
    <>

      <Navbar />

      <main>

        <Hero />

        <Catalogo />

        <Nosotros />

        <Contacto />

      </main>

      <Footer />

    </>
  );
}

export default App;
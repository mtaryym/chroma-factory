import React, { useState, useEffect } from "react";
import Admin from "./Admin.jsx";
import Chatbot from "./Chatbot.jsx";
import Acceso from "./Acceso.jsx";
import Carrito from "./Carrito.jsx";
import { API } from "./config";

// ==========================================
// 1. INFORMACIÓN DE LAS PLANTILLAS: ITEMS
// ==========================================

const diseños = [
  {
    id: 1,
    nombre: "Nuevos Sabores: Donas",
    tipo: "Poster",
    categoria: "Alimentos",
    descripcion: "Diseño publicitario de donas.",
    imagen: "plantilla-01.jpeg"
  },
  {
    id: 2,
    nombre: "Helados de Fresa",
    tipo: "Poster",
    categoria: "Alimentos",
    descripcion: "Plantilla para pastelerías y heladerias",
    imagen: "plantilla-07.jpeg"
  },
  {
    id: 3,
    nombre: "Ingredientes Naturales",
    tipo: "Banner",
    categoria: "Alimentos",
    descripcion: "Diseño para promocionar productos y ofertas alimenticia, salsas, etc",
    imagen: "plantilla-04.jpeg"
  },
  {
    id: 4,
    nombre: "Sweet Pastries",
    tipo: "Poster",
    categoria: "Alimentos",
    descripcion: "Una propuesta visual para promocionar venta de pudines.",
    imagen: "plantilla-09.jpeg"
  },
  {
    id: 5,
    nombre: "Pudín y Café",
    tipo: "Banner",
    categoria: "Alimentos",
    descripcion: "Plantilla para panaderías, reposterías y pequeños negocios de comida.",
    imagen: "plantilla-02.jpeg"
  },
  {
    id: 6,
    nombre: "Estilo en tus Botas",
    tipo: "Banner",
    categoria: "Ropa y calzado",
    descripcion: "Diseño para promocionar nueva colección de botas",
    imagen: "plantilla-03.jpeg"
  },
  {
    id: 7,
    nombre: "Pasión y Elegancia",
    tipo: "Poster",
    categoria: "Ropa y calzado",
    descripcion: "Una propuesta creativa para destacar prendas y accesorios.",
    imagen: "plantilla-08.jpeg"
  },
  {
    id: 8,
    nombre: "Renovación Tecnológica",
    tipo: "Poster",
    categoria: "Tecnología",
    descripcion: "Plantilla para promocionar productos tecnológicos.",
    imagen: "plantilla-05.jpeg"
  },
  {
    id: 9,
    nombre: "Digital Future",
    tipo: "Banner",
    categoria: "Tecnología",
    descripcion: "Diseño moderno para servicios digitales.",
    imagen: "plantilla-10.jpeg"
  },
  {
    id: 10,
    nombre: "Frescura Natural",
    tipo: "Poster",
    categoria: "Cuidado personal",
    descripcion: "Diseño para promocionar nuevo shampoo con un aroma fresco a manza",
    imagen: "plantilla-06.jpeg"
  }
];

// ==========================================
// 2. BARRA DE NAVEGACIÓN
// ==========================================


function Navbar({ usuario, abrirAcceso, abrirCarrito, cerrarSesion }) {
  return (
    <header className="navbar">
      <a href="#inicio" className="logo">
        <img
          src={`${import.meta.env.BASE_URL}assets/logo/logo.png`}
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

      {usuario ? (
        <div className="nav-usuario">
          <button
            type="button"
            className="nav-button"
            onClick={abrirCarrito}
          >
            Mi carrito
          </button>

          <button
            type="button"
            className="nav-button"
            onClick={cerrarSesion}
          >
            Salir
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="nav-button"
          onClick={abrirAcceso}
        >
          Iniciar sesión
        </button>
      )}
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
          src={`${import.meta.env.BASE_URL}assets/plantillas/${diseño.imagen}`}
          alt={`Vista previa de ${diseño.nombre}`}
          className="template-image"
          onError={() => setImagenDisponible(false)}
        />
      ) : (
        <div className="image-placeholder">
          Imagen no disponible
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
            Pedir Diseño →
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

function Catalogo({alPedirDiseno}) {


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
  if (!seleccionado) return;

  alPedirDiseno(seleccionado);
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
  const [estado, setEstado] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviarMensaje(event) {
    event.preventDefault();

    setEnviando(true);
    setEstado("");

    const formulario = event.currentTarget;

    const datos = new FormData(formulario);

    const contacto = {
      nombre: datos.get("nombre"),
      correo: datos.get("correo"),
      mensaje: datos.get("mensaje"),
    };

    try {
      const respuesta = await fetch(API +
        "/api/contacto",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contacto),
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.mensaje || "No se pudo enviar el mensaje."
        );
      }

      setEstado(resultado.mensaje);
      formulario.reset();

    } catch (error) {
      setEstado(
        error.message || "No se pudo conectar con el servidor."
      );

    } finally {
      setEnviando(false);
    }
  }

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
        onSubmit={enviarMensaje}
      >

        <div className="form-row">

          <div className="form-group">

            <label htmlFor="nombre">
              Nombre
            </label>

            <input
              type="text"
              id="nombre"
              name="nombre"
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
              name="correo"
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
            name="mensaje"
            rows="5"
            placeholder="Me gustaría crear un anuncio para..."
            required
          ></textarea>

        </div>

        <button
          type="submit"
          className="primary-button"
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Enviar mensaje →"}
        </button>

        {estado && (
          <p role="status" className="form-status">
            {estado}
          </p>
        )}

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
  const [usuario, setUsuario] = useState(null);
  const [accesoAbierto, setAccesoAbierto] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [diseñoPendiente, setDiseñoPendiente] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [aviso, setAviso] = useState("");

  // Comprobar si el visitante ya tiene una sesión
  useEffect(() => {
    async function comprobarSesion() {
      try {
        const respuesta = await fetch(API +
          "/api/usuarios/sesion",
          { credentials: "include" }
        );

        if (!respuesta.ok) return;

        const datos = await respuesta.json();
        setUsuario(datos.usuario);
        await cargarPedidos();
      } catch (error) {
        console.error("No se pudo comprobar la sesión:", error);
      }
    }

    comprobarSesion();
  }, []);

  // Consultar los pedidos del cliente
  async function cargarPedidos() {
    try {
      const respuesta = await fetch(API +
        "/api/pedidos",
        { credentials: "include" }
      );

      if (!respuesta.ok) return;

      const datos = await respuesta.json();
      setPedidos(datos.pedidos);
    } catch (error) {
      console.error("Error al cargar los pedidos:", error);
    }
  }

  // Agregar una plantilla a los pedidos
  async function guardarPedido(diseño) {
    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/pedidos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            plantillaId: String(diseño.id),
            nombreDiseno: diseño.nombre,
            tipo: diseño.tipo,
            categoria: diseño.categoria,
            imagen: diseño.imagen,
          }),
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || "No se pudo guardar el pedido.");
      }

      await cargarPedidos();
      setAviso("¡Diseño agregado a tus pedidos!");
      setCarritoAbierto(true);
    } catch (error) {
      setAviso(error.message);
    }
  }

  // Acción del botón Pedir Diseño
  function pedirDiseno(diseño) {
    setAviso("");

    if (usuario) {
      guardarPedido(diseño);
    } else {
      setDiseñoPendiente(diseño);
      setAccesoAbierto(true);
    }
  }

  // Cuando el cliente inicia sesión
  async function iniciarSesion(datosUsuario) {
    setUsuario(datosUsuario);
    setAccesoAbierto(false);

    await cargarPedidos();

    if (diseñoPendiente) {
      await guardarPedido(diseñoPendiente);
      setDiseñoPendiente(null);
    }
  }

  // Eliminar un pedido
  async function eliminarPedido(id) {
    try {
      const respuesta = await fetch(API +
        /api/pedidos/$``,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || "No se pudo eliminar.");
      }

      await cargarPedidos();
      setAviso("Pedido eliminado correctamente.");
    } catch (error) {
      setAviso(error.message);
    }
  }

  // Cerrar sesión del cliente
  async function cerrarSesion() {
    try {
      await fetch(API +
        "/api/usuarios/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      setUsuario(null);
      setPedidos([]);
      setCarritoAbierto(false);
      setAviso("Has cerrado sesión.");
    } catch (error) {
      setAviso("No se pudo cerrar la sesión.");
    }
  }

  // Mantener el acceso del administrador
  if (window.location.pathname === "/admin") {
    return <Admin />;
  }

  return (
    <>
      <Navbar
        usuario={usuario}
        abrirAcceso={() => setAccesoAbierto(true)}
        abrirCarrito={() => {
          cargarPedidos();
          setCarritoAbierto(true);
        }}
        cerrarSesion={cerrarSesion}
      />

      {aviso && (
        <p className="pedido-aviso" role="status">
          {aviso}
        </p>
      )}

      <main>
        <Hero />

        <Catalogo alPedirDiseno={pedirDiseno} />

        <Nosotros />

        <Contacto />
      </main>

      <Footer />

      <Chatbot />

      {accesoAbierto && (
        <Acceso
          alIniciarSesion={iniciarSesion}
          alCerrar={() => {
            setAccesoAbierto(false);
            setDiseñoPendiente(null);
          }}
        />
      )}

      {carritoAbierto && usuario && (
        <Carrito
          pedidos={pedidos}
          cerrar={() => setCarritoAbierto(false)}
          eliminarPedido={eliminarPedido}
        />
      )}
    </>
  );
}

export default App;
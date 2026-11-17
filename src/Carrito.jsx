import React from "react";

function Carrito({ pedidos, cerrar, eliminarPedido }) {
  return (
    <div className="modal-overlay" onClick={cerrar}>
      <section
        className="carrito-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="carrito-titulo"
      >
        <button
          className="modal-close"
          onClick={cerrar}
          aria-label="Cerrar carrito"
        >
          ×
        </button>

        <span className="eyebrow">TUS SOLICITUDES</span>
        <h2 id="carrito-titulo">Mi carrito.</h2>
        <p className="carrito-descripcion">
          Aquí puedes consultar los diseños que has solicitado.
          No se realizan pagos desde esta página.
        </p>

        {pedidos.length === 0 ? (
          <div className="carrito-vacio">
            <span>✳</span>
            <h3>Aún no tienes pedidos.</h3>
            <p>Explora nuestro catálogo y elige tu primer diseño.</p>
          </div>
        ) : (
          <div className="carrito-lista">
            {pedidos.map((pedido) => (
              <article className="carrito-item" key={pedido._id}>
                <img
                  src={`${import.meta.env.BASE_URL}assets/plantillas/${pedido.imagen}`}
                  alt={pedido.nombreDiseno}
                />

                <div className="carrito-item-info">
                  <h3>{pedido.nombreDiseno}</h3>
                  <p>{pedido.tipo} · {pedido.categoria}</p>
                  <span className="carrito-estado">
                    {pedido.estado}
                  </span>
                  <button
                    type="button"
                    className="carrito-eliminar"
                    onClick={() => eliminarPedido(pedido._id)}
                  >
                    Eliminar pedido
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <button
          type="button"
          className="primary-button carrito-cerrar"
          onClick={cerrar}
        >
          Seguir explorando
        </button>
      </section>
    </div>
  );
}

export default Carrito;
# RY Jewelry

Sitio estático de **RY Jewelry**: joyería de oro 10K, pedidos por WhatsApp y un chatbot de bienvenida basado en reglas. Todo el contenido está en español. No hay paso de compilación: HTML, CSS y JavaScript planos.

## Cómo verlo en local

Desde la raíz del repositorio:

```bash
python3 -m http.server 43217
```

Abre [http://127.0.0.1:43217](http://127.0.0.1:43217).

Los pedidos salen a WhatsApp (`https://wa.me/message/3DJVH3QBPEJBI1`). El asistente (`chatbot.js`) responde con reglas fijas: saludo, oro 10K, envíos, cómo pedir y un enlace a WhatsApp. No da precios ni políticas.

El pie de `index.html` enlaza cuatro páginas provisionales: envíos, devoluciones y cambios, privacidad y términos. Justo arriba del pie hay un bloque opcional de newsletter; todavía no tiene proveedor y, al enviarlo, abre WhatsApp.

## Pendiente

- Fotos reales de productos (el catálogo usa espacios reservados).
- Precios y políticas de pago, cambios y devoluciones.
- Políticas provisionales, a reemplazar con la política oficial: `envios.html`, `devoluciones.html`, `privacidad.html` y `terminos.html`.
- Newsletter: conectar proveedor real (Mailchimp, Brevo o Formspree).
- Dominio final para actualizar `og:image` y `og:url` con URLs absolutas. Hoy `og:image` apunta a `img/og.jpg` y no hay etiqueta `og:url`.

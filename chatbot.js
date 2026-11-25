/* Asistente de bienvenida de RY Jewelry: respuestas por reglas, sin precios ni políticas. */
(function () {
  var WA = 'https://wa.me/message/3DJVH3QBPEJBI1';
  var WA_LINK = '<a href="' + WA + '" target="_blank" rel="noopener">Escríbenos por WhatsApp</a>';
  var R = {
    saludo: '¡Hola, bienvenida! Qué gusto tenerte aquí 💛 Soy la asistente de <strong>RY Jewelry</strong> y estoy para ayudarte con mucho cariño.',
    servicios: 'Con mucho gusto te cuento lo que hacemos en RY Jewelry:<ul><li>Joyería de <strong>oro 10K</strong></li><li><strong>Calidad garantizada</strong></li><li><strong>Envíos a todo EE. UU.</strong></li><li>Pedidos y atención personal por <strong>WhatsApp</strong></li></ul>',
    oro: '¡Qué buena pregunta! El oro 10K es una elección muy inteligente:<ul><li><strong>Duradero:</strong> resiste bien el uso diario.</li><li><strong>Más resistente a los rayones</strong> que los quilatajes más altos, que son más blandos.</li><li><strong>Conserva su brillo</strong> con cuidados sencillos.</li><li><strong>Ideal para todos los días:</strong> para llevarlo puesto sin preocupaciones.</li></ul>',
    envios: '¡Claro que sí! Hacemos <strong>envíos a todo EE. UU.</strong> Para tiempos y costos de envío, ' + WA_LINK.replace('Escríbenos', 'consúltanos') + '.',
    pedir: '¡Pedir es muy fácil, te acompaño!<ol><li><strong>Elige</strong> tu pieza aquí o en nuestro TikTok.</li><li><strong>Escríbenos</strong> por WhatsApp.</li><li><strong>Recibe</strong> tu pedido en casa.</li></ol>',
    whatsapp: 'Será un placer atenderte personalmente. ' + WA_LINK + ' y con gusto te respondemos lo antes posible 💛',
    precio: 'Con gusto te ayudo. Los precios varían según la pieza. Para precios actualizados, ' + WA_LINK.replace('Escríbenos', 'consúltanos') + '.',
    politica: 'Para formas de pago, cambios o devoluciones, ' + WA_LINK.replace('Escríbenos', 'consúltanos') + ' y te damos toda la información.',
    catalogo: 'Trabajamos piezas como cadenas, aretes, anillos y pulseras (categorías de ejemplo). Para ver los modelos disponibles, ' + WA_LINK.replace('Escríbenos', 'pídenos fotos') + '.',
    gracias: '¡Gracias a ti por visitarnos! 💛 Aquí sigo para lo que necesites.',
    nose: 'Perdóname, no logré entender bien tu pregunta. Puedes elegir una opción de abajo o <a href="' + WA + '" target="_blank" rel="noopener">escribirnos por WhatsApp</a> para hablar con nosotros.'
  };
  var REGLAS = [
    [/hola|buen[oa]s|saludos|hey/, 'saludo'],
    [/gracias/, 'gracias'],
    [/precio|cu[aá]nto|cuesta|vale|costo/, 'precio'],
    [/env[ií]o|enví|envia|llega|estado|entrega/, 'envios'],
    [/10\s*k|oro|quilat|kilat|ray|brillo|durab|resist/, 'oro'],
    [/pago|tarjeta|devoluci|cambio|garant[ií]a|pol[ií]tica|reembolso/, 'politica'],
    [/pedir|pedido|comprar|ordenar|orden/, 'pedir'],
    [/whats|hablar|contact|asesor|persona|n[uú]mero/, 'whatsapp'],
    [/cadena|arete|anillo|pulsera|cat[aá]logo|modelo|foto/, 'catalogo'],
    [/servicio|ofrecen|venden|qu[eé] (hacen|tienen)/, 'servicios']
  ];
  var BOTONES = [['Servicios', 'servicios'], ['¿Por qué oro 10K?', 'oro'], ['Envíos', 'envios'], ['Cómo pedir', 'pedir'], ['Hablar por WhatsApp', 'whatsapp']];

  var root = document.createElement('div');
  root.className = 'rybot';
  root.innerHTML =
    '<button type="button" class="rybot-toggle" aria-expanded="false" aria-controls="rybot-panel" aria-label="Abrir el asistente de RY Jewelry">' +
      '<img src="img/icon-192.png" alt="" width="40" height="40"><span class="rybot-dot" aria-hidden="true"></span></button>' +
    '<div id="rybot-panel" class="rybot-panel" role="dialog" aria-modal="false" aria-labelledby="rybot-title" hidden>' +
      '<header class="rybot-head"><img src="img/icon-192.png" alt="" width="36" height="36">' +
        '<div><h2 id="rybot-title">RY Jewelry</h2><p>Asistente de bienvenida</p></div>' +
        '<button type="button" class="rybot-close" aria-label="Cerrar el asistente">×</button></header>' +
      '<div class="rybot-log" role="log" aria-live="polite" aria-label="Conversación con el asistente"></div>' +
      '<div class="rybot-quick" role="group" aria-label="Respuestas rápidas"></div>' +
      '<form class="rybot-form"><label for="rybot-input" class="sr">Escribe tu pregunta</label>' +
        '<input id="rybot-input" type="text" autocomplete="off" placeholder="Escribe tu pregunta…" maxlength="200">' +
        '<button type="submit" aria-label="Enviar mensaje">➤</button></form>' +
    '</div>';
  document.body.appendChild(root);

  var toggle = root.querySelector('.rybot-toggle'), panel = root.querySelector('.rybot-panel'),
      log = root.querySelector('.rybot-log'), quick = root.querySelector('.rybot-quick'),
      form = root.querySelector('.rybot-form'), input = root.querySelector('#rybot-input'),
      iniciado = false;

  function burbuja(html, quien) {
    var d = document.createElement('div');
    d.className = 'rybot-msg rybot-' + quien;
    if (quien === 'usuario') d.textContent = html; else d.innerHTML = html;
    log.appendChild(d); log.scrollTop = log.scrollHeight;
  }
  function responder(clave) { setTimeout(function () { burbuja(R[clave], 'bot'); }, 250); }
  BOTONES.forEach(function (b) {
    var btn = document.createElement('button');
    btn.type = 'button'; btn.textContent = b[0];
    if (b[1] === 'whatsapp') btn.className = 'rybot-wa';
    btn.addEventListener('click', function () { burbuja(b[0], 'usuario'); responder(b[1]); });
    quick.appendChild(btn);
  });
  function abrir(v) {
    panel.hidden = !v; toggle.setAttribute('aria-expanded', String(v));
    toggle.setAttribute('aria-label', v ? 'Cerrar el asistente de RY Jewelry' : 'Abrir el asistente de RY Jewelry');
    root.classList.toggle('abierto', v);
    if (v && !iniciado) { iniciado = true; burbuja(R.saludo, 'bot'); burbuja('Cuéntame, ¿qué te gustaría saber? Puedes tocar una opción o escribirme con toda confianza.', 'bot'); }
    if (v) input.focus(); else toggle.focus();
  }
  toggle.addEventListener('click', function () { abrir(panel.hidden); });
  root.querySelector('.rybot-close').addEventListener('click', function () { abrir(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) abrir(false); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var t = input.value.trim(); if (!t) return;
    burbuja(t, 'usuario'); input.value = '';
    var n = t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    var clave = 'nose';
    for (var i = 0; i < REGLAS.length; i++) { if (REGLAS[i][0].test(n) || REGLAS[i][0].test(t.toLowerCase())) { clave = REGLAS[i][1]; break; } }
    responder(clave);
  });
})();

// data.js — Fuente de datos local de Pixials News
// Se usa como "JSON local" para renderizado dinámico (requisito del módulo)

const NOTICIAS_SEED = [
  {
    id: 1,
    titulo: "Neurointerfaces: la primera prótesis que traduce pensamiento a código",
    categoria: "Hardware",
    resumen: "Un equipo de Kioto conectó un implante cortical a un editor de código y logró que un desarrollador escribiera funciones simples solo con la mente.",
    contenido: "Un equipo de investigadores de la Universidad de Kioto presentó un implante cortical de bajo consumo capaz de traducir patrones de intención motora en instrucciones de programación básicas. Durante la demostración, un desarrollador con movilidad reducida escribió una función de ordenamiento en menos de cuatro minutos usando únicamente la interfaz neuronal. El dispositivo, del tamaño de una moneda, se alimenta por inducción y transmite datos vía Bluetooth de baja energía a un decodificador que interpreta la señal con un modelo entrenado específicamente para cada usuario. Los responsables del proyecto aseguran que la meta no es reemplazar el teclado, sino ofrecer una vía de acceso a la programación para personas con discapacidades motoras severas. El siguiente paso será un ensayo clínico con doce participantes durante 2027.",
    imagen: "https://picsum.photos/seed/pixials-neuro/900/600",
    fecha: "2026-09-02",
    autor: "Lucía Wren",
    destacada: true
  },
  {
    id: 2,
    titulo: "Baterías de estado sólido llegan a smartphones en 2027",
    categoria: "Movilidad",
    resumen: "Un fabricante surcoreano confirmó producción en serie de baterías de estado sólido que duplican la autonomía sin aumentar el grosor del teléfono.",
    contenido: "Tras cinco años de desarrollo, un fabricante surcoreano confirmó que iniciará la producción en serie de baterías de estado sólido para smartphones a partir del segundo trimestre de 2027. La tecnología reemplaza el electrolito líquido por uno cerámico, lo que reduce el riesgo de sobrecalentamiento y permite empaquetar más energía en el mismo volumen. En pruebas de laboratorio, los prototipos alcanzaron hasta un 90% más de densidad energética que las baterías de iones de litio actuales, sin aumentar el grosor del dispositivo. El principal obstáculo seguía siendo el costo de manufactura, pero la compañía asegura haber resuelto el cuello de botella con un nuevo proceso de sinterizado a baja temperatura. Se espera que los primeros modelos comerciales lleguen a mercados asiáticos antes de expandirse globalmente.",
    imagen: "https://picsum.photos/seed/pixials-battery/900/600",
    fecha: "2026-08-28",
    autor: "Marco Trejo",
    destacada: true
  },
  {
    id: 3,
    titulo: "Un modelo de IA predice fallas industriales 72 horas antes",
    categoria: "Inteligencia Artificial",
    resumen: "La plataforma analiza vibraciones y temperatura en tiempo real para anticipar fallas mecánicas en plantas de manufactura con 94% de precisión.",
    contenido: "Una startup europea lanzó una plataforma de mantenimiento predictivo que combina sensores de vibración, temperatura y consumo eléctrico con un modelo de series temporales entrenado en más de dos millones de horas de operación industrial. Según la compañía, el sistema logra anticipar fallas mecánicas con hasta 72 horas de anticipación y una precisión del 94% en líneas de ensamblaje automotriz. La propuesta reduce los paros no planificados, uno de los mayores costos ocultos en la manufactura pesada. A diferencia de soluciones anteriores, el modelo no requiere reentrenamiento manual: se ajusta automáticamente a cada máquina tras dos semanas de operación. Varias plantas en México y Alemania ya lo están probando en fase piloto.",
    imagen: "https://picsum.photos/seed/pixials-ai-factory/900/600",
    fecha: "2026-08-20",
    autor: "Renata Osorio",
    destacada: true
  },
  {
    id: 4,
    titulo: "WebGPU llega a todos los navegadores principales",
    categoria: "Desarrollo Web",
    resumen: "Con el soporte oficial en el último navegador pendiente, los desarrolladores ya pueden usar WebGPU sin polyfills en producción.",
    contenido: "La adopción de WebGPU se completó este mes con el soporte oficial en el último de los navegadores principales que faltaba. Esto significa que los desarrolladores frontend ya pueden usar la API sin depender de polyfills ni banderas experimentales, abriendo la puerta a aplicaciones web con renderizado 3D y cómputo paralelo de alto rendimiento directamente en el navegador. Frameworks como Three.js y motores de machine learning en el cliente ya publicaron guías de migración desde WebGL. Los primeros benchmarks muestran mejoras de hasta 3x en tareas de inferencia de modelos pequeños ejecutados localmente, sin enviar datos a un servidor.",
    imagen: "https://picsum.photos/seed/pixials-webgpu/900/600",
    fecha: "2026-08-14",
    autor: "Iván Corzo",
    destacada: false
  },
  {
    id: 5,
    titulo: "Drones autónomos reforestan zonas de difícil acceso en la Amazonía",
    categoria: "Sostenibilidad",
    resumen: "Una flota de drones sembró más de 300.000 cápsulas de semillas en laderas donde la reforestación manual era casi imposible.",
    contenido: "Una organización ambiental en alianza con una empresa de robótica desplegó una flota de veinte drones autónomos para reforestar laderas de difícil acceso en la cuenca amazónica. Cada dron dispara cápsulas biodegradables con semillas preseleccionadas según el tipo de suelo, detectado por sensores multiespectrales instalados en el mismo equipo. En su primera fase, la flota sembró más de 300.000 cápsulas en zonas donde la reforestación manual resultaba extremadamente costosa o directamente inviable. El proyecto reporta una tasa de germinación cercana al 40%, comparable con métodos tradicionales pero a una fracción del tiempo y el costo humano.",
    imagen: "https://picsum.photos/seed/pixials-drones/900/600",
    fecha: "2026-08-05",
    autor: "Camila Andrade",
    destacada: false
  },
  {
    id: 6,
    titulo: "Chips fotónicos: la computación con luz sale del laboratorio",
    categoria: "Hardware",
    resumen: "Un consorcio de universidades presentó el primer chip fotónico comercial capaz de ejecutar redes neuronales con una fracción del consumo eléctrico actual.",
    contenido: "Un consorcio de universidades europeas y asiáticas presentó el primer chip fotónico de propósito comercial diseñado para ejecutar redes neuronales usando luz en lugar de electrones. El prototipo, del tamaño de una tarjeta de crédito, consume hasta 80% menos energía que un acelerador de IA convencional al realizar las mismas operaciones matriciales. La computación fotónica lleva décadas en desarrollo, pero los costos de fabricación y la dificultad de integrar componentes ópticos en obleas de silicio habían frenado su llegada al mercado. El equipo asegura que ya negocia con dos fabricantes de centros de datos para pruebas a mayor escala durante 2027.",
    imagen: "https://picsum.photos/seed/pixials-photonic/900/600",
    fecha: "2026-07-30",
    autor: "Diego Falla",
    destacada: false
  },
  {
    id: 7,
    titulo: "Un videojuego indie usa IA generativa para crear diálogos únicos por partida",
    categoria: "Gaming",
    resumen: "Cada personaje no jugable responde con un modelo de lenguaje ligero entrenado localmente, sin conexión a internet ni servidores externos.",
    contenido: "Un estudio independiente lanzó un juego de rol donde cada personaje no jugable genera sus diálogos en tiempo real usando un modelo de lenguaje ligero que corre completamente en el dispositivo del jugador, sin conexión a internet. Esto permite que ninguna partida sea igual a otra, ya que las respuestas dependen del historial de decisiones acumulado. El estudio optó por un modelo comprimido de menos de 2GB para que el juego funcione incluso en consolas de generación anterior. La crítica especializada destacó la coherencia narrativa lograda pese a las limitaciones del modelo, aunque señaló ocasionales respuestas fuera de tono que rompen la inmersión.",
    imagen: "https://picsum.photos/seed/pixials-game-ai/900/600",
    fecha: "2026-07-22",
    autor: "Sofía Nieto",
    destacada: false
  },
  {
    id: 8,
    titulo: "Ciudades inteligentes: semáforos que aprenden del tráfico en vivo",
    categoria: "Ciudades Inteligentes",
    resumen: "Una red de semáforos adaptativos redujo en 27% los tiempos de espera promedio en una de las avenidas más congestionadas de Bogotá.",
    contenido: "Un piloto de movilidad urbana instaló semáforos con sensores de flujo vehicular y un algoritmo de coordinación que ajusta los tiempos de luz verde en tiempo real, sin necesidad de reprogramación manual. Durante los primeros tres meses de operación en una avenida de alta congestión en Bogotá, el sistema redujo el tiempo de espera promedio en un 27% y las emisiones estimadas por ralentí en un 18%. A diferencia de los semáforos con temporizador fijo, la red completa se comunica entre sí para evitar que la optimización de una intersección genere cuellos de botella en la siguiente. La ciudad evalúa expandir el sistema a diez corredores adicionales en 2027.",
    imagen: "https://picsum.photos/seed/pixials-smartcity/900/600",
    fecha: "2026-07-10",
    autor: "Andrés Puyana",
    destacada: false
  }
];

// Claves usadas en localStorage
const LS_KEYS = {
  NOTICIAS: "pixials_noticias",
  FAVORITOS: "pixials_favoritos"
};

// Inicializa el "JSON local" en localStorage la primera vez que se visita el sitio
function inicializarDatos() {
  if (!localStorage.getItem(LS_KEYS.NOTICIAS)) {
    localStorage.setItem(LS_KEYS.NOTICIAS, JSON.stringify(NOTICIAS_SEED));
  }
  if (!localStorage.getItem(LS_KEYS.FAVORITOS)) {
    localStorage.setItem(LS_KEYS.FAVORITOS, JSON.stringify([]));
  }
}

function obtenerNoticias() {
  inicializarDatos();
  return JSON.parse(localStorage.getItem(LS_KEYS.NOTICIAS));
}

function guardarNoticias(noticias) {
  localStorage.setItem(LS_KEYS.NOTICIAS, JSON.stringify(noticias));
}

function obtenerNoticiaPorId(id) {
  return obtenerNoticias().find(n => n.id === Number(id));
}

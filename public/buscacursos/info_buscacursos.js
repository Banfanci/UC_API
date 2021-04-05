/* eslint-disable */
module.exports.info_BC = {
  semestres: {
    '2021 Primer Semestre': '2021-1',
    '2020 TAV': '2020-3',
    '2020 Segundo Semestre': '2020-2',
    '2020 Primer Semestre': '2020-1',
    '2019 TAV': '2019-3',
    '2019 Segundo Semestre': '2019-2',
    '2019 Primer Semestre': '2019-1',
    '2018 TAV': '2018-3',
    '2018 Segundo Semestre': '2018-2',
    '2018 Primer Semestre': '2018-1',
  },
  categorias: {
    '-- Todas --': 'TODOS',
    'Formación Antropológica y Ética': 'AE',
    'Aprendizaje Servicio': 'AS',
    'Formación Teológica': 'FT',
    'Cursos Orientados a la Investigación': 'IN',
    'Metodología Aprendizaje Activo': 'MA',
    'Formación Transversal al Doctorado': 'TD',
  },
  campus: {
    '-- Todos --': 'TODOS',
    'Campus Externo': 'Campus+Externo',
    'Casa Central': 'Casa+Central',
    'Lo Contador': 'Lo+Contador',
    Oriente: 'Oriente',
    'San Joaquín': 'San+Joaqu%C3%ADn',
    Villarrica: 'Villarrica',
  },
  escuela: {
    '-- Todas --': 'TODOS',
    'Acad Inter de Filosofía': '68',
    'Actividades Universitarias': '97',
    Actuació: '34',
    'Agronomía e Ing. Forestal': '11',
    Arquitectura: '94',
    Arte: '33',
    Astrofisica: '2',
    Bachillera: '07',
    CARA: '52',
    'Ciencia Política': '45',
    'Ciencias Biológicas': '12',
    'Ciencias de la Salud': '16',
    'Colegio Programas Doctorales': '40',
    Comunicaciones: '28',
    'Construccion Civil': '01',
    Deportes: '53',
    Derech: '17',
    Diseñ: '59',
    'Economía y Administració': '05',
    Educació: '20',
    Enfermería: '13',
    'Escuela de Gobier': '19',
    'Estudios Urbanos': '95',
    Estética: '51',
    Filosofía: '67',
    Física: '03',
    Geografía: '57',
    Historia: '56',
    'Ing Matemática y Computacional': '23',
    Ingeniería: '04',
    'Ingeniería Biológica y Médica': '18',
    Letras: '64',
    'Lic. Generales (College)': '09',
    Matemática: '06',
    Medicina: '14',
    Música: '70',
    Odontología: '15',
    Psicología: '29',
    Química: '10',
    'Requisito Idioma': '54',
    Sociología: '91',
    Teología: '38',
    'Trabajo Social': '30',
    Villarrica: '21',
  },
  formato: {
    '-- TODOS --': 'TODOS',
    Remoto: 'OL',
    Presencial: 'PR',
    'Remoto-Presencial': 'REPR',
  },
  formacion_general: {
    '-- TODOS --': 'TODOS',
    Artes: 'ARTS',
    'Ciencias Sociales': 'CSOC',
    'Ciencia y Tecnología': 'CTEC',
    'Ecolog Integra y Sustentavilidad': 'EISU',
    Humanidades: 'HUMS',
    'Pensamiento Matemático': 'PMAT',
    'Salud y Bienestar': 'SBIE',
  },
};

module.exports.info_index = {
  "NRC": 0,
  "Sigla": 1,
  "Retiro": 2,
  "Ingles": 3,
  "Seccion": 4,
  "Aprobacion especial": 5,
  "Area de FG": 6,
  "Formato": 7,
  "Categoria": 8,
  "Nombre": 9,
  "Profesor": 10,
  "Campus": 11,
  "Creditos": 12,
  "Vacantes totales": 13,
  "Vacantes disponibles": 14
}

module.exports.info = {
  "NRC": null,
  "Semestre": null,
  "Sigla": null,
  "Seccion": null,
  "Retiro": null,
  "Ingles": null,
  "Aprobacion especial": null,
  "Area de FG": null,
  "Formato": null,
  "Categoria": null,
  "Nombre": null,
  "Profesor": null,
  "Campus": null,
  "Creditos": null,
  "Vacantes totales": null,
  "Vacantes disponibles": null,
  "Modulos": {
      "CLAS": [],
      "AYU": [],
      "LAB": [],
      "LIB": [],
      "PRA": [],
      "SUP": [],
      "TAL": [],
      "TER": [],
      "TES": [],
  },
}

module.exports.parameters = {
  "cxml_semestre": "2019-2",
  "cxml_sigla": "",
  "cxml_nrc": "",
  "cxml_nombre": "",
  "cxml_profesor": "",
  "cxml_categoria": "TODOS",
  "cxml_campus": "TODOS",
  "cxml_unidad_academica": "TODOS",
}

module.exports.KEY_CONVERSOR = {
  "semestre": "cxml_semestre",
  "sigla": "cxml_sigla",
  "nrc": "cxml_nrc",
  "nombre": "cxml_nombre",
  "profesor": "cxml_profesor",
  "categoria": "cxml_categoria",
  "campus": "cxml_campus",
  "unidad_academica": "cxml_unidad_academica",
  "vacantes": "vacantes",
  "requisitos": "requisitos",
  "formato": "cxml_formato_cur",
  "formacion_general": "cxml_area_fg"
}
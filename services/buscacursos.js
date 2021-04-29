const axios = require('axios');
const JSSoup = require('jssoup').default;

const stripAccents = (text) => {
  // Strip accents from input String.
  // :param text: The input string.
  // :type text: String.
  // :returns: The processed String.
  // :rtype: String.
  if (text === 'TODOS') {
    return text;
  }

  if (text === 'todos') {
    return text.toUpperCase();
  }

  text = text.normalize('NFD');
  text = Buffer.from(text, 'ascii');
  text = text.toString('utf8');
  return text;
};

const requestUrl = async (url) => {
  // Make the requests to BuscaCursos server and parse the xml response to
  // separete all the results in a single list.
  // Args:
  //     url (str): A valid complete BuscaCursos url.
  // Returns:
  //     list: List with sublists with all the contents of BuscaCursos reponse.
  const res = await axios({
    method: 'GET',
    url: url,
  });

  const soup = new JSSoup(res.data, 'lxml');

  const nameBox = soup.findAll('tr', 'resultadosRowPar');

  const nameBox2 = soup.findAll('tr', 'resultadosRowImpar');

  const result = [];
  const n = nameBox.length + nameBox2.length;

  for (let i = 0; i < n; i += 1) {
    if (nameBox.length >= 0 && i % 2 === 0) {
      result.push(nameBox.pop());
    } else {
      result.push(nameBox2.pop());
    }
  }
  return result;
};

exports.requestBuscacursos = async (params) => {
  // Assamble the BuscaCursos url and make the requests. In case of a valid
  // response, clean all the information and put them on a dict with the API
  // format response.
  // Args:
  //     params (dict): Dict with valid BuscaCursos requests parameters.
  // Returns:
  //     dict: Dict with courses data response in API format.
  let url = 'http://buscacursos.uc.cl/?';

  Object.keys(params).forEach((key) => {
    url += `${key}=${stripAccents(params[key])}&`;
  });

  url +=
    'cxml_horario_tipo_busqueda=si_tenga&cxml_horario_tipo_busqueda_actividad=TODOS#resultados';

  const search = await requestUrl(url);

  const infoIndex = {
    NRC: 0,
    Sigla: 1,
    Retiro: 2,
    Ingles: 3,
    Seccion: 4,
    'Aprobacion especial': 5,
    'Area de FG': 6,
    Formato: 7,
    Categoria: 8,
    Nombre: 9,
    Profesor: 10,
    Campus: 11,
    Creditos: 12,
    'Vacantes totales': 13,
    'Vacantes disponibles': 14,
  };

  const cursos = {};
  search.forEach((line) => {
    const sectionHtml = [];
    line.findAll('td').every((elem) => {
      if (elem.findAll('table').length > 0) {
        const aux = [];
        elem.findAll('tr').forEach((val) => {
          const mods = val.findAll('td');
          const modsResult = [];
          mods.forEach((m) => {
            const texto = m.getText();
            const textoResult = texto.replace(/\n/g, '');
            modsResult.push(textoResult);
          });
          aux.push(modsResult);
        });
        sectionHtml.push(aux);
        return false;
      }
      let mod = elem.getText();
      mod = mod.replace(/\n/g, '');
      sectionHtml.push(mod);
      return true;
    });
    const infoCurso = {
      NRC: null,
      Semestre: null,
      Sigla: null,
      Seccion: null,
      Retiro: null,
      Ingles: null,
      'Aprobacion especial': null,
      'Area de FG': null,
      Formato: null,
      Categoria: null,
      Nombre: null,
      Profesor: null,
      Campus: null,
      Creditos: null,
      'Vacantes totales': null,
      'Vacantes disponibles': null,
      Modulos: {
        CLAS: [],
        AYU: [],
        LAB: [],
        LIB: [],
        PRA: [],
        SUP: [],
        TAL: [],
        TER: [],
        TES: [],
      },
    };

    infoCurso.Semestre = params.cxml_semestre;

    Object.keys(infoIndex).forEach((i) => {
      const aux = sectionHtml[infoIndex[i]];
      if (aux !== '') {
        infoCurso[i] = aux.trim();
      }
    });

    sectionHtml[sectionHtml.length - 1].forEach((i) => {
      infoCurso.Modulos[i[1]].push(i[0]);
      infoCurso.Modulos[i[1]].push(i[2]);
    });

    if (!(infoCurso.Sigla in cursos)) {
      const auxDict = {};
      auxDict[infoCurso.Sigla] = infoCurso;
      cursos[infoCurso.Sigla] = auxDict;
    }

    cursos[infoCurso.Sigla][infoCurso.Seccion] = infoCurso;
  });
  return cursos;
};

exports.requestVacancy = async (nrc, semester) => {
  // Make the requests for vacancies to BuscaCursos serves and format the
  // info into the API response format to vancany.
  // Args:
  //     nrc (str): The nrc code from a specific section of a course. This
  //     need to be a valid nrc from the semestre requested.
  //     semester (str): Semester code of interes.
  // Returns:
  //     dict: Dict with the vacancy information of the section given in the API
  //     response format.
  let url = 'http://buscacursos.uc.cl/informacionVacReserva';
  url += `.ajax.php?nrc=${nrc}&termcode=${semester}`;

  const search = await requestUrl(url);

  let results = [];
  search.forEach((line) => {
    const sectionHtml = line.getText().split('\n');
    const remove = [];
    for (let i = 0; i < sectionHtml.length; i += 1) {
      sectionHtml[i] = sectionHtml[i].replace(/\n/g, '');
      if (sectionHtml[i] === '') {
        remove.push(i - remove.length);
      }
    }
    remove.forEach((i) => {
      sectionHtml.splice(i, 1);
    });
    const sectionHtmlResult = [];
    sectionHtml[0].split('-').forEach((x) => {
      sectionHtmlResult.push(x.trim());
    });
    sectionHtml.slice(1).forEach((x) => {
      sectionHtmlResult.push(x.trim());
    });
    results.push(sectionHtmlResult);
  });
  const finals = { Disponibles: 0 };
  if (results.length > 0) {
    results = results.slice(0, -1);
  } else {
    results = [];
  }
  results.forEach((result) => {
    if (result.length >= 3) {
      if (result[0] === 'Vacantes libres' || result[0] === 'Vacantes Libres') {
        if (result.length === 4) {
          finals.Libres = [];
          result.slice(-3).forEach((x) => {
            finals.Libres.push(parseInt(x, 10));
          });
        } else {
          const aux = result.slice(-4);
          finals[aux[0]] = [];
          result.slice(-3).forEach((x) => {
            finals[aux[0]].push(parseInt(x, 10));
          });
        }
      } else if (result[0].includes('TOTAL DISPONIBLES')) {
        finals.Disponibles = parseInt(result[2], 10);
      } else if (result.length === 5) {
        const name = `${result[0]} - ${result[1]}`;
        finals[name] = [];
        result.slice(-3).forEach((x) => {
          finals[name].push(parseInt(x, 10));
        });
      } else {
        const name = `${result[0]} - ${result[1]} - ${result[2]}`;
        finals[name] = [];
        result.slice(-3).forEach((x) => {
          finals[name].push(parseInt(x, 10));
        });
      }
    }
  });
  return finals;
};

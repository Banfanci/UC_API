const axios = require('axios');
const cheerio = require('cheerio');
const info = require('../public/buscacursos/info_buscacursos');

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

  const page = cheerio.load(res.data);

  const nameBox = page('td .resultadosRowPar').toArray();

  const nameBox2 = page('td .resultadosRowImpar').toArray();

  const result = [];
  const n = nameBox.length + nameBox2.length;

  for (let i = 0; i < n; i += 1) {
    if (nameBox.length >= 0 && i % 2) {
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

  const infoIndex = info.info_index;

  const cursos = {};
  Object.values(search).forEach((line) => {
    const sectionHtml = [];
    const td = line('td').toArray();
    td.some((elem) => {
      const table = elem('table').toArray();
      if (table.length >= 0) {
        const aux = [];
        const tr = elem('tr').toArray();
        Object.values(tr).forEach((val) => {
          let mods = val('td').toArray();
          mods = mods
            .map((m) => {
              const texto = m.text();
              return texto.replace('\n', '');
            })
            .toArray();
          aux.push(mods);
        });
        sectionHtml.push(aux);
        return true;
      }
      let mod = elem.text();
      mod = mod.replace('\n', '');
      sectionHtml.push(mod);
      return false;
    });
    const infoCurso = info.info;
    infoCurso.Semestre = params.cxml_semestre;

    Object.keys(infoIndex).forEach((i) => {
      const aux = sectionHtml[infoIndex[i]];
      if (aux !== '') {
        infoCurso[i] = aux.trim();
      }
    });

    Object.values(sectionHtml[sectionHtml.length - 1]).forEach((i) => {
      infoCurso.Modulos[i[1]].push(i[0]);
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

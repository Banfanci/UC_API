const catchAsync = require('../utils/catchAsync.js');
const buscaCursos = require('../services/buscacursos');

exports.getCourses = catchAsync(async (req, res, next) => {
  const parameters = {
    cxml_semestre: '2019-2',
    cxml_sigla: '',
    cxml_nrc: '',
    cxml_nombre: '',
    cxml_profesor: '',
    cxml_categoria: 'TODOS',
    cxml_campus: 'TODOS',
    cxml_unidad_academica: 'TODOS',
  };

  const KEY_CONVERSOR = {
    semestre: 'cxml_semestre',
    sigla: 'cxml_sigla',
    nrc: 'cxml_nrc',
    nombre: 'cxml_nombre',
    profesor: 'cxml_profesor',
    categoria: 'cxml_categoria',
    campus: 'cxml_campus',
    unidad_academica: 'cxml_unidad_academica',
    vacantes: 'vacantes',
    requisitos: 'requisitos',
    formato: 'cxml_formato_cur',
    formacion_general: 'cxml_area_fg',
  };

  const args = req.body;

  Object.keys(args).forEach((arg) => {
    parameters[KEY_CONVERSOR[arg]] = args[arg].split(' ').join('+');
  });

  const cursos = await buscaCursos.requestBuscacursos(parameters);

  res.status(200).json({
    status: 'success',
    data: cursos,
  });
});

exports.getVacancy = catchAsync(async (req, res, next) => {
  const curso = await buscaCursos.requestVacancy(
    req.body.nrc,
    req.body.semestre
  );

  res.status(200).json({
    status: 'success',
    data: curso,
  });
});

exports.getRequeriments = catchAsync(async (req, res, next) => {
  const curso = await buscaCursos.requestRequeriments(req.body.sigla);

  res.status(200).json({
    status: 'success',
    data: curso,
  });
});

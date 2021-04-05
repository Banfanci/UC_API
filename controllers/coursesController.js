const catchAsync = require('../utils/catchAsync.js');
const info = require('../public/buscacursos/info_buscacursos');
const buscaCursos = require('../services/buscacursos');

exports.getCourses = catchAsync(async (req, res, next) => {
  const { parameters, KEY_CONVERSOR } = info;
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

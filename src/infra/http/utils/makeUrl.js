export default function makeUrl(path = '', parameters = {}) {
  const path_params = Object.keys(parameters)
    .filter(param => path.includes(`:${param}`));

  path_params.map(param => {
    const value = parameters[param];

    if (value === null)
      throw new SyntaxError('URL parameters are not nullable');

    if (value === undefined)
      throw new SyntaxError('URL parameters cannot be undefined');

    path.replace(`:${param}`, `${value}`);
  });

  const search_params = Object.keys(parameters)
    .filter(param => !path_params.includes(param));
  const url = new URL(path);

  search_params.map(param => {
    let value = parameters[param];

    if (value === null) {
      value = '';
    }

    if (value !== undefined) {
      url.searchParams.append(param, `${value}`);
    }
  });

  return url.toString();
}

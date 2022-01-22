import makeUrl from './utils/makeUrl';
import makeConfigs from './utils/makeConfigs';

export async function fetchAdapter(path = '', method = 'get', body = null, parameters = null, headers = null, configs = null) {
  const url = makeUrl(path, parameters);
  const config = makeConfigs(configs, method.toUpperCase(), headers, body);
  const response = await fetch(url, config);
  const data = await response.json();

  return data;
}

export default function makeConfigs(base, method, headers, body) {
  const config = {
    ...base,
    method,
  };

  if (headers)
    config.headers = headers;

  if (body)
    config.body = body;

  return config;
}

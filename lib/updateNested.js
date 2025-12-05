export function updateNested(obj, path, value) {
  const parts = path.split('.');
  const newObj = {...obj};
  let cur = newObj;
  for (let i=0; i<parts.length-1; i++){
    const p = parts[i];
    cur[p] = Array.isArray(cur[p]) ? [...cur[p]] : {...(cur[p]||{})};
    cur = cur[p];
  }
  cur[parts[parts.length-1]] = value;
  return newObj;
}
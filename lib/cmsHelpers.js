// Helper functions for CMS operations

// Generic handler for nested list items
export function handleListFieldChange(setData, listKey, index, fieldKey, value) {
  setData(prev => {
    const list = Array.isArray(prev[listKey]) ? [...prev[listKey]] : [];
    // immutable update of the single item
    list[index] = { ...(list[index] || {}), [fieldKey]: value };
    return { ...prev, [listKey]: list };
  });
}

// Generic handler for nested object fields
export function handleNestedFieldChange(setData, parentKey, fieldKey, value) {
  setData(prev => ({
    ...prev,
    [parentKey]: {
      ...prev[parentKey],
      [fieldKey]: value
    }
  }));
}

// Generic handler for top-level fields
export function handleFieldChange(setData, fieldKey, value) {
  setData(prev => ({
    ...prev,
    [fieldKey]: value
  }));
}

// Deep clone function for complex objects
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Object) {
    const clonedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}
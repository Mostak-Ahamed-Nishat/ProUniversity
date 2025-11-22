type Plain = Record<string, any>;

export function updateStudentData(
  obj: Plain,
  prefix = ""
): { $set: Plain; $unset: Plain } {
  const $set: Plain = {};
  const $unset: Plain = {};

  const recurse = (value: any, path: string) => {
    if (value === null) {
      $unset[path] = "";
      return;
    }
    if (Array.isArray(value)) {
      // arrays: set whole array (fine for most PATCH scenarios)
      $set[path] = value;
      return;
    }

    if (value && typeof value === "object") {
      const keys = Object.keys(value);
      if (keys.length === 0) {
        return;
      }
      for (const k of keys) {
        recurse(value[k], path ? `${path}.${k}` : k);
      }
      return;
    }

    $set[path] = value;
  };

  recurse(obj, prefix);
  return { $set, $unset };
}

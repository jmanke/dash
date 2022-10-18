/**
 *
 * @param attribute attribute name
 * @param value value of attribute
 * @returns void if null or undefined or the formatted attribute+value for html templates
 */
export function nullableAttribute(attribute: string, value: any) {
  if (value === undefined || value === null || (typeof value === 'string' && value.length === 0)) {
    return;
  }

  return formatAttribute(attribute, value);
}

/**
 *
 * @param attribute attribute name
 * @param value value of attribute
 * @returns attribute name without value if value is true
 */
export function booleanAttribute(attribute: string, value: boolean) {
  if (value === undefined || value === null || value === false) {
    return;
  }

  return attribute;
}

/**
 *
 * @param attribute attribute name
 * @param value value of attribute
 * @returns Correctly formatted string attribute+value for html templates
 */
export function formatAttribute(attribute: string, value: any) {
  return `${attribute}="${value}"`;
}

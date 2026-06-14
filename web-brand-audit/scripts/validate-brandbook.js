#!/usr/bin/env node
/**
 * Validates brandbook.json against brandbook.schema.json
 * Usage: node validate-brandbook.js <path-to-brandbook.json>
 */

const fs = require("fs");
const path = require("path");

const brandbookPath = process.argv[2];
if (!brandbookPath) {
  console.error("Usage: node validate-brandbook.js <brandbook.json>");
  process.exit(1);
}

const schemaCandidates = [
  path.join(__dirname, "brandbook.schema.json"),
  path.join(__dirname, "..", "web-brand-audit", "templates", "brandbook.schema.json"),
  path.join(__dirname, "..", "templates", "brandbook.schema.json"),
];
const schemaPath = schemaCandidates.find((candidate) => fs.existsSync(candidate));
if (!schemaPath) {
  console.error("Could not find brandbook.schema.json");
  process.exit(1);
}

let brandbook;
let schema;

try {
  brandbook = JSON.parse(fs.readFileSync(path.resolve(brandbookPath), "utf8"));
} catch (err) {
  console.error(`Failed to read brandbook: ${err.message}`);
  process.exit(1);
}

try {
  schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
} catch (err) {
  console.error(`Failed to read schema: ${err.message}`);
  process.exit(1);
}

const errors = [];

function validate(value, subSchema, pointer) {
  if (!subSchema) return;

  const type = subSchema.type;
  if (type === "object") {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      errors.push(`${pointer}: expected object`);
      return;
    }
    if (subSchema.required) {
      for (const key of subSchema.required) {
        if (!(key in value)) {
          errors.push(`${pointer}: missing required property "${key}"`);
        }
      }
    }
    if (subSchema.properties) {
      for (const [key, propSchema] of Object.entries(subSchema.properties)) {
        if (key in value) {
          const ref = propSchema.$ref;
          if (ref) {
            const defName = ref.replace("#/definitions/", "");
            validate(value[key], schema.definitions[defName], `${pointer}.${key}`);
          } else {
            validate(value[key], propSchema, `${pointer}.${key}`);
          }
        }
      }
    }
    return;
  }

  if (type === "array") {
    if (!Array.isArray(value)) {
      errors.push(`${pointer}: expected array`);
      return;
    }
    if (subSchema.minItems && value.length < subSchema.minItems) {
      errors.push(`${pointer}: array too short (min ${subSchema.minItems})`);
    }
    const items = subSchema.items;
    if (items) {
      value.forEach((item, i) => {
        if (items.$ref) {
          const defName = items.$ref.replace("#/definitions/", "");
          validate(item, schema.definitions[defName], `${pointer}[${i}]`);
        } else {
          validate(item, items, `${pointer}[${i}]`);
        }
      });
    }
    return;
  }

  if (type === "string") {
    if (typeof value !== "string") {
      errors.push(`${pointer}: expected string`);
      return;
    }
    if (subSchema.pattern && !new RegExp(subSchema.pattern).test(value)) {
      errors.push(`${pointer}: does not match pattern ${subSchema.pattern}`);
    }
    if (subSchema.enum && !subSchema.enum.includes(value)) {
      errors.push(`${pointer}: must be one of ${subSchema.enum.join(", ")}`);
    }
    return;
  }

  if (type === "integer") {
    if (typeof value !== "number" || !Number.isInteger(value)) {
      errors.push(`${pointer}: expected integer`);
      return;
    }
    if (subSchema.enum && !subSchema.enum.includes(value)) {
      errors.push(`${pointer}: must be one of ${subSchema.enum.join(", ")}`);
    }
    return;
  }

  if (type === "number") {
    if (typeof value !== "number") {
      errors.push(`${pointer}: expected number`);
    }
    return;
  }

  if (type === "boolean") {
    if (typeof value !== "boolean") {
      errors.push(`${pointer}: expected boolean`);
    }
  }
}

validate(brandbook, schema, "root");

if (errors.length === 0) {
  console.log("OK — brandbook is valid");
  process.exit(0);
} else {
  console.error("Validation failed:");
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

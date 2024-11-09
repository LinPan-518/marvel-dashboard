type EnvironmentsVariables = "VITE_API_URL" | "VITE_PUBLIC_API_KEY";

export function throwIfNotDefined(key: EnvironmentsVariables): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined on .env file.`);
  }
  return value;
}

export const envVariables = {
  VITE_API_URL: throwIfNotDefined("VITE_API_URL"),
  VITE_PUBLIC_API_KEY: throwIfNotDefined("VITE_PUBLIC_API_KEY"),
};

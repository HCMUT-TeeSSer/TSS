/**
 * Simulates a backend API call by reading JSON files from the data folder
 * @param filename - Name of the JSON file (without .json extension)
 * @param delay - Simulated network delay in milliseconds (default: 500ms)
 * @returns Promise with the parsed JSON data
 * @throws Error if file cannot be loaded or parsed
 */
export async function fetchJsonData<T = unknown>(filename: string, delay = 500): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        // Dynamically import the JSON file from the data folder
        const data = (await import(`../data/${filename}.json`)) as { default?: T } | T;

        // Simulate successful API response
        resolve((data as { default?: T }).default ?? (data as T));
      } catch (error) {
        // Simulate API error
        reject(new Error(`Failed to fetch data from ${filename}.json: ${String(error)}`));
      }
    }, delay);
  });
}

interface MockApiOptions {
  delay?: number;
  shouldFail?: boolean;
  errorMessage?: string;
}

/**
 * Simulates a backend API call with custom response options
 * @param filename - Name of the JSON file (without .json extension)
 * @param options - Configuration options for the mock API call
 * @returns Promise with the API response
 */
export async function mockApiCall(
  filename: string,
  options: MockApiOptions = {}
): Promise<{ data: unknown; error: string | null; status: number }> {
  const { delay = 500, shouldFail = false, errorMessage = "Request failed" } = options;

  return new Promise((resolve) => {
    setTimeout(async () => {
      if (shouldFail) {
        resolve({
          data: null,
          error: errorMessage,
          status: 500,
        });
        return;
      }

      try {
        const data = (await import(`../data/${filename}.json`)) as { default?: unknown };
        resolve({
          data: data.default ?? data,
          error: null,
          status: 200,
        });
      } catch {
        resolve({
          data: null,
          error: `Failed to load ${filename}.json`,
          status: 404,
        });
      }
    }, delay);
  });
}

/**
 * Batch fetch multiple JSON files
 * @param filenames - Array of JSON file names (without .json extension)
 * @param delay - Simulated network delay in milliseconds
 * @returns Promise with array of parsed JSON data
 */
export async function batchFetchJsonData<T = unknown>(filenames: string[], delay = 500): Promise<T[]> {
  const promises = filenames.map((filename) => fetchJsonData<T>(filename, delay));
  return Promise.all(promises);
}

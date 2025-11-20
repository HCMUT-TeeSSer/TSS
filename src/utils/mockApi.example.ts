import { batchFetchJsonData, fetchJsonData, mockApiCall } from "./mockApi";

// Define types for our data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

// Example 1: Basic usage - Fetch users
async function example1() {
  console.log("=== Example 1: Basic fetch users ===");
  try {
    const users = await fetchJsonData<User[]>("users");
    console.log("Users:", users);
    console.log(`Total users: ${String(users.length)}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 2: Fetch with custom delay
async function example2() {
  console.log("\n=== Example 2: Fetch with custom delay (2s) ===");
  console.time("Fetch time");
  try {
    const products = await fetchJsonData<Product[]>("products", 2000);
    console.log("Products:", products);
    console.timeEnd("Fetch time");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 3: Mock API call with response object
async function example3() {
  console.log("\n=== Example 3: Mock API call with response object ===");
  try {
    const response = await mockApiCall("users");
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    console.log("Error:", response.error);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 4: Simulate API error
async function example4() {
  console.log("\n=== Example 4: Simulate API error ===");
  try {
    const response = await mockApiCall("users", {
      shouldFail: true,
      errorMessage: "Server is down for maintenance",
      delay: 1000,
    });
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    console.log("Error:", response.error);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 5: Batch fetch multiple files
async function example5() {
  console.log("\n=== Example 5: Batch fetch multiple files ===");
  console.time("Batch fetch time");
  try {
    const [users, products] = await batchFetchJsonData<User[] | Product[]>(["users", "products"], 1000);
    console.log("Users:", users);
    console.log("Products:", products);
    console.timeEnd("Batch fetch time");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 6: Handle non-existent file
async function example6() {
  console.log("\n=== Example 6: Handle non-existent file ===");
  try {
    const response = await mockApiCall("nonexistent");
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    console.log("Error:", response.error);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 7: Real-world usage in a component
async function loadUserProfile(userId: number) {
  console.log(`\n=== Example 7: Load user profile #${String(userId)} ===`);
  try {
    // Simulate fetching user data
    const users = await fetchJsonData<User[]>("users", 500);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      console.log("User not found");
      return null;
    }

    console.log("User profile loaded:");
    console.log(`- Name: ${user.name}`);
    console.log(`- Email: ${user.email}`);
    console.log(`- Role: ${user.role}`);
    return user;
  } catch (error) {
    console.error("Failed to load user profile:", error);
    return null;
  }
}

// Example 8: Parallel requests with error handling
async function example8() {
  console.log("\n=== Example 8: Parallel requests with error handling ===");

  const requests = [
    mockApiCall("users"),
    mockApiCall("products"),
    mockApiCall("settings"), // This will fail (file doesn't exist)
  ];

  const results = await Promise.allSettled(requests);

  results.forEach((result, index) => {
    const endpoints = ["users", "products", "settings"];
    if (result.status === "fulfilled") {
      const response = result.value;
      console.log(`${endpoints[index]}: Status ${String(response.status)}`, response.error ?? "Success");
    } else {
      console.log(`${endpoints[index]}: Failed -`, result.reason);
    }
  });
}

// Run all examples
export async function runAllExamples() {
  await example1();
  await example2();
  await example3();
  await example4();
  await example5();
  await example6();
  await loadUserProfile(2);
  await example8();
}

// Uncomment to run examples
// tsx ./src/utils/mockApi.example.ts
await runAllExamples();

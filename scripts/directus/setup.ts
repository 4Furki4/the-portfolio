export {};

console.log("Applying Directus schema...");
await import("./schema");
console.log("Seeding existing portfolio content and media...");
await import("./seed");
console.log("Configuring public access and webhook revalidation...");
await import("./configure");
console.log("Verifying Directus native translations and public runtime...");
await import("./verify");

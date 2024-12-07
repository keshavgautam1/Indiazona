const db = require("pg-promise")(); // Import pg-promise

// Define the database connection (use the same credentials as in server.js)
const database = db(process.env.PG_URI);

const seedData = async () => {
  try {
    await database.none("TRUNCATE TABLE subcategories"); // Clear existing data

    await database.none(`
      INSERT INTO subcategories (name, category)
      VALUES 
        ('Kurta', 'Fashion'),
        ('Jeans', 'Fashion'),
        ('T-shirt', 'Fashion'),
        ('Laptop', 'Electronics'),
        ('Phone', 'Electronics')
    `);

    console.log("Database seeded successfully");
  } catch (error) {
    console.log("Error seeding database:", error);
  }
};

// Call the seed function
seedData();

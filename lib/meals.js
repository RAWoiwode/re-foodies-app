import sql from "better-sqlite3";

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error("error");
  return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = (slug) => {
  // Using dynamic value to protect against SQL Injection
  return db.prepare("SELECT * FROM meals where slug = ?").get(slug);
};

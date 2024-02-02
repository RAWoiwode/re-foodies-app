import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

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

export const saveMeal = async (meal) => {
  // Generate slug based on title
  meal.slug = slugify(meal.title, { lower: true });

  // Sanitize user input
  meal.instructions = xss(meal.instructions);

  // Store image on file system
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}-${(Math.random() * 1000).toFixed(
    0
  )}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  // Do not include public, all requests are sent to the public folder automatically
  meal.image = `/images/${fileName}`;

  // sqlite will find the obj keys and replace; Safer for SQL Injection
  db.prepare(
    `
  INSERT INTO meals
  (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (
    @title, 
    @summary, 
    @instructions, 
    @creator, 
    @creator_email, 
    @image, 
    @slug
  )
  `
  ).run(meal);
};

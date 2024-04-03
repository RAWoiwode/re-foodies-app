"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { saveMeal } from "./meals";

const isInvalidText = (text) => {
  return !text || text.trim() === "";
};

export const shareMeal = async (previousState, formData) => {
  const meal = {
    title: formData.get("title"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // throw new Error("Invalid Input");
    return {
      message: "Invalid input",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals"); // Revalidate cache for path provided
  redirect("/meals");
};

"use server";

import { redirect } from "next/navigation";
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
    isInvalidText(meal.text) ||
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
  redirect("/meals");
};

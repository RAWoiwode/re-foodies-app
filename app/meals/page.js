import Link from "next/link";
import React from "react";

const MealsPage = () => {
  return (
    <>
      <h1>Meals</h1>
      <p>
        <Link href={"/meals/share"}>Share</Link>
      </p>
      <p>
        <Link href={"/meals/burger"}>Burger</Link>
      </p>
      <p>
        <Link href={"/meals/pasta"}>Pasta</Link>
      </p>
    </>
  );
};

export default MealsPage;

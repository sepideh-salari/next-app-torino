import Cards from "@/module/Cards";
import React from "react";
import styles from "./TourCards.module.css";
function TourCards({ tours }) {
  return (
    <div className={styles.container}>
      <h2>همه تورها</h2>
      <div className={styles.subContainer}>
        {tours.map((tour) => (
          <Cards key={tour.id} {...tour} />
        ))}
      </div>
    </div>
  );
}

export default TourCards;

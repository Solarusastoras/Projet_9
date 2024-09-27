import React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Utilisez useMemo pour mémoriser la valeur de byDateDesc
  // use useMemo to memorize the value of byDateDesc
  const byDateDesc = useMemo(() => {
    if (!data?.focus?.length) {
      return [];
    }
    return data.focus.sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    );
  }, [data]);

  console.log("=========");
  console.log("byDateDesc:", byDateDesc);
  console.log("=========");

  // Utilisez useCallback pour mémoriser la fonction nextCard
  // use useCallback to memorize the nextCard function
  const nextCard = useCallback(() => {
    let timer;
    if (!isPaused) {
      timer = setTimeout(() => {
        if (byDateDesc.length > 0) {
          const newIndex = index < byDateDesc.length - 1 ? index + 1 : 0;
          setIndex(newIndex);
        }
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [index, byDateDesc, isPaused]);

  // Utilisez useEffect pour exécuter nextCard à chaque changement d'index
  // use useEffect to run nextCard on each index change
  useEffect(() => {
    console.log("=========");
    console.log(`Postion actuel du radio: ${index}`);
    console.log("=========");
    const clearNextCard = nextCard();
    return () => clearNextCard();
  }, [index, nextCard]);

  // Gestionnaire d'événements pour la touche espace
  // Event handler for the space key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        // Empêche le comportement par défaut de la barre d'espace
        // Prevent the default behavior of the space bar
        event.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => {
        const eventKey = event.id || idx;
        console.log(`Rendering event with key: ${eventKey}`);
        return (
          <div key={eventKey}>
            <div
              className={`SlideCard SlideCard--${
                index === idx ? "display" : "hide"
              }`}
            >
              <img src={event.cover} alt="forum" />
              <div className="SlideCard__descriptionContainer">
                <div className="SlideCard__description">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div>{getMonth(new Date(event.date))}</div>
                </div>
              </div>
            </div>
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc.map((_, radioIdx) => {
                  const radioKey = `${eventKey}-${radioIdx}`;
                  const isChecked = index === radioIdx;
                  console.log(`Rendering radio with key: ${radioKey}`);
                  return (
                    <input
                      key={radioKey}
                      type="radio"
                      name={`radio-button-${eventKey}`}
                      checked={isChecked}
                      readOnly
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Slider;

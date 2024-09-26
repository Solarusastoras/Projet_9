import React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Utilisez useMemo pour mémoriser la valeur de byDateDesc
  // Use useMemo to memoize the value of byDateDesc
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
  // Use useCallback to memoize the nextCard function
  const nextCard = useCallback(() => {
    setTimeout(() => {
      if (byDateDesc.length > 0) {
        const newIndex = index < byDateDesc.length - 1 ? index + 1 : 0;
        setIndex(newIndex);
      }
    }, 5000);
  }, [index, byDateDesc]);

  // Utilisez useEffect pour exécuter nextCard à chaque changement d'index
  // Use useEffect to run nextCard on each index change
  useEffect(() => {
    console.log("=========");
    console.log(`Postion actuel du radio: ${index}`);
    console.log("=========");
    nextCard();
  }, [index, nextCard]);

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => {
        // Utiliser idx comme clé de secours si event.id est undefined
        // Use idx as a fallback key if event.id is undefined
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
                  // Crée une clé unique pour chaque bouton radio
                  // Create a unique key for each radio button
                  const radioKey = `${eventKey}-${radioIdx}`;
                  // Vérifie si l'index actuel correspond à l'index du bouton radio
                  // Check if the current index matches the radio button index
                  const isChecked = index === radioIdx;
                  console.log(`Rendering radio with key: ${radioKey}`);
                  return (
                    <input

                      key={radioKey}
                      type="radio"
                      name={`radio-button-${eventKey}`}
                      // Définit l'état coché du bouton radio en fonction de la correspondance des index
                      // Set the checked state of the radio button based on index match
                      checked={isChecked}
                      // Rend le bouton radio en lecture seule
                      // Make the radio button read-only
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
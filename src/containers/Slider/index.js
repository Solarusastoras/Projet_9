import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trie les événements par date décroissante
  // Sort events by descending date
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );

  // Ajout d'un état pour gérer la pause
  // Add a state to manage the pause
  const [paused, setPaused] = useState(false);

  // Fonction pour avancer à la prochaine image
  // Function to move to the next image
  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
  };

  // Utilisation de useEffect pour déclencher le changement d'image
  // Use useEffect to trigger image change
  useEffect(() => {
    // Si le slider n'est pas en pause, déclenche le changement d'image toutes les 5 secondes
    // If the slider is not paused, trigger image change every 5 seconds
    const interval = setInterval(() => {
      if (!paused) {
        nextCard();
      }
    }, 5000);
    return () => clearInterval(interval);
    // Déclenche le changement d'image lorsque l'état de pause change
    // Trigger image change when pause
  }, [paused]); 

  // Gestion de la pression de la barre d'espace pour mettre en pause ou reprendre le slider
  // Handle spacebar press to pause or resume the slider
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        // Empêche le comportement par défaut  lorsque la barre d'espace est pressée
        // Prevent default behavior when spacebar is pressed
        event.preventDefault(); 
        setPaused((prevPaused) => !prevPaused);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // Utilisation d'un tableau vide pour exécuter cette fonction uniquement une fois lors du montage
    // Use an empty array to run this function only once on mount
  }, []); 


  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div key={event.id}>
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
                // Vérifie si l'index actuel correspond à l'index du bouton radio
                // Check if the current index matches the radio button index
                const isChecked = index === radioIdx;
                return (
                  <input
                    key={`${event.id}-${radioIdx}`}
                    type="radio"
                    name="radio-button"
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
      ))}
    </div>
  );
};

export default Slider;
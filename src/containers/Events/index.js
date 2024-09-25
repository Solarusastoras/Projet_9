import React, { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

// Nombre d'événements par page
// Number of events per page
const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  console.log("--------------");
  console.log("DataEvents:", data);
  console.log("--------------");

  // Modification de code
  // Filtre les événements par type
  // Filter events by type
  const filteredEvents = (!type
    ? data?.events
    : data?.events.filter((event) => !type || event.type === type)) || [];

  // Calculer le nombre total d'événements filtrés
  // Calculate the total number of filtered events
  const totalEvents = filteredEvents.length;

  // Modification de code
  // Calculer le nombre de pages nécessaires plus précis 
  // Calculate the number of pages needed more accurately
  const pageNumber = Math.ceil(totalEvents / PER_PAGE);

  // Filtrer les événements pour la page actuelle
  // Filter events for the current page
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  console.log("--------------");
  console.log("filtre:", paginatedEvents);
  console.log("--------------");

  // Change le type d'événement sélectionné et réinitialise la page à 1
  // Change the selected event type and reset the page to 1
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // Créer une liste des types d'événements
  // Create a list of event types
  const typeList = new Set(data?.events.map((event) => event.type));
  

  return (
    <>
      {/* Afficher un message d'erreur si une erreur survient
      // Display an error message if an error occurs */}
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            // Passer la liste des types d'événements au composant Select
            // Pass the list of event types to the Select component
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              //eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {/* Afficher les numéros de page et permettre à l'utilisateur de naviguer entre les pages
                // Display page numbers and allow the user to navigate between pages */}
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
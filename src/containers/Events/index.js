import React, { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

// Nombre d'événements par page
// Number of events per page
const PER_PAGE = 2;
const EventList = () => {
  // Récupère les données et les erreurs du contexte
  // Get data and errors from the context
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  console.log("--------------");
  console.log("DataEvents:", data);
  console.log("--------------");

  // Filtre les événements par type et par page
  // Filter events by type and by page
  const filteredEvents = (
    (!type
      ? data?.events
      : data?.events.filter((event) => !type || event.type === type)) || []
  ).filter((_, index) => {
    // Filtrer les événements pour la page actuelle
    // Filter events for the current page
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });

  console.log("--------------");
  console.log("filtre:", filteredEvents);
  console.log("--------------");

  // Change le type d'événement sélectionné et réinitialise la page à 1
  // Change the selected event type and reset the page to 2
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
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
            {filteredEvents.map((event) => (
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
            {[...Array(pageNumber || 0)].map((_, n) => (
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

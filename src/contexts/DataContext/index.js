import React from "react";
import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  // Ajout de useMemo pour last
  // Add useMemo for last
  useMemo,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Utilisation de useMemo pour afficher le dernier évènement
  // Using useMemo to display the latest event
  const last = useMemo(() => {
    // Vérifie si 'data' ou 'data.events' est nul ou indéfini
    // Checks if 'data' or 'data.events' is null or undefined
    if (!data || !data.events) return null;

    // Utilise la méthode 'reduce' pour trouver l'événement le plus récent
    // Uses the 'reduce' method to find the most recent event
    return data.events.reduce(
      (mostRecent, event) =>
        // Si 'mostRecent' est nul ou si la date de l'événement actuel est plus récente que celle de 'mostRecent'
        // If 'mostRecent' is null or if the current event's date is more recent than 'mostRecent'
        !mostRecent || new Date(event.date) > new Date(mostRecent.date)
          ? event
          : mostRecent,
      null
    );
    // Recalcule uniquement lorsque 'data' change
    // Recomputes only when 'data' changes
  }, [data]);

  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        //Ajout de la valeur last
        //Add value of last
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;

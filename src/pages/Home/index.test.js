import React from "react";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from "./index";

// Mock des données d'événements
const mockEvents = [
  {
    id: 1,
    type: "conférence",
    date: "2022-04-29T20:28:45.744Z",
    title: "User&product MixUsers",
    cover: "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
  },
  {
    id: 2,
    type: "expérience digitale",
    date: "2022-01-29T20:28:45.744Z",
    title: "#DigitonPARIS",
    cover: "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
  },
  {
    id: 3,
    type: "conférence",
    date: "2022-03-29T20:28:45.744Z",
    title: "Conférence &co-responsable",
    cover: "/images/chuttersnap-Q_KdjKxntH8-unsplash.png",
  }
];

// Test fonctionnel
// Décrit un groupe de tests pour la création du formulaire
describe("When Form is created", () => {
  // Test pour vérifier que la liste des champs du formulaire est affichée
  it("a list of fields card is displayed", async () => {
    // Rend le composant Home
    render(<Home />);
    // Vérifie que les champs "Email", "Nom", "Prénom" et "Personel / Entreprise" sont affichés
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  // Décrit un sous-groupe de tests pour les interactions avec le bouton de soumission
  describe("and a click is triggered on the submit button", () => {
    // Test pour vérifier que le message de succès est affiché après le clic sur le bouton de soumission
    it("the success message is displayed", async () => {
      // Rend le composant Home
      render(<Home />);
      // Simule un clic sur le bouton "Envoyer"
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Vérifie que le message "En cours" est affiché après le clic
      await screen.findByText("En cours");
    });
  });
});

// Test d'intégration
// Ajout de tests pour les autres éléments de la page
describe("When a page is created", () => {
  // Test pour vérifier que la liste des événements est affichée
  it("a list of events is displayed", async () => {
    // Rend le composant Home avec les données mockées
    render(<Home events={mockEvents} />);

    // Utilise waitFor pour attendre que la section soit rendue
    await waitFor(() => {
      const eventListSection = screen.getByTestId("eventListHome");
      expect(eventListSection).toBeInTheDocument();
      
      // Affiche le nombre d'éléments dans la console
      console.log("Nbr Event Test :", eventListSection.childElementCount);
    });
  });

  // Test pour vérifier que la liste des personnes est affichée
  it("a list of people is displayed", async () => {
    render(<Home />);
    // Vérifie que les éléments de la liste des personnes sont présents dans le DOM
    await screen.findByText("Samira");
    await screen.findByText("Jean-baptiste");
    await screen.findByText("Christine");
    await screen.findByText("VP communication");
  });

  // Test pour vérifier que le pied de page est affiché
  it("a footer is displayed", async () => {
    render(<Home />);
    const footer = screen.getByTestId("test-footer");
    expect(footer).toBeInTheDocument();
  });

  // Test pour vérifier qu'une carte d'événement avec le dernier événement est affichée
  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    // Vérifie que la carte de l'événement le plus récent est présente dans le DOM
    const lastEvent = screen.getByTestId("last-event");
    expect(lastEvent).toBeDefined();
  });
});
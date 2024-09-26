import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";


// Mock des données d'événements
const mockEvents = [
  {
    id: 1,
    type: "conférence",
    date: "2022-04-29T20:28:45.744Z",
    title: "User&product MixUsers",
    cover: "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
    description: "Présentation des nouveaux usages UX.",
    nb_guesses: 900,
    periode: "14-15-16 Avril",
    prestations: [
      "1 espace d’exposition",
      "1 scéne principale",
      "1 espace de restaurations"
    ]
  },
  {
    id: 2,
    type: "expérience digitale",
    date: "2022-01-29T20:28:45.744Z",
    title: "#DigitonPARIS",
    cover: "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
    description: "Présentation des outils analytics aux professionnels du secteur ",
    nb_guesses: 1300,
    periode: "24-25-26 Février",
    prestations: [
      "1 espace d’exposition",
      "1 scéne principale",
      "1 site web dédié"
    ]
  },
  {
    id: 3,
    type: "conférence",
    date: "2022-03-29T20:28:45.744Z",
    title: "Conférence &co-responsable",
    cover: "/images/chuttersnap-Q_KdjKxntH8-unsplash.png",
    description: "Débats et échanges autour des collaborations eco-responsable.",
    nb_guesses: 600,
    periode: "24-25-26 Février",
    prestations: [
      "1 scéne principale",
      "1 espaces de restaurations",
      "1 site web dédié"
    ]
  }
];

// Mock the API call to return the mock data
jest.mock("./api", () => ({
  fetchEvents: jest.fn(() => Promise.resolve(mockEvents))
}));
// Décrit un groupe de tests pour la création du formulaire
// Describe a group of tests for the creation of the form
describe("When Form is created", () => {
  // Test pour vérifier que la liste des champs du formulaire est affichée
  // Test to check that the list of form fields is displayed
  it("a list of fields card is displayed", async () => {
    // Rend le composant Home
    // Render the Home component
    render(<Home />);
    // Vérifie que les champs "Email", "Nom", "Prénom" et "Personel / Entreprise" sont affichés
    // Check that the fields "Email", "Nom", "Prénom" and "Personel / Entreprise" are displayed
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  // Décrit un sous-groupe de tests pour les interactions avec le bouton de soumission
  // Describe a subgroup of tests for interactions with the submit button
  describe("and a click is triggered on the submit button", () => {
    // Test pour vérifier que le message de succès est affiché après le clic sur le bouton de soumission
    // Test to check that the success message is displayed after clicking the submit button
    it("the success message is displayed", async () => {
      // Rend le composant Home
      // Render the Home component
      render(<Home />);
      // Simule un clic sur le bouton "Envoyer"
      // Simulate a click on the "Envoyer" button
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Vérifie que le message "En cours" est affiché après le clic
      // Check that the message "En cours" is displayed after the click
      await screen.findByText("En cours");
    });
  });
});



// Ajout de tests pour les autres éléments de la page
// Add tests for the other elements of the page
describe("When a page is created", () => {
  // Test 1
  // Test pour vérifier que la liste des événements est affichée
  // Test to check that the list of events is displayed

  it("a list of events is displayed", async () => {
    render(<Home />);
    // Vérifie la présence des 3 cartes d'événements dans le DOM
    // Check the presence of the 3 event cards in the DOM
    const eventCards = await screen.findAllByTestId("event-card");
    expect(eventCards).toHaveLength(3);
  });

  // Test 2
  // Test pour vérifier que la liste des personnes est affichée
  // Test to check that the list of people is displayed
  it("a list of people is displayed", async () => {
    render(<Home />);
    // Vérifie que les éléments de la liste des personnes sont présents dans le DOM
    // Check that the elements of the list of people are present in the DOM
    await screen.findByText("Samira");
    await screen.findByText("Jean-baptiste");
    await screen.findByText("Christine");
    await screen.findByText("VP communication");
  });

  // Test 3
  // Test pour vérifier que le pied de page est affiché
  // Test to check that the footer is displayed
  it("a footer is displayed", async () => {
    render(<Home />);

    const footer = screen.getByTestId("test-footer");
    expect(footer).toBeInTheDocument();
  });

  // Test 4
  // Test pour vérifier qu'une carte d'événement avec le dernier événement est affichée
  // Test to check that an event card with the last event is displayed
  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    // Vérifie que la carte de l'événement le plus récent est présente dans le DOM
    // Check that the card of the most recent event is present
    const lastEvent = screen.getByTestId("last-event");
    expect(lastEvent).toBeDefined();
  });
});

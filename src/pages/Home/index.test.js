import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

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
  // Test pour vérifier que la liste des événements est affichée
  // Test to check that the list of events is displayed
  it("a list of events is displayed", async () => {
    render(<Home />);
    // Vérifie qu'il y a 18 elements de la liste des événements
    // Check that there are 18 elements in the list of events
  });

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

  // Test pour vérifier que le pied de page est affiché
  // Test to check that the footer is displayed
  it("a footer is displayed", async () => {
    render(<Home />);

    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  // Test pour vérifier qu'une carte d'événement avec le dernier événement est affichée
  // Test to check that an event card with the last event is displayed
  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    // Vérifie que la carte de l'événement le plus récent est présente dans le DOM
    // Check that the card of the most recent event is present
    const lastEvent = await screen.findByTestId("lastEvent");
    expect(lastEvent).toBeInTheDocument();
  });
});

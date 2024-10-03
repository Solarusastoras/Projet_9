import React from "react";
import { fireEvent, render, screen} from '@testing-library/react';
import Home from "./index";

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
    render(<Home />);
    const events = screen.getAllByRole("listitem");
    expect(events.length).toBeGreaterThan(0);
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

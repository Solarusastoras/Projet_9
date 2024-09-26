import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DataProvider } from "../../contexts/DataContext";
import Home from "./index";
import Event from "../../components/EventCard/index";

// Données de test
const mockData = {
  events: [
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
        "1 espace de restaurations",
      ],
    },
    {
      id: 2,
      type: "expérience digitale",
      date: "2022-01-29T20:28:45.744Z",
      title: "#DigitonPARIS",
      cover: "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur ",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "1 site web dédié",
      ],
    },
    {
      id: 3,
      type: "conférence",
      date: "2022-03-29T20:28:45.744Z",
      title: "Conférence &co-responsable",
      cover: "/images/chuttersnap-Q_KdjKxntH8-unsplash.png",
      description:
        "Débats et échanges autour des collaborations eco-responsable.",
      nb_guesses: 600,
      periode: "24-25-26 Février",
      prestations: [
        "1 scéne principale",
        "1 espaces de restaurations",
        "1 site web dédié",
      ],
    },
  ],
};

// Mock de la fonction loadData
jest.mock("../../api", () => ({
  loadData: jest.fn().mockReturnValue(mockData),
}));

// Décrit un groupe de tests pour la création du formulaire
describe("When Form is created", () => {
  // Test pour vérifier que la liste des champs du formulaire est affichée
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  // Décrit un sous-groupe de tests pour les interactions avec le bouton de soumission
  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

// 1er Test
// Ajout de tests pour les autres éléments de la page
describe("When a page is created", () => {
  // Test pour vérifier que la liste des événements est affichée
  it("a list of events is displayed", async () => {
    render(
      <DataProvider>
        <Event />
      </DataProvider>
    );

    for (const event of mockData.events) {
      console.log("Checking event:", event);
      const titleElement = await screen.findByText(event.title);
      const dateElement = await screen.findByText(new Date(event.date).toLocaleDateString());
      const typeElement = await screen.findByText(event.type);

      console.log("Found title element:", titleElement);
      console.log("Found date element:", dateElement);
      console.log("Found type element:", typeElement);

      expect(titleElement).toBeInTheDocument();
      expect(dateElement).toBeInTheDocument();
      expect(typeElement).toBeInTheDocument();
    }
  });

  // 2ème test
  // Test pour vérifier que la liste des personnes est affichée
  it("a list of people is displayed", async () => {
    render(<Home />);
    await screen.findByText("Samira");
    await screen.findByText("Jean-baptiste");
    await screen.findByText("Christine");
    await screen.findByText("VP communication");
  });

  // 3ème test
  // Test pour vérifier que le pied de page est affiché
  it("a footer is displayed", async () => {
    render(<Home />);
    const footer = screen.getByTestId("test-footer");
    expect(footer).toBeInTheDocument();
  });

  // 4ème test
  // Test pour vérifier qu'une carte d'événement avec le dernier événement est affichée
  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    const lastEvent = screen.getByTestId("last-event");
    expect(lastEvent).toBeDefined();
  });
});

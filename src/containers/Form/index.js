import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // Nous essayons d'appeler mockContactApi
      // We try to call mockContact
      try {
        await mockContactApi();
        setSending(false);
        // Appeler onSuccess après la réussite de l'API . ajout onSuccess
        // Call onSuccess after API success. add onSuccess
        onSuccess();
      } catch (err) {
        setSending(false);
        // Appeler onError en cas d'erreur
        // Call onError in case of error
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  // Fonction de rappel appelée en cas d'erreur
  // Callback function called in case of error
  onError: PropTypes.func,
  // Fonction de rappel appelée en cas de succès
  // Callback function called in case of success
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  // Fonction par défaut pour onError
  // Default function for onError
  onError: () => null,
  // Fonction par défaut pour onSuccess
  // Default function for onSuccess
  onSuccess: () => null,
};

export default Form;

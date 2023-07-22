// Define the type for the SentInviteModalProps props
type SentInviteModalProps = {
  receivedInvitation: string;
  onCancel: () => void;
};

const SentInviteModal: React.FC<SentInviteModalProps> = ({
  receivedInvitation,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Invitation envoyée</h2>
        <p>Vous avez envoyé une invitation à {receivedInvitation}.</p>
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onCancel}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentInviteModal;

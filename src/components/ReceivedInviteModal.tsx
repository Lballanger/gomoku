// Define the type for the ReceivedInviteModal props
type ReceivedInviteModalProps = {
  playerToInvite: string;
  onAccept: () => void;
  onDecline: () => void;
};

const ReceivedInviteModal: React.FC<ReceivedInviteModalProps> = ({
  playerToInvite,
  onAccept,
  onDecline,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Invitation reçue</h2>
        <p>Vous avez reçu une invitation de {playerToInvite}.</p>
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded mr-2"
            onClick={onAccept}
          >
            Accepter
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onDecline}
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceivedInviteModal;

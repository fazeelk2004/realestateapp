const ConfirmDeleteListingModal = ({ open, onCancel, onDelete }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h3 className="font-bold text-lg mb-4">Delete Listing</h3>
        <p className="mb-6">Are you sure you want to delete this listing?</p>
        <div className="flex justify-end gap-2">
          <button className="btn text-white btn-error" onClick={onDelete}>
            Delete
          </button>
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteListingModal;
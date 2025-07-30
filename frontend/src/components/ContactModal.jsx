import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const ContactModal = ({ open, onCancel, landlord, listingTitle }) => {
  const [message, setMessage] = useState('');

  if (!open) return null;

  const handleSend = () => {
    const mailtoLink = `mailto:${landlord.email}?subject=Regarding ${listingTitle}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;

    toast.success(`Redirecting to your email client...`);
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="font-bold text-lg ">Contact {landlord?.username || 'Landlord'}</h3>
        <p className="text-sm text-gray-500">Email: {landlord?.email || 'No Phone Number Given.'}</p>
        <p className="mb-4 text-sm text-gray-500">Phone No.: {landlord?.phoneNo || 'No Phone Number Given.'}</p>
        <p className="mb-4 text-sm text-gray-500">You're inquiring about: <span className="font-semibold">{listingTitle}</span></p>
        <textarea
          name="message"
          id="message"
          rows={4}
          placeholder="Write your message here..."
          className="textarea textarea-bordered w-full mb-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={() => handleSend()} className="btn btn-primary" disabled={!message.trim()}>
            Send
          </button>
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
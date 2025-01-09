// src/components/cards/CreateCard.tsx
import { useState } from "react";
import { getAuth } from "firebase/auth";
import {
  CardData,
  GroupData,
  getRandomColor,
  EVENT_TYPES,
} from "../../constants/sharedConstants";
import { createWhim } from "../../firebaseService";

interface CreateCardProps {
  onCreateCard: (cardData: CardData) => void;
  onCloseForm: () => void;
  groupData?: GroupData;
}

export function CreateCard({
  onCreateCard,
  onCloseForm,
  groupData,
}: CreateCardProps) {
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "FOOD" as keyof typeof EVENT_TYPES,
    date: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    if (!auth.currentUser || !groupData?.id) {
      console.error("User not logged in or group not selected");
      return;
    }

    const newCard: Omit<CardData, "id"> = {
      groupId: groupData.id,
      createdBy: auth.currentUser.uid,
      eventName: formData.eventName,
      eventType: formData.eventType,
      date: formData.date || undefined,
      location: formData.location || undefined,
      color: getRandomColor(),
      likes: [],
      dislikes: [],
    };

    try {
      await createWhim(newCard);
      onCreateCard(newCard as CardData);
      onCloseForm();
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={formData.eventName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, eventName: e.target.value }))
            }
            placeholder="Event Name"
            className="w-full p-2 border rounded"
            required
          />

          <select
            value={formData.eventType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                eventType: e.target.value as keyof typeof EVENT_TYPES,
              }))
            }
            className="w-full p-2 border rounded"
            required
          >
            {Object.entries(EVENT_TYPES).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, date: e.target.value }))
            }
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, location: e.target.value }))
            }
            placeholder="Location"
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCloseForm}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create Card
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCard;

import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const priorityColors = {
  High: 'bg-red-500 text-white',
  Medium: 'bg-yellow-500 text-white',
  Low: 'bg-green-500 text-white',
};

export const LeadCard = ({ lead, index, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Draggable draggableId={lead.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-4 rounded-lg shadow-md cursor-move hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{lead.name}</h3>
            {/* Fixed Badge - No import needed */}
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[lead.priority]}`}>
              {lead.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{lead.email} / {lead.phone}</p>
          <div className="text-xs text-gray-500 mb-2">Agent: {lead.agent}</div>
          {showDetails && <p className="text-sm italic text-gray-700 mt-2">{lead.notes}</p>}
          
          <div className="flex gap-2 mt-3">
            <button onClick={() => setShowDetails(!showDetails)} className="text-blue-600 text-sm hover:underline">
              {showDetails ? 'Hide' : 'Details'}
            </button>
            <button onClick={() => onEdit(lead)} className="text-green-600 text-sm hover:underline">
              Edit
            </button>
            <button onClick={() => onDelete(lead.id)} className="text-red-600 text-sm hover:underline">
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};
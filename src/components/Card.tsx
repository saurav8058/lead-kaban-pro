import { Draggable } from '@hello-pangea/dnd';
import { useKanban } from '../context/kanbanContext';

const priorityColor = {
  High: 'bg-red-100 text-red-800 border-red-300',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Low: 'bg-green-100 text-green-800 border-green-300'
};

export default function Card({ lead, index }) {
  const { setLeadModal, setEditingLead } = useKanban();

  return (
    <Draggable draggableId={lead.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => { setEditingLead(lead); setLeadModal(true); }}
          className={`bg-white p-4 rounded-lg border-2 shadow-sm cursor-pointer transition-all hover:shadow-md ${
            snapshot.isDragging ? 'shadow-xl rotate-2' : ''
          }`}
        >
          <h3 className="font-semibold text-gray-800">{lead.name}</h3>
          {(lead.email || lead.phone) && (
            <p className="text-sm text-gray-600 mt-1">{lead.email || lead.phone}</p>
          )}
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500">{lead.agent}</span>
            <span className={`text-xs px-2 py-1 rounded-full border ${priorityColor[lead.priority] || priorityColor.Medium}`}>
              {lead.priority || 'Medium'}
            </span>
          </div>
          {lead.notes && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{lead.notes}</p>}
        </div>
      )}
    </Draggable>
  );
}
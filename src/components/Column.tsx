import { Droppable } from '@hello-pangea/dnd';
import Card from './Card';
import { useKanban } from '../context/kanbanContext';

export default function Column({ stage }) {
  const { setStageModal, setEditingStage, setStages } = useKanban();

  const handleRename = () => { setEditingStage(stage); setStageModal(true); };
  const handleDelete = () => {
    if (confirm('Delete this stage? Leads will move to first stage.')) {
      setStages(prev => {
        const idx = prev.findIndex(s => s.id === stage.id);
        const newStages = prev.filter(s => s.id !== stage.id);
        if (newStages.length > 0 && stage.leads.length > 0) {
          newStages[0].leads.push(...stage.leads);
        }
        return newStages.length > 0 ? newStages : prev;
      });
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 flex flex-col min-w-80 max-w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-800">{stage.name} ({stage.leads.length})</h2>
        <div className="flex gap-2">
          <button onClick={handleRename} className="text-xs text-blue-600 hover:underline">Rename</button>
          {stage.leads.length === 0 && (
            <button onClick={handleDelete} className="text-xs text-red-600 hover:underline">Delete</button>
          )}
        </div>
      </div>

      <Droppable droppableId={stage.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-96 space-y-3 p-2 rounded-lg transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-gray-100'
            }`}
          >
            {stage.leads.map((lead, i) => (
              <Card key={lead.id} lead={lead} index={i} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
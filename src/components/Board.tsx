
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';
import { useKanban } from '../context/kanbanContext';

export default function Board() {
  const { filteredStages, moveLead } = useKanban();

  return (
    <DragDropContext onDragEnd={moveLead}>
      <div className="flex gap-6 overflow-x-auto pb-6 px-6 py-8">
        {filteredStages.map((stage) => (
          <Column key={stage.id} stage={stage} />
        ))}
      </div>
    </DragDropContext>
  );
}
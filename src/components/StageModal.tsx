import { useEffect, useState } from 'react';
import { useKanban } from '../context/kanbanContext';

export default function StageModal() {
  const { stageModal, setStageModal, editingStage, setStages } = useKanban();
  const [name, setName] = useState('');

  useEffect(() => {
    if (editingStage) setName(editingStage.name);
    else setName('');
  }, [editingStage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStage) {
      setStages(prev => prev.map(s => s.id === editingStage.id ? { ...s, name } : s));
    } else {
      setStages(prev => [...prev, { id: Date.now().toString(), name, leads: [] }]);
    }
    setStageModal(false);
  };

  if (!stageModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">{editingStage ? 'Rename' : 'Add'} Stage</h2>
        <form onSubmit={handleSubmit}>
          <input required value={name} onChange={e => setName(e.target.value)} placeholder="Stage name" className="w-full px-4 py-3 border rounded-lg mb-4" />
          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Save</button>
            <button type="button" onClick={() => setStageModal(false)} className="flex-1 bg-gray-300 py-3 rounded-lg">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
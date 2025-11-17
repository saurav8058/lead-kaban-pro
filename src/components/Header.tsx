import { useKanban } from '../context/kanbanContext';
import { exportToCSV } from '../utils/csvExport';

export default function Header() {
  const { setLeadModal, setStageModal, stages } = useKanban();

  return (
    <div className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Lead Management Kanban</h1>
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => setLeadModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add Lead
          </button>
          <button onClick={() => setStageModal(true)} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            + Add Stage
          </button>
          <button onClick={() => exportToCSV(stages)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
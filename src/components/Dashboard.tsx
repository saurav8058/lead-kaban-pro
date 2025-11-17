import { useKanban } from '../context/kanbanContext';

export default function Dashboard() {
  const { stages, agents } = useKanban();
  const totalLeads = stages.reduce((acc, s) => acc + s.leads.length, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700">Total Leads</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">{totalLeads}</p>
      </div>
      {stages.map(stage => (
        <div key={stage.id} className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">{stage.name}</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{stage.leads.length}</p>
        </div>
      ))}
      <div className="bg-white p-6 rounded-xl shadow-sm col-span-full">
        <h3 className="text-lg font-semibold mb-4">Leads by Agent</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {agents.map(agent => {
            const count = stages.flatMap(s => s.leads).filter(l => l.agent === agent).length;
            return (
              <div key={agent} className="text-center">
                <p className="font-medium">{agent}</p>
                <p className="text-2xl font-bold text-gray-700">{count}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
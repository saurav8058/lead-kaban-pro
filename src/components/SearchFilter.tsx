import { useKanban } from '../context/kanbanContext';

export default function SearchFilter() {
  const { search, setSearch, filterStage, setFilterStage, filterAgent, setFilterAgent, stages, agents } = useKanban();

  return (
    <div className="bg-white p-4 shadow-sm rounded-lg flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Search leads..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="px-4 py-2 border rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select value={filterStage} onChange={e => setFilterStage(e.target.value)} className="px-4 py-2 border rounded-lg">
        <option value="">All Stages</option>
        {stages.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <select value={filterAgent} onChange={e => setFilterAgent(e.target.value)} className="px-4 py-2 border rounded-lg">
        <option value="">All Agents</option>
        {agents.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
    </div>
  );
}
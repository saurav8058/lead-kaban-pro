import { useEffect, useState } from 'react';
import { useKanban } from '../context/kanbanContext';

export default function LeadModal() {
  const { leadModal, setLeadModal, editingLead, agents, stages, setStages } = useKanban();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', notes: '', agent: agents[0], priority: 'Medium'
  });

  useEffect(() => {
    if (editingLead) setForm(editingLead);
    else setForm({ name: '', email: '', phone: '', notes: '', agent: agents[0], priority: 'Medium' });
  }, [editingLead, agents]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLead) {
      setStages(prev => prev.map(stage => ({
        ...stage,
        leads: stage.leads.map(l => l.id === editingLead.id ? { ...l, ...form } : l)
      })));
    } else {
      setStages(prev => {
        const copy = [...prev];
        copy[0].leads.unshift({ ...form, id: Date.now().toString() });
        return copy;
      });
    }
    setLeadModal(false);
  };

  if (!leadModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{editingLead ? 'Edit' : 'Add'} Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          <textarea placeholder="Notes" rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          <select value={form.agent} onChange={e => setForm({ ...form, agent: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
            {agents.map(a => <option key={a}>{a}</option>)}
          </select>
          <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
            <option>High</option><option>Medium</option><option>Low</option>
          </select>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Save</button>
            <button type="button" onClick={() => setLeadModal(false)} className="flex-1 bg-gray-300 py-3 rounded-lg hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
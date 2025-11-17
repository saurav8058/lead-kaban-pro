import { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const KanbanContext = createContext();

const initialStages = [
  { id: '1', name: 'New Lead', leads: [] },
  { id: '2', name: 'Contacted', leads: [] },
  { id: '3', name: 'Qualified', leads: [] },
  { id: '4', name: 'Won', leads: [] },
  { id: '5', name: 'Lost', leads: [] },
];

const agents = ['John', 'Priya', 'Ahmed', 'Sarah', 'Mike'];

export const KanbanProvider = ({ children }) => {
  const [stages, setStages] = useLocalStorage('kanban_stages', initialStages);
  const [search, setSearch] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [filterAgent, setFilterAgent] = useState('');
  const [leadModal, setLeadModal] = useState(false);
  const [stageModal, setStageModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [editingStage, setEditingStage] = useState(null);

  const moveLead = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    setStages(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const srcStage = copy.find(s => s.id === source.droppableId);
      const destStage = copy.find(s => s.id === destination.droppableId);
      const [moved] = srcStage.leads.splice(source.index, 1);
      destStage.leads.splice(destination.index, 0, moved);
      return copy;
    });
  };

  const filteredStages = stages.map(stage => ({
    ...stage,
    leads: stage.leads.filter(lead =>
      lead.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filterStage || stage.id === filterStage) &&
      (!filterAgent || lead.agent === filterAgent)
    )
  }));

  const value = {
    stages, filteredStages, agents, search, setSearch, filterStage, setFilterStage, filterAgent, setFilterAgent,
    leadModal, setLeadModal, stageModal, setStageModal, editingLead, setEditingLead, editingStage, setEditingStage,
    setStages, moveLead
  };

  return <KanbanContext.Provider value={value}>{children}</KanbanContext.Provider>;
};

export const useKanban = () => useContext(KanbanContext);
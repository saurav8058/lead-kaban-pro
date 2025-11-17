import { KanbanProvider } from './context/kanbanContext';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import Board from './components/Board';
import Dashboard from './components/Dashboard';
import LeadModal from './components/LeadModal';
import StageModal from './components/StageModal';

function App() {
  return (
    <KanbanProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <SearchFilter />
          <Board />
          <Dashboard />
        </div>
        <LeadModal />
        <StageModal />
      </div>
    </KanbanProvider>
  );
}

export default App;
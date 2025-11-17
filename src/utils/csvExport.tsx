export const exportToCSV = (stages) => {
  const headers = ['Name', 'Email', 'Phone', 'Stage', 'Agent', 'Priority', 'Notes'];
  const rows = stages.flatMap(stage =>
    stage.leads.map(lead => [
      lead.name,
      lead.email || '',
      lead.phone || '',
      stage.name,
      lead.agent,
      lead.priority || 'Medium',
      (lead.notes || '').replace(/\n/g, ' ')
    ])
  );

  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
};
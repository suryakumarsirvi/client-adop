import { HasPermission } from '@/components/auth/HasPermission';
import { toast } from 'sonner';

export default function FlowsManagement() {
  const dummyFlows = [
    { id: 1, name: 'Onboarding Tour v1', steps: 5, status: 'Active' },
    { id: 2, name: 'Feature Callout - Billing Settings', steps: 2, status: 'Draft' },
    { id: 3, name: 'Hotspot Integration - Help Desk', steps: 1, status: 'Active' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Flows Management</h1>
          <p className="text-zinc-500 text-sm">Create and target widgets across client applications.</p>
        </div>
        
        <HasPermission
          perform="flow:create"
          fallback={
            <button
              onClick={() => toast.error('You do not have flow:create permission!')}
              className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 rounded-lg text-sm font-semibold cursor-not-allowed border border-brand-border"
            >
              Create Flow (Restricted)
            </button>
          }
        >
          <button
            onClick={() => toast.success('Starting Flow Editor wizard...')}
            className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition cursor-pointer shadow-md"
          >
            + Create New Flow
          </button>
        </HasPermission>
      </div>

      <div className="bg-brand-card rounded-xl border border-brand-border overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-brand-border bg-brand-bg text-zinc-500 font-semibold">
              <th className="p-4">Flow Name</th>
              <th className="p-4">Total Steps</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyFlows.map((flow) => (
              <tr key={flow.id} className="border-b border-brand-border hover:bg-brand-bg/50 transition">
                <td className="p-4 font-bold">{flow.name}</td>
                <td className="p-4 text-zinc-500">{flow.steps} steps</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    flow.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {flow.status}
                  </span>
                </td>
                <td className="p-4 text-right flex gap-2 justify-end">
                  <HasPermission perform="flow:edit">
                    <button
                      onClick={() => toast.success(`Editing flow: ${flow.name}`)}
                      className="px-3 py-1 rounded border border-brand-border hover:bg-brand-bg transition text-xs font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                  </HasPermission>

                  <HasPermission perform="flow:delete">
                    <button
                      onClick={() => toast.success(`Deleted flow: ${flow.name}`)}
                      className="px-3 py-1 rounded bg-red-500/10 text-red-600 hover:bg-red-500/20 transition text-xs font-semibold cursor-pointer"
                    >
                      Delete
                    </button>
                  </HasPermission>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

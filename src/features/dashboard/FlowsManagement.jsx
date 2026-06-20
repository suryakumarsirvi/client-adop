import { HasPermission } from '@/components/auth/HasPermission';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Copy,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function FlowsManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const dummyFlows = [
    { id: 1, name: 'Onboarding Tour v1', steps: 5, status: 'Active' },
    { id: 2, name: 'Feature Callout - Billing Settings', steps: 2, status: 'Draft' },
    { id: 3, name: 'Hotspot Integration - Help Desk', steps: 1, status: 'Active' },
    { id: 4, name: 'User Profile Walkthrough', steps: 4, status: 'Archived' },
  ];

  // Filter flows based on search
  const filteredFlows = dummyFlows.filter(flow =>
    flow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const variants = {
      Active: { variant: 'default', label: 'Active' },
      Draft: { variant: 'secondary', label: 'Draft' },
      Archived: { variant: 'destructive', label: 'Archived' },
    };
    const config = variants[status] || { variant: 'outline', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* Header with Search and Create */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Flows Management</h1>
          <p className="text-muted-foreground text-sm">Create and target widgets across client applications.</p>
        </div>

        <HasPermission
          perform="flow:create"
          fallback={
            <Button
              variant="outline"
              disabled
              className="cursor-not-allowed opacity-60"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Flow (Restricted)
            </Button>
          }
        >
          <Button onClick={() => toast.success('Starting Flow Editor wizard...')}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Flow
          </Button>
        </HasPermission>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search flows..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Flows Table */}
      <Card className="border shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-[45%] font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Flow Name
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Total Steps
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-right font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFlows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No flows found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredFlows.map((flow) => (
                  <TableRow key={flow.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="font-medium">{flow.name}</TableCell>
                    <TableCell>{flow.steps} steps</TableCell>
                    <TableCell>{getStatusBadge(flow.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <HasPermission perform="flow:edit">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toast.success(`Editing flow: ${flow.name}`)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </HasPermission>

                        <HasPermission perform="flow:delete">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => toast.success(`Deleted flow: ${flow.name}`)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </HasPermission>

                        {/* Extra action: Duplicate (always visible for demo) */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toast.info(`Duplicating flow: ${flow.name}`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="text-xs text-muted-foreground">
        Showing {filteredFlows.length} of {dummyFlows.length} flows
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
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
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Key,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { HasPermission } from '@/components/auth/HasPermission';

// Mock data – replace with actual API calls
const mockKeys = [
  {
    id: '1',
    name: 'Production SDK Key',
    prefix: 'pk_live_',
    key: 'pk_live_51H7d9eK3VpRz2y7k4n8j1w6a9b3c0d5e7f2g4h6j8k0l2m4n6p8q0r2s4t6u8v0',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    lastUsed: '2024-02-20T14:22:00Z',
  },
  {
    id: '2',
    name: 'Test Environment Key',
    prefix: 'pk_test_',
    key: 'pk_test_51H7d9eK3VpRz2y7k4n8j1w6a9b3c0d5e7f2g4h6j8k0l2m4n6p8q0r2s4t6u8v0',
    status: 'active',
    createdAt: '2024-02-01T09:00:00Z',
    lastUsed: '2024-02-19T11:45:00Z',
  },
  {
    id: '3',
    name: 'Archived Key',
    prefix: 'pk_live_',
    key: 'pk_live_51H7d9eK3VpRz2y7k4n8j1w6a9b3c0d5e7f2g4h6j8k0l2m4n6p8q0r2s4t6u8v0',
    status: 'revoked',
    createdAt: '2023-12-10T16:00:00Z',
    lastUsed: '2024-01-05T08:10:00Z',
  },
];

const CreateApiKey = () => {
  const [keys, setKeys] = useState(mockKeys);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPrefix, setNewKeyPrefix] = useState('pk_live_');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedKey, setGeneratedKey] = useState(null);
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Handlers
  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a name for the key.');
      return;
    }
    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      const newKey = {
        id: Date.now().toString(),
        name: newKeyName,
        prefix: newKeyPrefix,
        key: `${newKeyPrefix}${Math.random().toString(36).substring(2, 36)}${Math.random().toString(36).substring(2, 36)}`,
        status: 'active',
        createdAt: new Date().toISOString(),
        lastUsed: null,
      };
      setGeneratedKey(newKey);
      setIsGenerating(false);
      // We'll show the key in a dialog or inline. Let's close the create dialog and show the key in a separate view.
      setIsCreateDialogOpen(false);
      // Add to list (but we want to show the key only once)
      setKeys([newKey, ...keys]);
      toast.success('API key generated successfully!');
    }, 1000);
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard!');
  };

  const handleRevokeKey = (id) => {
    setKeys(keys.map(k => k.id === id ? { ...k, status: 'revoked' } : k));
    toast.success('Key revoked successfully.');
  };

  const handleDeleteKey = (id) => {
    setKeys(keys.filter(k => k.id !== id));
    setIsDeleteDialogOpen(false);
    setKeyToDelete(null);
    toast.success('Key permanently deleted.');
  };

  const openDeleteDialog = (id) => {
    setKeyToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return <Badge variant="default" className="gap-1"><CheckCircle2 className="h-3 w-3" /> Active</Badge>;
    }
    return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Revoked</Badge>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return format(new Date(dateString), 'MMM d, yyyy HH:mm');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight">API Keys</h1>
          <p className="text-muted-foreground text-sm">
            Manage SDK authentication keys for your adoption platform.
          </p>
        </div>
        <HasPermission perform="api:create">
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Generate New Key
          </Button>
        </HasPermission>
      </div>

      {/* Keys List */}
      <Card className="border shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Name</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Prefix</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Created</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Last Used</TableHead>
                <TableHead className="text-right font-semibold text-xs uppercase tracking-wider text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No API keys found. Generate your first key to get started.
                  </TableCell>
                </TableRow>
              ) : (
                keys.map((key) => (
                  <TableRow key={key.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="font-medium">{key.name}</TableCell>
                    <TableCell>
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">{key.prefix}</code>
                    </TableCell>
                    <TableCell>{getStatusBadge(key.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(key.createdAt)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(key.lastUsed)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {key.status === 'active' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleCopyKey(key.key)}
                              title="Copy key"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <HasPermission perform="api:revoke">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                onClick={() => handleRevokeKey(key.id)}
                                title="Revoke key"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </HasPermission>
                          </>
                        )}
                        <HasPermission perform="api:delete">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => openDeleteDialog(key.id)}
                            title="Delete key (permanent)"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </HasPermission>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Key Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-light text-2xl">Generate New API Key</DialogTitle>
            <DialogDescription>
              Name your key to identify it later. Choose the environment prefix.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="keyName">Key Name</Label>
              <Input
                id="keyName"
                placeholder="e.g. Production SDK Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keyPrefix">Environment</Label>
              <select
                id="keyPrefix"
                value={newKeyPrefix}
                onChange={(e) => setNewKeyPrefix(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="pk_live_">Live (pk_live_)</option>
                <option value="pk_test_">Test (pk_test_)</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateKey} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Key'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-light text-2xl">Confirm Deletion</DialogTitle>
            <DialogDescription>
              This action is irreversible. The API key will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDeleteKey(keyToDelete)}
            >
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateApiKey;
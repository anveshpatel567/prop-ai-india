
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAiRules } from '@/hooks/useAiRules';
import { Loader2, Plus, Shield } from 'lucide-react';

export function AiRuleManagerPanel() {
  const { rules, loading, createAiRule, toggleRule } = useAiRules();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    rule_name: '',
    target_module: '',
    rule_condition: '',
    action: ''
  });

  const handleCreateRule = async () => {
    if (!newRule.rule_name || !newRule.target_module || !newRule.rule_condition || !newRule.action) {
      return;
    }

    await createAiRule(
      newRule.rule_name,
      newRule.target_module,
      newRule.rule_condition,
      newRule.action
    );

    setNewRule({
      rule_name: '',
      target_module: '',
      rule_condition: '',
      action: ''
    });
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          AI Rule Manager
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New AI Rule</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="rule_name">Rule Name</Label>
                <Input
                  id="rule_name"
                  value={newRule.rule_name}
                  onChange={(e) => setNewRule({ ...newRule, rule_name: e.target.value })}
                  placeholder="Enter rule name"
                />
              </div>
              <div>
                <Label htmlFor="target_module">Target Module</Label>
                <Input
                  id="target_module"
                  value={newRule.target_module}
                  onChange={(e) => setNewRule({ ...newRule, target_module: e.target.value })}
                  placeholder="Enter target module"
                />
              </div>
              <div>
                <Label htmlFor="rule_condition">Rule Condition</Label>
                <Textarea
                  id="rule_condition"
                  value={newRule.rule_condition}
                  onChange={(e) => setNewRule({ ...newRule, rule_condition: e.target.value })}
                  placeholder="Enter rule condition"
                />
              </div>
              <div>
                <Label htmlFor="action">Action</Label>
                <Input
                  id="action"
                  value={newRule.action}
                  onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
                  placeholder="Enter action to take"
                />
              </div>
              <Button onClick={handleCreateRule} className="w-full">
                Create Rule
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {rules.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No AI rules configured yet.
              </p>
            ) : (
              rules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{rule.rule_name}</h3>
                      <Badge variant={rule.enabled ? "default" : "secondary"}>
                        {rule.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Target: {rule.target_module}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Condition: {rule.rule_condition}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Action: {rule.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(rule.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={(checked) => toggleRule(rule.id, checked)}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

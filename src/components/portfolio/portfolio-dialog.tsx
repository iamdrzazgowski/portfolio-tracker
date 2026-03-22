import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Portfolio } from '@/types/portfolio';

interface PortfolioDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingPortfolio: Portfolio | null;
}

export function PortfolioDialog({
    open,
    onOpenChange,
    editingPortfolio,
}: PortfolioDialogProps) {
    const isEditing = editingPortfolio !== null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Portfolio' : 'Create Portfolio'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? 'Make changes to your portfolio here.'
                            : 'Add a new portfolio to organize your investments.'}
                    </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid gap-2'>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                            id='name'
                            placeholder='e.g., Long-term Investments'
                            defaultValue={editingPortfolio?.name}
                            className='border-border/50 bg-secondary'
                        />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea
                            id='description'
                            placeholder='Describe the purpose of this portfolio...'
                            defaultValue={editingPortfolio?.description}
                            className='border-border/50 bg-secondary resize-none'
                            rows={3}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant='outline'
                        onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => onOpenChange(false)}>
                        {isEditing ? 'Save Changes' : 'Create Portfolio'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

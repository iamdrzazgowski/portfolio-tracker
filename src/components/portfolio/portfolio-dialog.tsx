'use client';

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
import { useForm } from 'react-hook-form';
import { useEffect, useTransition } from 'react';
import {
    createPortfolioAction,
    updatePortfolioAction,
} from '@/actions/portfolio';
import Spinner from '../ui/spinner';
import { useRouter } from 'next/navigation';

interface PortfolioDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingPortfolio: Portfolio | null;
}

type FormValues = {
    name: string;
    description?: string;
};

export function PortfolioDialog({
    open,
    onOpenChange,
    editingPortfolio,
}: PortfolioDialogProps) {
    const isEditing = editingPortfolio !== null;
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            description: '',
        },
    });

    useEffect(() => {
        if (editingPortfolio) {
            reset({
                name: editingPortfolio.name,
                description: editingPortfolio.description || '',
            });
        } else {
            reset({
                name: '',
                description: '',
            });
        }
    }, [editingPortfolio, reset]);

    const onSubmit = (data: FormValues) => {
        startTransition(async () => {
            try {
                if (isEditing && editingPortfolio) {
                    await updatePortfolioAction({
                        id: editingPortfolio.id,
                        ...data,
                    });
                } else {
                    await createPortfolioAction(data);
                }

                onOpenChange(false);
                reset();
                router.refresh();
            } catch (err) {
                console.error(err);
            }
        });
    };

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='name'>Name</Label>
                            <Input
                                id='name'
                                placeholder='e.g., Long-term Investments'
                                className='border-border/50 bg-secondary'
                                {...register('name', {
                                    required: 'Name is required',
                                })}
                            />
                            {errors.name && (
                                <p className='text-sm text-red-500'>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='description'>Description</Label>
                            <Textarea
                                id='description'
                                placeholder='Describe the purpose of this portfolio...'
                                className='border-border/50 bg-secondary resize-none'
                                rows={3}
                                {...register('description')}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant='outline'
                            onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => onOpenChange(false)}
                            disabled={isPending}>
                            {isPending ? (
                                <Spinner />
                            ) : isEditing ? (
                                'Save Changes'
                            ) : (
                                'Create Portfolio'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

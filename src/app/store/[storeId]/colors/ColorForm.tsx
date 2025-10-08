import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'

import { useCreateColor } from '@/hooks/queries/colors/useCreateColor'
import { useDeleteColor } from '@/hooks/queries/colors/useDeleteColor'
import { useUpdateColor } from '@/hooks/queries/colors/useUpdateColor'

import { IColor, IColorInput } from '@/shared/types/color.interface'

import styles from '../Store.module.scss'

interface ColorFormProps {
	color?: IColor
}

export function ColorForm({ color }: ColorFormProps) {
	const { createColor, isLoadingCreate } = useCreateColor()
	const { updateColor, isLoadingUpdate } = useUpdateColor()
	const { deleteColor, isLoadingDelete } = useDeleteColor()

	const title = color ? 'Edit Data' : 'Create Color'
	const description = color ? 'Edit Color Data' : 'Add New Color to Store'
	const action = color ? 'Save' : 'Create'

	const form = useForm<IColorInput>({
		mode: 'onChange',
		values: {
			name: color?.name ?? '', // используем ?? для null/undefined
			value: color?.value ?? ''
		}
	})

	const onSubmit: SubmitHandler<IColorInput> = data => {
		if (color) updateColor(data)
		else createColor(data)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{color && (
					<ConfirmModal handleClick={() => deleteColor()}>
						<Button
							size='icon'
							variant='primary'
							disabled={isLoadingDelete}
						>
							<Trash className='size-4' />
						</Button>
					</ConfirmModal>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name='name'
							rules={{
								required: 'Name is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder='Color Name'
											disabled={
												isLoadingCreate ||
												isLoadingUpdate
											}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='value'
							rules={{
								required: 'Value is required'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Value</FormLabel>
									<FormControl>
										<Input
											placeholder='Color Value'
											disabled={
												isLoadingCreate ||
												isLoadingUpdate
											}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						variant='primary'
						disabled={isLoadingCreate || isLoadingUpdate}
					>
						{action}
					</Button>
				</form>
			</Form>
		</div>
	)
}

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'

import { PUBLIC_URL } from '@/config/url.config'

import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'

import { formatPrice } from '@/utils/string/format-price'

import styles from './HeaderCart.module.scss'
import { CartItem } from './cart-item/CartItem'
import { useCheckout } from './useCheckout'

export function HeaderCart() {
	const router = useRouter()

	const { createPayment, isLoadingCreate } = useCheckout()
	const { user } = useProfile()

	const { items, total } = useCart()

	const handleClick = () => {
		user ? createPayment() : router.push(PUBLIC_URL.auth())
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost'>Cart</Button>
			</SheetTrigger>
			<SheetContent className={styles.cart}>
				<Heading title='Shopping Cart' className='text-xl' />
				<div className={styles.items}>
					{items.length ? (
						items.map(item => (
							<CartItem item={item} key={item.id} />
						))
					) : (
						<div className={styles.not_found}>
							Your cart is empty!
						</div>
					)}
				</div>
				{items.length ? (
					<>
						<div className={styles.total}>
							Total: {formatPrice(total)}
						</div>
						<Button
							onClick={handleClick}
							variant='primary'
							disabled={isLoadingCreate}
						>
							Proceed to Checkout
						</Button>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	)
}

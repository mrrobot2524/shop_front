import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Store } from './Store'

export const metadata: Metadata = {
	title: 'Store Management',
	...NO_INDEX_PAGE
}

export default function StorePage() {
	return <Store />
}

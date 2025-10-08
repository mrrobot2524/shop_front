import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { productService } from '@/services/product.service'

import { Product } from './Product'

export const revalidate = 60

export async function generateStaticParams() {
	const products = await productService.getAll()

	return products.map(product => ({
		params: { id: product.id }
	}))
}

async function getProducts(params: { id: string }) {
	try {
		const product = await productService.getById(params.id)

		if (!product) return notFound() // Если продукта нет, возвращаем 404

		const similarProducts = await productService.getSimilar(params.id)
		return { product, similarProducts }
	} catch {
		return notFound()
	}
}

export async function generateMetadata({
	params
}: {
	params: { id: string }
}): Promise<Metadata> {
	const { product } = await getProducts(params)

	// Если вдруг product null (на всякий случай), вернуть fallback
	if (!product) {
		return {
			title: 'Product not found',
			description: 'This product does not exist'
		}
	}

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: [
				{
					url: product.images?.[0] || '/default-image.png',
					width: 1000,
					height: 1000,
					alt: product.title
				}
			]
		}
	}
}

export default async function ProductPage({
	params
}: {
	params: { id: string }
}) {
	const { product, similarProducts } = await getProducts(params)

	// Проверка на null, хотя getProducts уже отдает notFound, лишняя страховка
	if (!product) return <div>Product not found</div>

	return (
		<Product
			initialProduct={product}
			similarProducts={similarProducts}
			id={params.id}
		/>
	)
}

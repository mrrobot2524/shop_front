'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'
import { useGetColors } from '@/hooks/queries/colors/useGetColors'

import { productService } from '@/services/product.service'

import { ProductForm } from '../ProductForm'

export function ProductEdit() {
	const params = useParams<{ productId: string }>()

	// Получаем продукт
	const { data: product, isLoading: isProductLoading } = useQuery({
		queryKey: ['product', params.productId],
		queryFn: () => productService.getById(params.productId)
	})

	const { categories } = useGetCategories()
	const { colors } = useGetColors()

	// Пока продукт загружается
	if (isProductLoading) {
		return <div>Loading product...</div>
	}

	// Если продукта нет
	if (!product) {
		return <div>Product not found</div>
	}

	return (
		<ProductForm
			product={product} // TypeScript знает, что это точно IProduct
			categories={categories || []}
			colors={colors || []}
		/>
	)
}

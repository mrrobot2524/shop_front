import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IProduct, IProductInput } from '@/shared/types/product.interface'

class ProductService {
	// Получить все продукты (с поиском)
	async getAll(searchTerm?: string | null): Promise<IProduct[]> {
		try {
			const { data } = await axiosClassic<IProduct[]>({
				url: API_URL.products(),
				method: 'GET',
				params: searchTerm ? { searchTerm } : {}
			})
			return Array.isArray(data) ? data : []
		} catch (error) {
			console.error('Failed to fetch all products:', error)
			return []
		}
	}

	// Получить продукты по ID магазина
	async getByStoreId(id: string): Promise<IProduct[]> {
		try {
			const { data } = await axiosWithAuth<IProduct[]>({
				url: API_URL.products(`/by-storeId/${id}`),
				method: 'GET'
			})
			return Array.isArray(data) ? data : []
		} catch (error) {
			console.error(`Failed to fetch products for storeId ${id}:`, error)
			return []
		}
	}

	// Получить продукт по ID
	async getById(id: string): Promise<IProduct | null> {
		try {
			const { data } = await axiosClassic<IProduct>({
				url: API_URL.products(`/by-id/${id}`),
				method: 'GET'
			})
			return data || null
		} catch (error) {
			console.error(`Failed to fetch product by id ${id}:`, error)
			return null
		}
	}

	// Получить продукты по категории
	async getByCategory(categoryId: string): Promise<IProduct[]> {
		try {
			const { data } = await axiosClassic<IProduct[]>({
				url: API_URL.products(`/by-category/${categoryId}`),
				method: 'GET'
			})
			return Array.isArray(data) ? data : []
		} catch (error) {
			console.error(
				`Failed to fetch products by category ${categoryId}:`,
				error
			)
			return []
		}
	}

	// Получить самые популярные продукты
	async getMostPopular(): Promise<IProduct[]> {
		try {
			const { data } = await axiosClassic<IProduct[]>({
				url: API_URL.products('/most-popular'),
				method: 'GET'
			})
			return Array.isArray(data) ? data : []
		} catch (error) {
			console.error('Failed to fetch most popular products:', error)
			return []
		}
	}

	// Получить похожие продукты
	async getSimilar(id: string): Promise<IProduct[]> {
		try {
			const { data } = await axiosClassic<IProduct[]>({
				url: API_URL.products(`/similar/${id}`),
				method: 'GET'
			})
			return Array.isArray(data) ? data : []
		} catch (error) {
			console.error(
				`Failed to fetch similar products for id ${id}:`,
				error
			)
			return []
		}
	}

	// Создать продукт
	async create(
		data: IProductInput,
		storeId: string
	): Promise<IProduct | null> {
		try {
			const { data: createdProduct } = await axiosWithAuth<IProduct>({
				url: API_URL.products(`/${storeId}`),
				method: 'POST',
				data
			})
			return createdProduct || null
		} catch (error) {
			console.error('Failed to create product:', error)
			return null
		}
	}

	// Обновить продукт
	async update(id: string, data: IProductInput): Promise<IProduct | null> {
		try {
			const { data: updatedProduct } = await axiosWithAuth<IProduct>({
				url: API_URL.products(`/${id}`),
				method: 'PUT',
				data
			})
			return updatedProduct || null
		} catch (error) {
			console.error(`Failed to update product ${id}:`, error)
			return null
		}
	}

	// Удалить продукт
	async delete(id: string): Promise<IProduct | null> {
		try {
			const { data: deletedProduct } = await axiosWithAuth<IProduct>({
				url: API_URL.products(`/${id}`),
				method: 'DELETE'
			})
			return deletedProduct || null
		} catch (error) {
			console.error(`Failed to delete product ${id}:`, error)
			return null
		}
	}
}

export const productService = new ProductService()

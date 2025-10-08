'use client'

import { FaYandex } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/Button'

import { SERVER_URL } from '@/config/api.config'

import styles from './Auth.module.scss'

export function Social() {
	return (
		<div className={styles.social}>
			<Button
				variant='outline'
				onClick={() =>
					(window.location.href = `${SERVER_URL}/auth/google`)
				}
			>
				<FcGoogle />
				Continue with Google
			</Button>
			<Button
				variant='outline'
				onClick={() =>
					(window.location.href = `${SERVER_URL}/auth/yandex`)
				}
			>
				<FaYandex color='#FC3F1D' />
				Continue with Yandex
			</Button>
		</div>
	)
}

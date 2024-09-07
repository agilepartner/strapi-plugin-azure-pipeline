import { useEffect, useState } from 'react'
import axios from '../utils/axiosInstance'

interface FetchDataProps {
	url: string
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

interface ErrorDetails {
	message: string
	type: string
}

interface FetchDataReturn {
	fetchedData: Record<string, any>
	isLoading: boolean
	errors: ErrorDetails | null
	setRefetch: React.Dispatch<React.SetStateAction<{}>>
}

export default function useFetchData({ url, method }: FetchDataProps): FetchDataReturn {
	const [fetchedData, setFetchedData] = useState<Record<string, any>>({})
	const [errors, setErrors] = useState<ErrorDetails | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [refetch, setRefetch] = useState<{}>({})

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response = await axios(url, { method })
				setFetchedData(response.data)
			} catch (err: any) {
				console.log(err)
				setErrors({
					message: err.response.data.error.message,
					type: err.response.data.error.details.type,
				})
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [url, method, refetch])

	return { fetchedData, isLoading, errors, setRefetch }
}

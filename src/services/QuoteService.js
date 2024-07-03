import api from './apiinstance'

const getAll = async (data) => {
  const response = await api.get(`/get?start_date=2024-06-01T00:00:00.000Z&end_date=2024-07-10T10:00:00.000Z`)
  return response.data
}

const getOne = async (data) => {
  const response = await api.get(`/get_single_quote/${data}`)
  return response.data
}

const createQuote = async (data) => {
  const response = await api.post(`/create`, data)
  return response.data
}

const editQuote = async (data) => {
  const response = await api.post(`/edit/${data.id}`, data)
  return response.data
}





export const QuoteService = {
  getAll,
  getOne,
  createQuote,
  editQuote,
}

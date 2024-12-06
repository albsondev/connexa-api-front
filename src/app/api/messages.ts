import api from './axiosInstance'

interface MessagePayload {
  phone: string;
  data: Record<string, unknown>;
}

export const sendMessage = async (
  endpoint: string,
  payload: MessagePayload,
): Promise<any> => {
  try {
    const response = await api.post(endpoint, payload)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao enviar mensagem')
  }
}

export const sendTextMessage = (phone: string, text: string) => sendMessage('/message/text', { phone, data: { text } })

export const sendImageMessage = (phone: string, text: string, url: string) => sendMessage('/message/image', { phone, data: { text, url } })

export const sendVideoMessage = (phone: string, url: string) => sendMessage('/message/video', { phone, data: { url } })

export const sendAudioMessage = (phone: string, url: string, ptt: boolean = false) => sendMessage('/message/audio', { phone, data: { url, ptt } })

export const sendDocumentMessage = (phone: string, url: string) => sendMessage('/message/document', { phone, data: { url } })

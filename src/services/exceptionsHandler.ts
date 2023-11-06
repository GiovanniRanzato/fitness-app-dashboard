import { AxiosError } from "axios";


export function handleException(exception: any) {
  if (exception instanceof AxiosError)
    return handleAxiosException(exception)
  return exception.message ?? 'Eccezione sconosciuta'
}

function handleAxiosException(exception: AxiosError) {
  if (!exception || !exception.response || !exception.response.data || typeof exception.response.data !== 'object' || !('message' in exception.response.data))  {
    return 'Errore sconosciuto';
  }
  return exception.response.data.message
}

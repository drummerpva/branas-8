import axios from 'axios'
import { HttpClient } from './HttpClient'

export class AxiosAdapter implements HttpClient {
  async get(url: string): Promise<any> {
    const { data } = await axios.get(url)
    return data
  }

  async post(url: string, body: any): Promise<any> {
    const { data } = await axios.post(url, body)
    return data
  }
}

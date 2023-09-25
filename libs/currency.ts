import axios, { AxiosRequestConfig } from 'axios';

export interface ICurrencyOption {
  value: number | undefined;
  label: string | undefined;
}

export const DefaultCurrencyOption: ICurrencyOption = {value: 1, label: 'EUR'}

export function loadCurrencies(): Promise<ICurrencyOption[]> {
  return new Promise(
    (resolve, reject) => {
      let data = null
      let apicall = `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.APIKEY}`

      data = axios.get(apicall)
      
      data.then(
        (response) => {
          const labels: string[] = Object.keys(response.data.rates)
          const values: number[] = Object.values(response.data.rates)
          const currencies: ICurrencyOption[] = []

          for (let i = 0; i < labels.length; i++) {
            currencies.push({
              label: labels[i],
              value: values[i]
            })

          }
          resolve([...currencies])
          
        }
      )
        .catch(
          (error: Error) => {
            console.log(error)
            console.log('Probando con https://api.exchangerate.host/latest...')
            apicall = 'https://api.exchangerate.host/latest'
            return axios.get(apicall)
          }
        )
    }
  )

}
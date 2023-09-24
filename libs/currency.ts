import axios from 'axios';

export interface ICurrencyOption {
  value: number;
  label: string;
}

export function loadCurrencies() {
  const apicall = 'https://api.exchangerate.host/latest'
  //const apicall = `http://api.exchangeratesapi.io/v1/latest?access_key = ${process.env.APIKEY}`

  return new Promise(
    (resolve, reject) => {
      axios.get(apicall).then(
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
            reject(error)
          }
        )
    }
  )

}
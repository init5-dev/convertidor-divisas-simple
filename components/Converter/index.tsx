'use client'

import { useEffect, useState } from 'react';
import Select from 'react-select';
import { ICurrencyOption } from '@/libs/currency';
import styles from './styles.module.css'


export default function Converter({ currencies }) {

  const [toCurrencies, setToCurrencies] = useState<ICurrencyOption[]>([...currencies.filter((item: ICurrencyOption) => item.label !== currencies[0].label)]);
  const [fromCurrency, setFromCurrency] = useState<ICurrencyOption>(currencies[0])
  const [toCurrency, setToCurrency] = useState<ICurrencyOption>(toCurrencies[0])
  const [amount, setAmount] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);

  function convert(from: ICurrencyOption, to: ICurrencyOption): number {
    console.log(from.label + " " + from.value)
    console.log(to.label + " " + to.value)
    const amountInBase = amount * from.value
    return Number((amountInBase * to.value).toFixed(2))
  }

  function selectedFrom(e) {
    setFromCurrency({ ...e })
    setToCurrencies([...currencies.filter((item: ICurrencyOption) => item.label !== e.label)])
    setToCurrency({ ...toCurrencies[0] })
    setResult(null)
  }

  function selectedTo(e) {
    setToCurrency({ ...e })
    setResult(null)
  }

  function handleClick() {
    setResult(convert(fromCurrency, toCurrency))
  }

  return (
    <div className={styles.component}>
      <div className={styles.mainBox}>
        <div className={styles.inputGroup}>
          <label>Cantidad</label>
          <input className={styles.numericInput} type="number" step='0.5' value={amount} onChange={e => setAmount(Number(e.target.value))} />
        </div>

        <div className={styles.selectGroup}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>De</label>
            <Select className={styles.input} value={fromCurrency} options={currencies} onChange={selectedFrom} />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>A</label>
            <Select className={styles.input} value={toCurrency} options={toCurrencies} onChange={selectedTo} />
          </div>
        </div>

        <div className={styles.button} onClick={handleClick}>Convertir</div>
      </div>
      {
        result && <div className='my-6'>
          <div className='lg:text-xl text-gray-600'>{`${amount.toFixed(2)} ${fromCurrency.label}`}</div>
          <div className='lg:text-3xl'>{`= ${result} ${toCurrency.label}`}</div>
        </div>
      }
    </div>
  )
}
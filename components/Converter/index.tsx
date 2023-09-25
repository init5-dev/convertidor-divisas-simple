'use client'

import { useEffect, useState } from 'react';
import Select from 'react-select';
import { SingleValue, ActionMeta } from 'react-select';
import { ICurrencyOption, DefaultCurrencyOption } from '@/libs/currency';
import styles from './styles.module.css'


export default function Converter({ currencies }: { currencies: ICurrencyOption[] }) {

  const [toCurrencies, setToCurrencies] = useState<ICurrencyOption[]>([...currencies.filter((item: ICurrencyOption) => item.label !== currencies[0].label)]);
  const [fromCurrency, setFromCurrency] = useState<ICurrencyOption>(currencies[0])
  const [toCurrency, setToCurrency] = useState<ICurrencyOption>(toCurrencies[0])
  const [amount, setAmount] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);

  function convert(from: ICurrencyOption, to: ICurrencyOption): number {
    if (!from?.value) {
      return 0
    }

    if (!to?.value) {
      return 0
    }

    const amountInBase = amount * from?.value
    return Number((amountInBase * to?.value).toFixed(2))
  }

  function selectedFrom(newValue: SingleValue<ICurrencyOption>, actionMeta: ActionMeta<ICurrencyOption>) {
    let value: ICurrencyOption = { label: newValue?.label, value: newValue?.value }

    setFromCurrency(value)
    setToCurrencies([...currencies.filter((item: ICurrencyOption) => item.label !== value.label)])
    setToCurrency({ ...toCurrencies[0] })
    setResult(null)
  }

  function selectedTo(newValue: SingleValue<ICurrencyOption>, actionMeta: ActionMeta<ICurrencyOption>) {
    let value: ICurrencyOption = { label: newValue?.label, value: newValue?.value }
    setToCurrency({ ...value })
    setResult(null)
  }

  function handleClick() {
    setResult(convert(fromCurrency, toCurrency))
  }

  return (
    <div>
      <div className={styles.component}>
        <div className={styles.mainBox}>
          <div className={styles.inputGroup}>
            <label>Cantidad</label>
            <input className={styles.numericInput} type="number" step='0.5' value={amount} onChange={e => {setAmount(Number(e.target.value)); setResult(null)}} />
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

          <div className={styles.button} onClick={handleClick}>
            <button>Convertir</button>
          </div>
        </div>
      </div>
      {
        result && <div className={styles.resultBox}>
          <div className={styles.fromCurrency}>{`${amount.toFixed(2)} ${fromCurrency.label}`}</div>
          <div className={styles.toCurrency}>{`= ${result} ${toCurrency.label}`}</div>
        </div>
      }
    </div>
  )
}
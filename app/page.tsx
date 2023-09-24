import Image from 'next/image'
import { ICurrencyOption, loadCurrencies } from '@/libs/currency'
import Converter from '@/components/Converter'

export default async function Home() {

  const currencies = await loadCurrencies()

  return (
    <main className="font-mono text-sm flex min-h-screen max-w-full items-center justify-center">
      <Converter currencies={currencies} />
    </main>
  )
}

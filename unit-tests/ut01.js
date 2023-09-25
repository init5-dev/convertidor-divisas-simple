import { useState } from "react";
import Converter from '../components/Converter'

describe("Converter", () => {
  it("should convert a valid amount between two currencies", () => {
    const [amount, setAmount] = useState(100);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");

    const converter = (
      <Converter
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
    );

    setAmount(100);
    setFromCurrency("USD");
    setToCurrency("EUR");

    const result = converter.props.conversionResult;

    expect(result).toBe(95.38);
  });

  it("should not convert an invalid amount", () => {
    const [amount, setAmount] = useState(-100);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");

    const converter = (
      <Converter
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
    );

    setAmount(-100);
    setFromCurrency("USD");
    setToCurrency("EUR");

    const result = converter.props.conversionResult;

    expect(result).toBe(undefined);
  });

  it("should not convert an invalid currency", () => {
    const [amount, setAmount] = useState(100);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INVALID");

    const converter = (
      <Converter
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
    );

    setAmount(100);
    setFromCurrency("USD");
    setToCurrency("INVALID");

    const result = converter.props.conversionResult;

    expect(result).toBe(undefined);
  });
});

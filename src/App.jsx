import React, { useState } from 'react';

export default function App() {
  const [age, setAge] = useState(40);
  const [payment, setPayment] = useState(500000);
  const [years, setYears] = useState(2);
  const [maturity, setMaturity] = useState(90);
  const [withdrawStartAge, setWithdrawStartAge] = useState(65);
  const [withdrawEndAge, setWithdrawEndAge] = useState(85);
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const totalPaid = payment * years;
    const holdYears = maturity - age;
    const withdrawYears = withdrawEndAge - withdrawStartAge;

    const surrenderValue = Math.round(totalPaid * (1 + 0.05) ** holdYears);
    const deathBenefit = Math.round(totalPaid * (1 + 0.065) ** holdYears);
    const maxWithdraw = Math.floor(deathBenefit / withdrawYears);

    setResults({ totalPaid, surrenderValue, deathBenefit, maxWithdraw });
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>📊 보험 상품 수익률 & 인출 시뮬레이터</h1>
      <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
        <label>가입 나이 <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} /></label>
        <label>연간 납입금액 ($) <input type="number" value={payment} onChange={e => setPayment(Number(e.target.value))} /></label>
        <label>납입 기간 (년) <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} /></label>
        <label>만기 나이 <input type="number" value={maturity} onChange={e => setMaturity(Number(e.target.value))} /></label>
        <label>인출 시작 나이 <input type="number" value={withdrawStartAge} onChange={e => setWithdrawStartAge(Number(e.target.value))} /></label>
        <label>인출 종료 나이 <input type="number" value={withdrawEndAge} onChange={e => setWithdrawEndAge(Number(e.target.value))} /></label>
        <button onClick={handleCalculate}>계산하기</button>
      </div>

      {results && (
        <div style={{ marginTop: 30 }}>
          <h2>📈 계산 결과</h2>
          <p>총 납입금액: ${results.totalPaid.toLocaleString()}</p>
          <p>만기 해약환급금 (예상): ${results.surrenderValue.toLocaleString()}</p>
          <p>사망보험금 (예상): ${results.deathBenefit.toLocaleString()}</p>
          <p>최대 연간 인출 가능 금액: ${results.maxWithdraw.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

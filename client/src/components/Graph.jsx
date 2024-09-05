import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart } from 'chart.js';
import Labels from './Labels';
Chart.register(ArcElement);

function Graph({ transactions }) {
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.title === 'Income') {
        acc.income += transaction.amount;
      } else if (transaction.title === 'Expense') {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
  // const formatNumber = (num) => {
  //   return num.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  // };
  
  const netTotal = totals.income - totals.expense;
  const totalAmount = totals.income + totals.expense;

  const incomePercent = totals.income
const expensePercent = totals.expense
const netTotalPercent =  totalAmount


  const config = {
    data: {
      labels: ['Income', 'Expenses', 'Net Total'],
      datasets: [
        {
          data: [totals.income, totals.expense, netTotal],
          backgroundColor: [
            'rgb(75, 192, 162)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 5,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 85, // thickness
      plugins: {
        legend: {
          display: true, // Show legend with labels
          position: 'bottom',
        },
      },
    },
  };

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative w-full h-60">
          <Doughnut {...config} />
          <h3 className="mb-4 font-bold title">
            Net Total
            <span className="block text-3xl text-emerald-400">
              Rs.{netTotal}
            </span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          <Labels 
            data={[
              { type: 'Income', color: 'rgb(75, 192, 162)', percent: incomePercent },
              { type: 'Expense', color: 'rgb(255, 99, 132)', percent: expensePercent },
              { type: 'Net Total', color: 'rgb(54, 162, 235)', percent: netTotalPercent },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Graph;
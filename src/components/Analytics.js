import React, { useEffect, useState } from 'react'
import './Analytics.css'
import BarChartIcon from '@material-ui/icons/BarChart';
import ReactApexChart from 'react-apexcharts';
import { db } from '../Firebase';
import firebase from 'firebase';

function Analytics() {
    const userId = firebase.auth().currentUser.uid
    const [transactions, setTransactions] = useState([])
    const [expense, setExpense] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [income, setIncome] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [year, setYear] = useState()


    async function updateChart(){
        if (transactions.length !== 0) {
            console.log("In Update Chart")
            setExpense([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            setIncome([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])            
            transactions.forEach(data => {
                setYear(new Date(data.timestamp.toDate()).getFullYear())
                var index = new Date(data.timestamp.toDate()).getMonth() 
                var amount = parseInt(data.amount)
                if ( amount > 0 ){
                    income[index] = parseInt(income[index]) + amount
                }
                else{
                    expense[index] = Math.abs(parseInt(expense[index])) + Math.abs(amount)
                }
            })
            setExpense(expense)
            setIncome(income)
        }
    }

    useEffect(() => {
        db.collection('users')
        .doc(userId)
        .collection('transactions')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            setTransactions(
                snapshot.docs.map((doc) => 
                doc.data()
            ))
        });  
        updateChart()
    }, []);   

    

    const values = 
        {
        series: [{
            name: 'Expense',
            data: expense
          }, {
            name: 'Income',
            data: income
          },],
        options: {
            colors: ['#F00000', '#008000'],
            chart: {
                type: 'bar',
                height: 700
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '70%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            yaxis: {
                title: {
                    text: '₹ Rupees'
                }
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "₹ " + val 
                    }
                },
            },
        }
    }

    return (
        <div className="analytics">
            <div className="analytics__title">
                <h4>Analytics&nbsp;</h4>
                <BarChartIcon/>
            </div>
            <div className="analytics__chart">
                <h4>{year}</h4>
                <ReactApexChart options={values.options} series={values.series} type="bar" height={350} />
            </div>
        </div>
    )
}

export default Analytics

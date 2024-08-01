import React from "react";
import TransactionList from "../Transactions/TransactionList";
import FilterSection from "../Transactions/FilterSection";
import TransactionChart from "../Transactions/TransactionChart";

const Dashboard = () => {
    return (
        <>
            <TransactionChart />
            <FilterSection />
        </>
    );
};

export default Dashboard;
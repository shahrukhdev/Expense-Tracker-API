import { getTotalIncome, getTotalExpenses, getTotalBudget } from "../repositories/dashboard.repository.js";

const buildDashboardSummary = async (userId: string) => {

  const [
    income,
    expenses,
    budget,
    // savings
  ] = await Promise.all([
        getTotalIncome(userId),
        getTotalExpenses(userId),
        getTotalBudget(userId)
  ]);

    const savings = income - expenses;

    return {
        income: { total: income },
        expenses: { total: expenses },
        budget: { total: budget },
        savings: { total: savings }
    };

}

export default {
    buildDashboardSummary
};
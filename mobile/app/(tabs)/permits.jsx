import React from 'react';
import { SafeAreaView } from 'react-native';
import PermitForm from '../../components/forms/PermitForm';
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";
import { colors } from "../../styles/colors";
import PermitForm from '../../components/forms/PermitFormPage';
import PaymentHistory from '../../components/forms/PaymentHistory'; // Adjust the path as necessary

const App = () => {
  const [showPermitForm, setShowPermitForm] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      service: 'Building Permit',
      status: 'Pending', // Dummy status to make the button visible
    }
  ]);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  // Dummy data for transaction details
  const dummyTransaction = {
    issuedLast: '2024-08-20',
    startDate: '2024-08-01',
    endDate: '2024-08-30',
    amountPaid: 'Php 500.00',
    paidLast: '2024-08-25',
    officialReceiptNo: 'OR123456',
    approvedBy: 'Admin User',
  };

  // Dummy payment history data
  const dummyPaymentHistory = [
    { date: '2024-08-25', orNo: '', service: '', amount: 'Php 1500.00', total: true },
    { date: '2024-08-25', orNo: 'OR123456', service: 'Building Permit', amount: 'Php 500.00' },
    { date: '2024-08-25', orNo: 'OR123457', service: 'Car Sticker', amount: 'Php 500.00' },
    { date: '2024-08-25', orNo: 'OR123458', service: 'Construction Supply Permit', amount: 'Php 500.00' },
    { date: '2024-08-24', orNo: '', service: '', amount: 'Php 1000.00', total: true },
    { date: '2024-08-24', orNo: 'OR123455', service: 'Building Permit', amount: 'Php 1000.00' },
  ];

  const hasPendingTransactions = transactions.some(transaction => transaction.status === 'Pending');

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TabsGradient />
      <AppHeader />
      {/* <PermitForm /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: colors.paleGreen,
    padding: 10,
  },
  transactionItem: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary, // Adjust the color to match your design
  },
  paymentHistoryLink: {
    marginBottom: 10,
  },
  paymentHistoryText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  requestButton: {
    backgroundColor: colors.primary,
    marginBottom: 10,
  },
  pendingButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default App;

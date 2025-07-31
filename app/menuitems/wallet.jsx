import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming @expo/vector-icons is installed

const WalletScreen = ({ onBackPress }) => {
  // State for wallet balance
  const [balance, setBalance] = useState(247);

  // Example transaction data
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'debit', description: 'E-Jeep Ride to Market', amount: 15.00, date: '2025-07-24' },
    { id: 2, type: 'credit', description: 'Top-up', amount: 100.00, date: '2025-07-23' },
    { id: 3, type: 'debit', description: 'E-Jeep Ride to School', amount: 13.00, date: '2025-07-22' },
    { id: 4, type: 'credit', description: 'Refund - Canceled E-Jeep Ride', amount: 15.00, date: '2025-07-21' },
    { id: 5, type: 'debit', description: 'E-Jeep Ride to Mall', amount: 20.00, date: '2025-07-20' },
    { id: 6, type: 'debit', description: 'E-Jeep Ride to Office', amount: 25.00, date: '2025-07-19' },
  ]);

  // Function to simulate adding funds
  const handleAddFunds = () => {
    Alert.prompt(
      "Add Funds",
      "Enter amount to add (in Peso):",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: amount => {
            const parsedAmount = parseFloat(amount);
            if (!isNaN(parsedAmount) && parsedAmount > 0) {
              setBalance(prevBalance => prevBalance + parsedAmount);
              setTransactions(prevTransactions => [
                { id: prevTransactions.length + 1, type: 'credit', description: `Added Funds`, amount: parsedAmount, date: new Date().toISOString().slice(0, 10) },
                ...prevTransactions
              ]);
              Alert.alert('Success', `Successfully added ₱${parsedAmount.toFixed(2)}.`);
            } else {
              Alert.alert('Error', "Invalid amount. Please enter a positive number.");
            }
          }
        }
      ],
      "plain-text"
    );
  };

  // Function to simulate withdrawing funds
  const handleWithdrawFunds = () => {
    Alert.prompt(
      "Withdraw Funds",
      "Enter amount to withdraw (in Peso):",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: amount => {
            const parsedAmount = parseFloat(amount);
            if (!isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= balance) {
              setBalance(prevBalance => prevBalance - parsedAmount);
              setTransactions(prevTransactions => [
                { id: prevTransactions.length + 1, type: 'debit', description: `Withdrew Funds`, amount: parsedAmount, date: new Date().toISOString().slice(0, 10) },
                ...prevTransactions
              ]);
              Alert.alert('Success', `Successfully withdrew ₱${parsedAmount.toFixed(2)}.`);
            } else if (parsedAmount > balance) {
              Alert.alert('Error', "Insufficient balance.");
            } else {
              Alert.alert('Error', "Invalid amount. Please enter a positive number.");
            }
          }
        }
      ],
      "plain-text"
    );
  };

  // Function to edit the main wallet balance
  const handleEditBalance = () => {
    Alert.prompt(
      "Edit Wallet Balance",
      "Enter new balance (in Peso):",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: newBalanceString => {
            const newBalance = parseFloat(newBalanceString);
            if (!isNaN(newBalance) && newBalance >= 0) {
              setBalance(newBalance);
              Alert.alert('Success', `Balance updated to ₱${newBalance.toFixed(2)}.`);
            } else {
              Alert.alert('Error', "Invalid amount. Please enter a non-negative number.");
            }
          }
        }
      ],
      "plain-text",
      String(balance.toFixed(2)) // Pre-fill with current balance
    );
  };

  // Function to edit a specific transaction's amount
  const handleEditTransactionAmount = (transactionId) => {
    const transactionToEdit = transactions.find(t => t.id === transactionId);
    if (!transactionToEdit) return;

    Alert.prompt(
      `Edit Amount for: ${transactionToEdit.description}`,
      `Enter new amount (in Peso) for this ${transactionToEdit.type} transaction:`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: newAmountString => {
            const newAmount = parseFloat(newAmountString);
            if (!isNaN(newAmount) && newAmount >= 0) {
              setTransactions(prevTransactions => {
                return prevTransactions.map(t => {
                  if (t.id === transactionId) {
                    // Adjust balance based on old and new amount/type
                    setBalance(prevBalance => {
                      let updatedBalance = prevBalance;
                      // Remove old transaction's impact on balance
                      if (t.type === 'credit') {
                        updatedBalance -= t.amount;
                      } else { // debit
                        updatedBalance += t.amount;
                      }
                      // Apply new transaction's impact on balance
                      if (t.type === 'credit') {
                        updatedBalance += newAmount;
                      } else { // debit
                        updatedBalance -= newAmount;
                      }
                      return updatedBalance;
                    });
                    return { ...t, amount: newAmount };
                  }
                  return t;
                });
              });
              Alert.alert('Success', `Transaction amount updated to ₱${newAmount.toFixed(2)}.`);
            } else {
              Alert.alert('Error', "Invalid amount. Please enter a non-negative number.");
            }
          }
        }
      ],
      "plain-text",
      String(transactionToEdit.amount.toFixed(2)) // Pre-fill with current transaction amount
    );
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#2A3142" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wallet</Text>
        <TouchableOpacity onPress={handleEditBalance}>
          <Text style={styles.balanceText}>₱{balance.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          onPress={handleAddFunds}
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
        >
          <MaterialIcons name="add-circle-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Add Funds</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleWithdrawFunds}
          style={[styles.actionButton, { backgroundColor: '#F44336' }]}
        >
          <MaterialIcons name="remove-circle-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction History */}
      <View style={styles.transactionsSection}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        {transactions.length > 0 ? (
          <ScrollView style={styles.transactionsList}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionIconAndDetails}>
                  {transaction.type === 'credit' ? (
                    <MaterialIcons name="arrow-circle-up" size={24} color="#4CAF50" />
                  ) : (
                    <MaterialIcons name="arrow-circle-down" size={24} color="#F44336" />
                  )}
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionDescription}>{transaction.description}</Text>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleEditTransactionAmount(transaction.id)}>
                  <Text
                    style={[
                      styles.transactionAmount,
                      transaction.type === 'credit' ? { color: '#4CAF50' } : { color: '#F44336' }
                    ]}
                  >
                    {transaction.type === 'credit' ? '+' : '-'}{`₱`}{transaction.amount.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noTransactionsText}>No transactions yet.</Text>
        )}
      </View>

      {/* Footer/Disclaimer */}
      <Text style={styles.footerText}>
        Your financial data is secured.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20, // Kept horizontal padding
    paddingTop: 50, // Increased padding at the top to push content down
    paddingBottom: 40, // Added more padding at the bottom for the footer
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    paddingHorizontal: 0,
    fontWeight: 'bold',
    color: '#2A3142',
  },
  balanceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    minWidth: 150,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  transactionsSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2A3142',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionsList: {
    // Removed maxHeight: 300 to allow it to expand dynamically
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionIconAndDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allows this section to take available space
    marginRight: 10, // Add some space between description and amount
  },
  transactionDetails: {
    marginLeft: 10,
    flex: 1, // Allows description to take available space
    flexShrink: 1, // Allows description text to shrink and wrap
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    flexWrap: 'wrap', // Ensures long descriptions wrap to the next line
  },
  transactionDate: {
    fontSize: 12,
    color: '#777777',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    // No flex properties here, let it size based on content,
    // but its parent's flex will ensure it has space.
  },
  noTransactionsText: {
    textAlign: 'center',
    color: '#777777',
    paddingVertical: 20,
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999999',
    marginTop: 20,
  },
});

export default WalletScreen;

import firebase from "@Config/Firebase";
import MainContext from "@Context/Main";

class MyBudgetApp {
  getInfoUser = (phone) => {
    var userInfo = [];
    var ref;
    switch (MainContext.ENVIRONMENT) {
      case "DEV":
        ref = firebase.getInstance().database().ref("/UsersDEV");
        break;
      case "PRD":
        ref = firebase.getInstance().database().ref("/Users");
        break;
    }
    return ref
      .child(phone)
      .once("value", function (user) {
        if (user.exists()) {
          userInfo.push({
            idUser: user.key,
            state: user.val().state,
            paidVersion: user.val().paidVersion,
            phone: user.val().phone,
            codeZone: user.val().codeZone,
            countryCoins: {
              Acronym:
                user.val().countryCoins != undefined
                  ? user.val().countryCoins.Acronym
                  : null,
              Sign:
                user.val().countryCoins != undefined
                  ? user.val().countryCoins.Sign
                  : null,
            },
          });
        }
      })
      .then(() => {
        return userInfo;
      });
  };

  setUser = (userInfo) => {
    var ref;
    switch (MainContext.ENVIRONMENT) {
      case "DEV":
        ref = firebase
          .getInstance()
          .database()
          .ref("/UsersDEV")
          .child(userInfo.idUser);
        break;
      case "PRD":
        ref = firebase
          .getInstance()
          .database()
          .ref("/Users")
          .child(userInfo.idUser);
        break;
    }

    return ref
      .set({
        paidVersion: userInfo.paidVersion,
        state: userInfo.state,
        phone: userInfo.phone,
        codeZone: userInfo.codeZone,
        countryCoins: {
          Acronym: userInfo.countryCoins.Acronym,
          Sign: userInfo.countryCoins.Sign,
        },
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  };

  updateUser = (userInfo) => {
    var ref;
    switch (MainContext.ENVIRONMENT) {
      case "DEV":
        ref = firebase
          .getInstance()
          .database()
          .ref("/UsersDEV")
          .child(userInfo.idUser);
        break;
      case "PRD":
        ref = firebase
          .getInstance()
          .database()
          .ref("/Users")
          .child(userInfo.idUser);
        break;
    }

    return ref
      .update({
        paidVersion: userInfo.paidVersion,
        countryCoins: {
          Acronym: userInfo.countryCoins.Acronym,
          Sign: userInfo.countryCoins.Sign,
        },
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  };

  getAppAbout = () => {
    var appAbout = [];
    var ref;
    switch (MainContext.ENVIRONMENT) {
      case "DEV":
        ref = firebase
          .getInstance()
          .database()
          .ref("/MyBudgetDEV/myBudgetAbout");
        break;
      case "PRD":
        ref = firebase.getInstance().database().ref("/MyBudget/myBudgetAbout");
        break;
    }
    return ref
      .once("value", (about) => {
        if (about.exists()) {
          about.forEach(function (aboutInfo) {
            if (aboutInfo.val().state) {
              appAbout.push({
                aboutKey: aboutInfo.key,
                title: aboutInfo.val().title,
                detail: aboutInfo.val().detail,
                state: aboutInfo.val().state,
                icon: aboutInfo.val().icon,
              });
            }
          });
        }
      })
      .then(() => {
        return appAbout;
      });
  };

  getAppInformation = () => {
    var appInformation = [];
    var ref;
    switch (MainContext.ENVIRONMENT) {
      case "DEV":
        ref = firebase.getInstance().database().ref("/MyBudgetDEV");
        break;
      case "PRD":
        ref = firebase.getInstance().database().ref("/MyBudget");
        break;
    }
    return ref
      .once("value", (app) => {
        if (app.exists()) {
          appInformation.push({
            inMaintenance: app.val().inMaintenance,
            version: app.val().version,
            appDescription: app.val().appDescription,
            appName: app.val().appName,
            myBudgetMsgs: {
              informationMsgs: {
                bannedUserMsg:
                  app.val().myBudgetMsgs.informationMsgs.bannedUserMsg,
                inMaintenanceMsg:
                  app.val().myBudgetMsgs.informationMsgs.inMaintenanceMsg,
                versionMsg: app.val().myBudgetMsgs.informationMsgs.versionMsg,
                deleteAccountMsg:
                  app.val().myBudgetMsgs.informationMsgs.deleteAccountMsg,
              },
            },
            budgetTypesMsgs: {
              confirmMsgs: {
                normalBudget:
                  app.val().budgetTypesMsgs.confirmMsgs.normalBudget,
                normalSaving:
                  app.val().budgetTypesMsgs.confirmMsgs.normalSaving,
                scheduledSaving:
                  app.val().budgetTypesMsgs.confirmMsgs.scheduledSaving,
              },
              deleteMsgs: {
                normalBudget: app.val().budgetTypesMsgs.deleteMsgs.normalBudget,
                normalSaving: app.val().budgetTypesMsgs.deleteMsgs.normalSaving,
                scheduledSaving:
                  app.val().budgetTypesMsgs.deleteMsgs.scheduledSaving,
              },
              informationMsgs: {
                infoMsg: app.val().budgetTypesMsgs.informationMsgs.infoMsg,
                warningMsg:
                  app.val().budgetTypesMsgs.informationMsgs.warningMsg,
                generalInfoMsg:
                  app.val().budgetTypesMsgs.informationMsgs.generalInfoMsg,
              },
              createMsgs: {
                normalBudget: app.val().budgetTypesMsgs.createMsgs.normalBudget,
              },
              updateMsgs: {
                normalBudget: app.val().budgetTypesMsgs.updateMsgs.normalBudget,
              },
            },
            spendingMsgs: {
              confirmMsgs: {
                normalSpending:
                  app.val().spendingMsgs.confirmMsgs.normalSpending,
              },
              deleteMsgs: {
                normalSpending:
                  app.val().spendingMsgs.deleteMsgs.normalSpending,
              },
              informationMsgs: {
                infoMsg: app.val().spendingMsgs.informationMsgs.infoMsg,
              },
              createMsgs: {
                normalSpending:
                  app.val().spendingMsgs.createMsgs.normalSpending,
              },
              updateMsgs: {
                normalSpending:
                  app.val().spendingMsgs.updateMsgs.normalSpending,
              },
            },
            savingsAccountMsgs: {
              confirmMsgs: {
                normalSavingAccount:
                  app.val().savingsAccountMsgs.confirmMsgs.normalSavingAccount,
                scheduledSavingAccount:
                  app.val().savingsAccountMsgs.confirmMsgs
                    .scheduledSavingAccount,
                createScheduledSaving:
                  app.val().savingsAccountMsgs.confirmMsgs
                    .createScheduledSaving,
              },
              deleteMsgs: {
                normalSavingAccount:
                  app.val().savingsAccountMsgs.deleteMsgs.normalSavingAccount,
                scheduledSavingAccount:
                  app.val().savingsAccountMsgs.deleteMsgs
                    .scheduledSavingAccount,
              },
              informationMsgs: {
                infoMsg: app.val().savingsAccountMsgs.informationMsgs.infoMsg,
                generalInfoMsg:
                  app.val().savingsAccountMsgs.informationMsgs.generalInfoMsg,
                infoCreateScheduledSavingAccount:
                  app.val().savingsAccountMsgs.informationMsgs
                    .infoCreateScheduledSavingAccount,
              },
              createMsgs: {
                normalSavingAccount:
                  app.val().savingsAccountMsgs.createMsgs.normalSavingAccount,
                scheduledSavingAccount:
                  app.val().savingsAccountMsgs.createMsgs.normalSavingAccount,
              },
              updateMsgs: {
                normalSavingAccount:
                  app.val().savingsAccountMsgs.updateMsgs.normalSavingAccount,
              },
            },
            savingsMsgs: {
              confirmMsgs: {
                normalSaving: app.val().savingsMsgs.confirmMsgs.normalSaving,
                scheduledSaving:
                  app.val().savingsMsgs.confirmMsgs.scheduledSaving,
              },
              deleteMsgs: {
                normalSaving: app.val().savingsMsgs.deleteMsgs.normalSaving,
                scheduledSaving:
                  app.val().savingsMsgs.deleteMsgs.scheduledSaving,
              },
              informationMsgs: {
                infoMsg: app.val().savingsMsgs.informationMsgs.infoMsg,
                infoCreateBudget:
                  app.val().savingsMsgs.informationMsgs.infoCreateBudget,
              },
              createMsgs: {
                normalSaving: app.val().savingsMsgs.createMsgs.normalSaving,
                scheduledSaving:
                  app.val().savingsMsgs.createMsgs.scheduledSaving,
              },
              updateMsgs: {
                normalSaving: app.val().savingsMsgs.updateMsgs.normalSaving,
                scheduledSaving:
                  app.val().savingsMsgs.updateMsgs.scheduledSaving,
              },
            },
            budgetBalanceMsgs: {
              informationMsgs: {
                infoMsg: app.val().budgetBalanceMsgs.informationMsgs.infoMsg,
              },
            },
            debtsAccountMsgs: {
              confirmMsgs: {
                createScheduledDebt:
                  app.val().debtsAccountMsgs.confirmMsgs.createScheduledDebt,
                normalDebtAccount:
                  app.val().debtsAccountMsgs.confirmMsgs.normalDebtAccount,
                scheduledDebtAccount:
                  app.val().debtsAccountMsgs.confirmMsgs.scheduledDebtAccount,
              },
              deleteMsgs: {
                normalDebtAccount:
                  app.val().debtsAccountMsgs.deleteMsgs.normalDebtAccount,
                scheduledDebtAccount:
                  app.val().debtsAccountMsgs.deleteMsgs.scheduledDebtAccount,
              },
              informationMsgs: {
                infoMsg: app.val().debtsAccountMsgs.informationMsgs.infoMsg,
                generalInfoMsg:
                  app.val().debtsAccountMsgs.informationMsgs.generalInfoMsg,
                infoCreateScheduledDebtAccount:
                  app.val().debtsAccountMsgs.informationMsgs
                    .infoCreateScheduledDebtAccount,
              },
              createMsgs: {
                normalDebtAccount:
                  app.val().debtsAccountMsgs.createMsgs.normalDebtAccount,
                scheduledDebtAccount:
                  app.val().debtsAccountMsgs.createMsgs.scheduledDebtAccount,
              },
            },
            googleAdsConfig: {
              budgetsAmount: parseInt(app.val().googleAdsConfig.budgetsAmount),
              counterShowAds: parseInt(
                app.val().googleAdsConfig.counterShowAds
              ),
              debtsAmount: parseInt(app.val().googleAdsConfig.debtsAmount),
              savingsAmount: parseInt(app.val().googleAdsConfig.savingsAmount),
              spendingAmount: parseInt(
                app.val().googleAdsConfig.spendingAmount
              ),
              intersticialAdsId: app.val().googleAdsConfig.intersticialAdsId,
              bannerAdsId: app.val().googleAdsConfig.bannerAdsId,
              rewardAdsId: app.val().googleAdsConfig.rewardAdsId,
            },
          });
        }
      })
      .then(() => {
        return appInformation;
      });
  };

  getServerTimestamp = () => {
    var idUser = global.idUser;
    var timestamp;
    var ref = firebase
      .getInstance()
      .database()
      .ref("/ServerTime")
      .child(idUser);
    return ref
      .update({
        serverTime: firebase.getInstance().database.ServerValue.TIMESTAMP,
      })
      .then(() => {
        return ref
          .once("value", function (date) {
            timestamp = date.val().serverTime;
            //return date.val().serverTime;
          })
          .then(() => {
            return timestamp;
          });
      });
  };

  deleteAccount = () => {
    var idUser = global.idUser;
    //Budgets
    var refBudgetType;
    //Spending
    var refSpending;
    //SavingsAccounts
    var refSavingsAccount;
    //Savings
    var refSavings;
    //MonthlyIncome
    var refMonthlyIncome;
    //Users
    var refUsers;
    //ServerTime
    var refServerTime;
    switch (MainContext.ENVIRONMENT) {
      case "DEV":
        //Budgets
        refBudgetType = firebase
          .getInstance()
          .database()
          .ref("/BudgetTypeDEV")
          .child(idUser);
        //Spending
        refSpending = firebase
          .getInstance()
          .database()
          .ref("/SpendingDEV")
          .child(idUser);
        //SavingsAccounts
        refSavingsAccount = firebase
          .getInstance()
          .database()
          .ref("/SavingsAccountDEV")
          .child(idUser);
        //Savings
        refSavings = firebase
          .getInstance()
          .database()
          .ref("/SavingsDEV")
          .child(idUser);
        //MonthlyIncome
        refMonthlyIncome = firebase
          .getInstance()
          .database()
          .ref("/MonthlyIncomeDEV")
          .child(idUser);
        //Users
        refUsers = firebase
          .getInstance()
          .database()
          .ref("/UsersDEV")
          .child(idUser);
        //ServerTime
        refServerTime = firebase
          .getInstance()
          .database()
          .ref("/ServerTime")
          .child(idUser);
        break;
      case "PRD":
        //Budgets
        refBudgetType = firebase
          .getInstance()
          .database()
          .ref("/BudgetType")
          .child(idUser);
        //Spending
        refSpending = firebase
          .getInstance()
          .database()
          .ref("/Spending")
          .child(idUser);
        //SavingsAccounts
        refSavingsAccount = firebase
          .getInstance()
          .database()
          .ref("/SavingsAccount")
          .child(idUser);
        //Savings
        refSavings = firebase
          .getInstance()
          .database()
          .ref("/Savings")
          .child(idUser);
        //MonthlyIncome
        refMonthlyIncome = firebase
          .getInstance()
          .database()
          .ref("/MonthlyIncome")
          .child(idUser);
        //Users
        refUsers = firebase
          .getInstance()
          .database()
          .ref("/Users")
          .child(idUser);
        //ServerTime
        refServerTime = firebase
          .getInstance()
          .database()
          .ref("/ServerTime")
          .child(idUser);
        break;
    }
    //Users
    return refUsers.remove().then(() => {
      //Budgets
      refBudgetType.remove();
      //Spending
      refSpending.remove();
      //SavingsAccounts
      refSavingsAccount.remove();
      //Savings
      refSavings.remove();
      //MonthlyIncome
      refMonthlyIncome.remove();
      //ServerTime
      refServerTime.remove();
    });
  };
}

export default new MyBudgetApp();

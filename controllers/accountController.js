const db = require('../data/accountDb.js');
const accountController = (module.exports = {});

accountController.createAccount = async function(request, response) {
  try {
    const pendingAccount = { ...request.body };

    (!pendingAccount.name || !pendingAccount.budget) &&
      response.status(400).json({
        success: false,
        message: `Error. Invalid Account Submission. Must Contain Name and Budget.`,
      });

    const newAccount = await db.insert(pendingAccount);

    newAccount
      ? response.status(200).json({
          success: true,
          message: `Success. New Account Created.`,
          newAccount,
        })
      : response.status(400).json({
          success: false,
          message: `Error. Unable to create new account.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error.\n${error}`,
    });
  }
};

accountController.getAccount = async function(request, response) {
  try {
    const account = await db.get(request.params.id);

    account
      ? response.status(200).json({
          success: true,
          message: `Success. Account Fetched.`,
          account,
        })
      : response.status(404).json({
          success: false,
          message: `Error. Account not found.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error.\n${error}`,
    });
  }
};

accountController.getAccounts = async function(request, response) {
  try {
    const accounts = await db.get();

    accounts
      ? response.status(200).json({
          success: true,
          message: `Success. Accounts Fetched.`,
          accounts,
        })
      : response.status(400).json({
          success: false,
          message: `Error. Unable to fetch accounts.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error.\n${error}`,
    });
  }
};

accountController.updateAccount = async function(request, response) {
  try {
    const existingAccount = await db.get(request.params.id);
    !existingAccount &&
      response.status(404).json({
        success: false,
        message: `Error. Account no found.`,
      });

    const updatedAccount = await db.update(request.params.id, {
      ...request.body,
    });
    updatedAccount
      ? response.status(200).json({
          success: true,
          message: `Success. Account Updated.`,
          updatedAccount,
        })
      : response.status(400).json({
          success: false,
          message: `Error. Unable to update account.`,
        });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error.\n${error}`,
    });
  }
};

accountController.deleteAccount = async function(request, response) {
  const deletedAccount = await db.get(request.params.id);
  !deletedAccount &&
    response.status(404).json({
      success: false,
      message: `Error. Account not found.`,
    });

  const deleted = await db.remove(request.params.id);
  deleted
    ? response.status(200).json({
        success: true,
        message: `Success. Account Deleted.`,
        deletedAccount,
      })
    : response.status(400).json({
        success: false,
        message: `Error. Unable to delete account.`,
      });

  try {
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Fatal Error.\n${error}`,
    });
  }
};

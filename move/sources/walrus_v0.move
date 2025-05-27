module walrus_v0::walrus_v0 {
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::event;
    use sui::clock::{Self, Clock};
    use std::string::{String};

    // 错误码
    const ENotAdmin: u64 = 0;
    const EInvalidAmount: u64 = 1;
    const EInsufficientBalance: u64 = 2;
    const EUnauthorizedWallet: u64 = 3;

    // 充值记录结构
    public struct DepositRecord has store {
        amount: u64,
        sui_price: u64,
        wallet: address,
        timestamp: u64,
    }

    // 提现记录结构
    public struct WithdrawRecord has store {
        amount: u64,
        wallet: address,
        timestamp: u64,
    }

    // 用户账户结构
    public struct Account has key, store {
        id: UID,
        user_id: String,
        balance: Balance<SUI>,
        deposit_records: vector<DepositRecord>,
        withdraw_records: vector<WithdrawRecord>,
    }

    // 账户本结构
    public struct AccountBook has key {
        id: UID,
        admin: address,
        accounts: vector<Account>,
    }

    // 充值事件
    public struct DepositEvent has copy, drop {
        amount: u64,
        wallet: address,
        timestamp: u64,
    }

    // 提现事件
    public struct WithdrawEvent has copy, drop {
        amount: u64,
        wallet: address,
        timestamp: u64,
    }

    // 管理员提取事件
    public struct AdminWithdrawEvent has copy, drop {
        amount: u64,
        user_id: String,
        wallet: address,
        timestamp: u64,
    }

    // 管理员提取方法
    public entry fun admin_withdraw(
        book: &mut AccountBook,
        user_id: String,
        amount: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        // 验证是否为管理员
        assert!(book.admin == sender, ENotAdmin);
        assert!(amount > 0, EInvalidAmount);
        
        let timestamp = clock::timestamp_ms(clock);
        
        // 查找用户账户并处理提现
        let mut i = 0;
        let len = vector::length(&book.accounts);
        while (i < len) {
            let account = vector::borrow_mut(&mut book.accounts, i);
            if (account.user_id == user_id) {
                // 检查余额
                assert!(balance::value(&account.balance) >= amount, EInsufficientBalance);
                
                // 处理提现
                let withdraw_balance = balance::split(&mut account.balance, amount);
                let withdraw_coin = coin::from_balance(withdraw_balance, ctx);
                transfer::public_transfer(withdraw_coin, sender);

                // 发送事件
                event::emit(AdminWithdrawEvent {
                    amount,
                    user_id,
                    wallet: sender,
                    timestamp,
                });
                break
            };
            i = i + 1;
        };
    }

    // 初始化函数，创建账户本
    fun init(ctx: &mut TxContext) {
        let account_book = AccountBook {
            id: object::new(ctx),
            admin: tx_context::sender(ctx),
            accounts: vector::empty(),
        };
        transfer::share_object(account_book);
    }

    // 充值方法
    public entry fun deposit(
        book: &mut AccountBook,
        user_id: String,
        payment: Coin<SUI>,
        sui_price: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let amount = coin::value(&payment);
        assert!(amount > 0, EInvalidAmount);

        let sender = tx_context::sender(ctx);
        let timestamp = clock::timestamp_ms(clock);
        let coin_balance = coin::into_balance(payment);

        // 查找用户账户并更新
        let mut i = 0;
        let len = vector::length(&book.accounts);
        let mut found = false;
        let mut target_account = option::none();
        
        while (i < len) {
            let account = vector::borrow_mut(&mut book.accounts, i);
            if (account.user_id == user_id) {
                found = true;
                target_account = option::some(i);
                break
            };
            i = i + 1;
        };

        let deposit_record = DepositRecord {
            amount,
            sui_price,
            wallet: sender,
            timestamp,
        };

        if (found) {
            let account = vector::borrow_mut(&mut book.accounts, option::extract(&mut target_account));
            vector::push_back(&mut account.deposit_records, deposit_record);
            balance::join(&mut account.balance, coin_balance);
        } else {
            let new_account = Account {
                id: object::new(ctx),
                user_id,
                balance: coin_balance,
                deposit_records: vector::singleton(deposit_record),
                withdraw_records: vector::empty(),
            };
            vector::push_back(&mut book.accounts, new_account);
        };
        
        // 发送事件
        event::emit(DepositEvent {
            amount,
            wallet: sender,
            timestamp,
        });
    }

    // 提现方法
    public entry fun withdraw(
        book: &mut AccountBook,
        user_id: String,
        amount: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(amount > 0, EInvalidAmount);
        let sender = tx_context::sender(ctx);
        let timestamp = clock::timestamp_ms(clock);

        // 查找用户账户并处理提现
        let mut i = 0;
        let len = vector::length(&book.accounts);
        while (i < len) {
            let account = vector::borrow_mut(&mut book.accounts, i);
            if (account.user_id == user_id) {
                // 验证钱包地址是否在充值记录中
                let mut is_authorized = false;
                let mut j = 0;
                let deposit_len = vector::length(&account.deposit_records);
                while (j < deposit_len) {
                    let record = vector::borrow(&account.deposit_records, j);
                    if (record.wallet == sender) {
                        is_authorized = true;
                        break
                    };
                    j = j + 1;
                };
                assert!(is_authorized, EUnauthorizedWallet);

                // 检查余额
                assert!(balance::value(&account.balance) >= amount, EInsufficientBalance);

                // 添加提现记录
                let withdraw_record = WithdrawRecord {
                    amount,
                    wallet: sender,
                    timestamp,
                };
                vector::push_back(&mut account.withdraw_records, withdraw_record);

                // 处理提现
                let withdraw_balance = balance::split(&mut account.balance, amount);
                let withdraw_coin = coin::from_balance(withdraw_balance, ctx);
                transfer::public_transfer(withdraw_coin, sender);

                // 发送事件
                event::emit(WithdrawEvent {
                    amount,
                    wallet: sender,
                    timestamp,
                });                
                break
            };
            i = i + 1;
        };
    }
}




import React, { Component, } from 'react';
import ReactDOM, { render, } from 'react-dom';
import { Container, } from 'flux/utils';
// import { Router, Route, /* Link, IndexRoute,*/ browserHistory, hashHistory, } from 'react-router';
import BankBalanceStore from './BankBalanceStore';
import BankRewardsStore from './BankRewardsStore';
import BankActions from './BankActions';

class App extends Component{
  constructor() {
    super(...arguments);
    BankActions.createAccount();
  }
  deposit() {
    BankActions.depositIntoAccount(Number(this.refs.ammount.value));
    this.refs.ammount.value = '';
  }
  withdraw() {
    BankActions.withdrawFromAccount(Number(this.refs.ammount.value));
    this.refs.ammount.value = '';
  }
  render() {
    return (
      <div>
        <header>FluxTrust Bank</header>
        <h1>Your balance is ${(this.state.balance).toFixed(2) }</h1>
        <h2>Your Points Rewards Tier is { this.state.rewardsTier }</h2>
        <div className="atm">
          <input type="text" placeholder="Enter Ammount" ref="ammount" />
          <br />
          <button onClick={this.withdraw.bind(this)}>Withdraw</button>
          <button onClick={this.deposit.bind(this)}>Deposit</button>
        </div>
      </div>
    );
  }
}

App.getStores = () => ([ BankBalanceStore, BankRewardsStore ]);
App.calculateState = (prevState) => ({
  balance: BankBalanceStore.getState(),
  rewardsTier: BankRewardsStore.getState(),
});

const AppContainer = Container.create(App);

render(<AppContainer />,  document.querySelector('#root'));
//https://github.com/pro-react/kanban-app/tree/chapter1


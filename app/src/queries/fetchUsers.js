import gql from 'graphql-tag';

export default gql`
{
    users (first:10) {
    id
    exchangeBalances {
        id
        userAddress
        exchangeAddress
        ethDeposited
        tokensDeposited
        uniTokensMinted
        uniTokensBurned
        ethWithdrawn
        tokensWithdrawn
        ethBought
        tokensBought
        totalEthFeesPaid
        totalTokenFeesPaid
      }
  }
}
` 
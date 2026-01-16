# Superteam Earn Submission Checklist

## Before You Submit

### 1. Prerequisites Verification
- [ ] I am a new web3 developer
- [ ] I have NOT secured paid employment in a web3 role
- [ ] I have NOT previously passed a developer challenge bounty
- [ ] I understand that submissions outside this scope will be disqualified

### 2. Technical Setup
- [ ] Rust installed and working
- [ ] Solana CLI installed and configured
- [ ] Anchor framework installed
- [ ] Wallet created and funded (devnet)
- [ ] Project initialized: `blueshift_anchor_vault`

### 3. Code Implementation
- [ ] Updated `lib.rs` with the complete vault implementation
- [ ] Program ID set to: `22222222222222222222222222222222222222222222`
- [ ] Deposit function implemented correctly
- [ ] Withdraw function implemented correctly
- [ ] Error handling added
- [ ] Code builds successfully: `anchor build`

### 4. Blueshift Challenge
- [ ] Connected wallet to Blueshift
- [ ] Navigated to: https://learn.blueshift.gg/en/challenges/anchor-vault
- [ ] Clicked "Take Challenge"
- [ ] Uploaded `target/deploy/blueshift_anchor_vault.so`
- [ ] Challenge passed successfully
- [ ] NFT received in connected wallet
- [ ] Wallet address noted for submission

### 5. Twitter Post
- [ ] Wrote authentic post about experience
- [ ] Tagged @blueshift
- [ ] Tagged @SuperteamUK
- [ ] Added relevant hashtags (#Solana, #Web3, etc.)
- [ ] Included 1-2 key learnings
- [ ] Posted to Twitter
- [ ] Link to tweet saved for reference

### 6. Superteam Earn Submission
- [ ] Wallet address (that received NFT) ready
- [ ] Link to Twitter post ready
- [ ] All requirements met
- [ ] Form filled out completely
- [ ] Submission submitted

## Submission Form Information

When submitting to Superteam Earn, include:

1. **Wallet Address**: The exact address that received the Blueshift NFT
2. **Twitter Post**: Link to your post about the experience
3. **Any Additional Information**: Optional context about your learning journey

## After Submission

- Wait for verification from Superteam UK team
- Even if you don't win, you'll be recorded in the developer database
- Look out for invitations to:
  - Developer-only Telegram groups
  - Exclusive events
  - Future developer initiatives

## Verification Steps

To verify your wallet received the NFT:

```powershell
# Set cluster to devnet (or mainnet if deployed there)
solana config set --url devnet

# Check wallet balance and tokens
solana balance YOUR_WALLET_ADDRESS
spl-token accounts YOUR_WALLET_ADDRESS
```

Or visit a Solana explorer:
- Solscan: https://solscan.io/
- Solana FM: https://solana.fm/
- SolanaExplorer: https://explorer.solana.com/

## Tips for Success

1. **Double-check everything** before submitting
2. **Test your code** thoroughly
3. **Be authentic** in your Twitter post
4. **Keep proof** of completion (screenshots)
5. **Respond promptly** if the team reaches out

## Common Issues and Solutions

### Build Fails
- Ensure Anchor version is up to date: `avm use latest`
- Check that program ID is correct
- Verify all imports are correct

### Challenge Upload Fails
- Make sure you're uploading the `.so` file, not `.json`
- Check file size is reasonable
- Try refreshing the browser and reconnecting wallet

### NFT Not Received
- Check correct network (devnet vs mainnet)
- Verify wallet connection during challenge
- Wait a few minutes for blockchain confirmation
- Check wallet in Solana explorer

## Resources

- Blueshift Challenge: https://learn.blueshift.gg/en/challenges/anchor-vault
- Anchor Documentation: https://www.anchor-lang.com/docs
- Solana Cookbook: https://solanacookbook.com/
- Superteam UK: https://earn.superteam.fun/

## Questions or Issues?

If you encounter issues:
1. Check the Blueshift Discord: https://discord.gg/blueshift
2. Review the challenge documentation carefully
3. Search for similar issues in Solana forums
4. Reach out to Superteam UK community

Good luck! 🚀

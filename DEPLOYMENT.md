# Vercel Deployment Guide for Secure Value Vault

This guide provides step-by-step instructions for deploying the Secure Value Vault application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment Process

### Step 1: Prepare Your Vercel Account

1. **Sign up for Vercel** (if you don't have an account):
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" and choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub account

2. **Verify your account**:
   - Check your email for verification link
   - Complete the verification process

### Step 2: Import Project to Vercel

1. **Access Vercel Dashboard**:
   - Log in to your Vercel account
   - You'll see the main dashboard

2. **Import Project**:
   - Click the "New Project" button (usually a "+" icon)
   - Select "Import Git Repository"
   - Find and select `Wendell55Max/secure-value-vault`
   - Click "Import"

### Step 3: Configure Project Settings

1. **Project Configuration**:
   - **Project Name**: `secure-value-vault` (or your preferred name)
   - **Framework Preset**: Select "Vite" from the dropdown
   - **Root Directory**: Leave as default (`.`)
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `dist` (should auto-detect)
   - **Install Command**: `npm install` (should auto-detect)

2. **Environment Variables**:
   Click "Environment Variables" and add the following:

   ```
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
   VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
   VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
   VITE_RPC_URL_ALT=https://1rpc.io/sepolia
   ```

   **Important**: Make sure to add these for all environments (Production, Preview, Development)

### Step 4: Deploy the Application

1. **Start Deployment**:
   - Click "Deploy" button
   - Vercel will automatically:
     - Clone your repository
     - Install dependencies
     - Build the application
     - Deploy to their CDN

2. **Monitor Build Process**:
   - Watch the build logs in real-time
   - The process typically takes 2-5 minutes
   - You'll see progress indicators for each step

3. **Deployment Success**:
   - Once complete, you'll see a success message
   - Vercel will provide you with a deployment URL
   - Example: `https://secure-value-vault-abc123.vercel.app`

### Step 5: Configure Custom Domain (Optional)

1. **Add Custom Domain**:
   - Go to your project dashboard
   - Click on "Settings" tab
   - Navigate to "Domains" section
   - Click "Add Domain"
   - Enter your domain name (e.g., `securevaluevault.com`)

2. **DNS Configuration**:
   - Vercel will provide DNS records to add
   - Add the CNAME record to your domain provider
   - Wait for DNS propagation (can take up to 24 hours)

### Step 6: Verify Deployment

1. **Test the Application**:
   - Visit your deployment URL
   - Test wallet connection functionality
   - Verify all features work correctly
   - Check responsive design on mobile devices

2. **Check Console for Errors**:
   - Open browser developer tools
   - Check for any JavaScript errors
   - Verify network requests are working

## Post-Deployment Configuration

### Environment Variables Verification

Ensure all environment variables are properly set:

```bash
# Check these are accessible in your app
console.log(import.meta.env.VITE_CHAIN_ID) // Should output: 11155111
console.log(import.meta.env.VITE_RPC_URL) // Should output the Infura URL
```

### Performance Optimization

1. **Enable Analytics** (Optional):
   - Go to project settings
   - Enable Vercel Analytics
   - Monitor user interactions and performance

2. **Configure Caching**:
   - Vercel automatically handles static asset caching
   - API routes are cached based on headers

## Troubleshooting Common Issues

### Build Failures

1. **Dependency Issues**:
   ```bash
   # If build fails due to dependencies, check package.json
   npm install --legacy-peer-deps
   ```

2. **Environment Variables**:
   - Ensure all VITE_ prefixed variables are set
   - Check for typos in variable names
   - Verify values are correct

3. **Memory Issues**:
   - Vercel free tier has memory limits
   - Consider upgrading if build fails due to memory

### Runtime Issues

1. **Wallet Connection Problems**:
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches Sepolia (11155111)

2. **API Errors**:
   - Check browser console for CORS errors
   - Verify all external API endpoints are accessible
   - Test with different networks

## Monitoring and Maintenance

### Regular Checks

1. **Monitor Deployments**:
   - Check Vercel dashboard for failed deployments
   - Review build logs for warnings
   - Monitor performance metrics

2. **Update Dependencies**:
   - Regularly update npm packages
   - Test updates in preview deployments first
   - Keep security patches current

### Backup and Recovery

1. **Code Backup**:
   - Your code is safely stored in GitHub
   - Vercel automatically deploys from GitHub
   - No additional backup needed for code

2. **Environment Variables**:
   - Keep a local copy of environment variables
   - Document any custom configurations
   - Test deployment process periodically

## Advanced Configuration

### Preview Deployments

- Every pull request automatically creates a preview deployment
- Test changes before merging to main branch
- Share preview URLs with team members

### Edge Functions (Optional)

- For advanced server-side logic
- Configure in `api/` directory
- Use for custom API endpoints

### Performance Monitoring

- Enable Vercel Speed Insights
- Monitor Core Web Vitals
- Optimize based on real user metrics

## Support and Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **RainbowKit Documentation**: [rainbowkit.com](https://rainbowkit.com)
- **Project Issues**: Create issues in the GitHub repository

## Deployment Checklist

- [ ] Vercel account created and verified
- [ ] GitHub repository imported to Vercel
- [ ] Project settings configured (Vite framework)
- [ ] Environment variables added
- [ ] Initial deployment successful
- [ ] Application tested and working
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled (optional)
- [ ] Performance monitoring set up
- [ ] Documentation updated with live URL

## Final Notes

- The application is now live and accessible via the Vercel URL
- All future commits to the main branch will trigger automatic deployments
- Use preview deployments for testing changes
- Monitor the application for any issues after deployment
- Keep environment variables secure and up-to-date

Your Secure Value Vault application is now successfully deployed on Vercel! 🚀

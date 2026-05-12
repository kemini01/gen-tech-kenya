# GitHub Pages + Supabase Deployment Guide

## 📋 Overview
This guide walks you through setting up automated deployment of your electronics shop to GitHub Pages with Supabase backend integration.

**What happens:** Every time you push to the `main` branch, GitHub Actions automatically:
1. ✅ Installs dependencies
2. ✅ Injects Supabase secrets (no hardcoding!)
3. ✅ Builds your Next.js app
4. ✅ Deploys to GitHub Pages

---

## 🔑 Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Settings** → **API**
4. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon Public Key** (long alphanumeric string)

**Keep these safe!** You'll paste them into GitHub Secrets next.

---

## 🔐 Step 2: Add GitHub Secrets (WINDOWS LAPTOP)

### On Your Windows Laptop:

1. **Open GitHub Repository**
   - Go to your repository: `github.com/YOUR-USERNAME/gen-tech`

2. **Navigate to Secrets Settings**
   - Click **Settings** (top right tab of your repo)
   - Left sidebar → **Secrets and variables** → **Actions**
   - You'll see a green button **New repository secret**

3. **Add SUPABASE_URL**
   - Click **New repository secret**
   - Name: `SUPABASE_URL`
   - Value: Paste your Project URL (from Step 1)
   - Click **Add secret**

4. **Add SUPABASE_ANON_KEY**
   - Click **New repository secret** again
   - Name: `SUPABASE_ANON_KEY`
   - Value: Paste your Anon Public Key (from Step 1)
   - Click **Add secret**

✅ You should now see 2 secrets listed on this page.

---

## 📤 Step 3: Push Your Code to GitHub

In **PowerShell** or **Command Prompt** on your Windows laptop:

```powershell
cd path\to\gen-tech
git add .
git commit -m "Add automated GitHub Pages deployment"
git push origin main
```

---

## 🚀 Step 4: Watch the Robot Build Your Site

1. **Go to Actions Tab**
   - In your repo on GitHub.com, click **Actions** tab
   - You'll see "Deploy to GitHub Pages" with a yellow ⏳ circle

2. **Wait for Completion**
   - The workflow will run (usually 2-3 minutes)
   - Yellow circle = Running
   - 🟢 Green checkmark = Success!
   - 🔴 Red X = Error (check the logs)

3. **Check the Build Log** (if you want)
   - Click the workflow run
   - Scroll down to see build steps
   - Look for "✅ Build artifacts ready for deployment"

---

## 🌐 Step 5: Find Your Live Website

### Option A: GitHub Pages URL (Free)
1. Go to **Settings** → **Pages** (left sidebar)
2. Look for "Your site is live at: `https://YOUR-USERNAME.github.io/gen-tech/`"
3. Click the link!

### Option B: Custom Domain (Optional)
1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter your domain
3. You'll need to add DNS records to your domain registrar

---

## ✅ Verification Checklist

- [ ] You have your SUPABASE_URL copied
- [ ] You have your SUPABASE_ANON_KEY copied
- [ ] Added SUPABASE_URL to GitHub Secrets
- [ ] Added SUPABASE_ANON_KEY to GitHub Secrets
- [ ] Ran `git push origin main` in PowerShell
- [ ] Checked **Actions** tab and saw the green checkmark
- [ ] Visited your GitHub Pages URL and saw your site live

---

## 🐛 Troubleshooting

### ❌ Build Failed (Red X in Actions)
1. Click the failed workflow
2. Scroll to the red error message
3. Common issues:
   - **"out directory not found"** → Next.js build failed. Check if there are TypeScript errors
   - **"Secrets not found"** → You didn't add the GitHub Secrets. Re-do Step 2
   - **Missing dependencies** → Run `pnpm install` locally first

### ❌ Site Shows 404 or Blank
1. Make sure GitHub Pages is pointing to the correct branch
2. Go to **Settings** → **Pages** → Source should be "Deploy from a branch" → `gh-pages` branch
3. Wait 1-2 minutes for GitHub to serve the new version

### ✅ Site Looks Good but Supabase Not Working
1. Check browser console (Press F12)
2. Look for network errors in the **Network** tab
3. Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct in GitHub Secrets

---

## 🔄 How to Redeploy (After Making Changes)

Just push to main branch again:
```powershell
git add .
git commit -m "Update product listings"
git push origin main
```

The robot will automatically rebuild and deploy!

---

## 📝 How Environment Variables Work

**In your code** (safe to commit):
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
```

**In GitHub Actions** (hidden):
```yaml
env:
  NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
  NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
```

**Result:** Your secrets are never committed to the repo, but the build process gets them at build-time! 🔒

---

## 🎨 Your Charcoal Black & Red Theme
The deployment pipeline doesn't touch your CSS or theme files. Your site will look exactly the same, just hosted on GitHub Pages!

---

**Need help?** Check GitHub Actions logs or ask in the repository issues.

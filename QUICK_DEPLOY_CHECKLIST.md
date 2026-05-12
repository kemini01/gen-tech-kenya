## 🚀 QUICK START: 5-STEP DEPLOYMENT CHECKLIST

### ✅ STEP 1: Gather Your Supabase Credentials
**On Supabase Dashboard (https://app.supabase.com):**
- [ ] Open your project
- [ ] Go to Settings → API
- [ ] Copy **Project URL** (example: `https://xxxxx.supabase.co`)
- [ ] Copy **Anon Public Key** (the long alphanumeric string)

---

### ✅ STEP 2: Add Secrets to GitHub
**On GitHub.com → Your Repository:**

**First Secret:**
- [ ] Click **Settings** tab
- [ ] Left sidebar: **Secrets and variables** → **Actions**
- [ ] Click **New repository secret**
- [ ] Name: `SUPABASE_URL`
- [ ] Value: Paste your Project URL
- [ ] Click **Add secret**

**Second Secret:**
- [ ] Click **New repository secret** again
- [ ] Name: `SUPABASE_ANON_KEY`
- [ ] Value: Paste your Anon Public Key
- [ ] Click **Add secret**

✅ You should see both secrets listed on this page

---

### ✅ STEP 3: Push Code to GitHub
**In PowerShell/CMD on your Windows laptop:**

```powershell
cd path\to\gen-tech
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

- [ ] Command executed without errors

---

### ✅ STEP 4: Watch the Deployment
**On GitHub.com → Actions tab:**

- [ ] Click **Actions** tab
- [ ] See "Deploy to GitHub Pages" with yellow circle ⏳
- [ ] Wait 2-3 minutes
- [ ] Circle turns 🟢 **GREEN** = SUCCESS!
- [ ] Circle turns 🔴 **RED** = Check the error log

---

### ✅ STEP 5: Visit Your Live Site
**On GitHub.com → Settings → Pages:**

- [ ] Find your site URL: `https://YOUR-USERNAME.github.io/gen-tech/`
- [ ] Click the link
- [ ] See your electronics shop live! 🎉

---

## 🔑 WHAT EACH SECRET DOES

| Secret Name | What It Is | Where to Get |
|-------------|-----------|-------------|
| `SUPABASE_URL` | Your Supabase database endpoint | Supabase Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Public key for database access | Supabase Settings → API → Anon Key |

**Why secrets?** Your source code on GitHub doesn't contain these values. They're only injected during the build process by GitHub Actions. This keeps them safe! 🔒

---

## ⚡ AFTER YOU DEPLOY

**To update your site:**
```powershell
# Make your changes locally
# Then:
git add .
git commit -m "Your message"
git push origin main
```

That's it! The robot will rebuild and redeploy automatically in 2-3 minutes.

---

## 🐛 IF SOMETHING GOES WRONG

1. **Actions page shows RED X:**
   - Click the failed workflow
   - Scroll to find the error message
   - Check if you added both secrets correctly

2. **Site shows blank/404:**
   - Wait 2 minutes (GitHub Pages can be slow)
   - Try refreshing the page
   - Check Settings → Pages → Source is set to `gh-pages` branch

3. **Supabase not connecting:**
   - Open browser DevTools (F12)
   - Check Console for errors
   - Verify secrets are correct in GitHub

---

**Questions?** Check the full DEPLOYMENT_SETUP.md file for detailed troubleshooting.

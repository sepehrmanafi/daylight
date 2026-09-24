# Publish Daylight in your GitHub repository

Repository: https://github.com/sepehrmanafi/daylight
Website address **after successful deployment**: https://sepehrmanafi.github.io/daylight/

This package is ready to upload. It includes the editable React source and a prebuilt `docs` folder configured for your repository's `/daylight/` path. You do not need to run Node.js to publish this prebuilt version.

## 1. Upload the extracted files

1. Extract `daylight.zip` on your computer.
2. Open the extracted `daylight` folder. You should see `docs`, `src`, `public`, `package.json`, and other files.
3. Sign in to GitHub and visit https://github.com/sepehrmanafi/daylight/upload/main
4. Drag **the contents of the extracted folder** onto GitHub's upload area. Do not upload the ZIP or an extra enclosing folder.
5. Choose **Commit directly to the main branch**, then click **Commit changes**.

Check that `docs/index.html` is now visible at:
https://github.com/sepehrmanafi/daylight/blob/main/docs/index.html

If it is nested under another folder, the upload is in the wrong location. `docs` must be directly at the repository root.

## 2. Enable GitHub Pages

Open https://github.com/sepehrmanafi/daylight/settings/pages

Under **Build and deployment**:
- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/docs**
- Click **Save**.

Do not choose **GitHub Actions** as the source for this package. No custom Actions workflow is required; the site is already built.

## 3. Open your website

In the repository's **Actions** tab, wait for **pages build and deployment** to finish successfully. Pages settings should show that the site is live. Then open:

https://sepehrmanafi.github.io/daylight/

The website is NOT live merely because this URL is written here. You must upload the files and enable Pages while signed in to your GitHub account. This chat has no authenticated GitHub write access and has not modified your repository.

## Edit it later in VS Code

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, usually http://localhost:5173. Edit `src/main.jsx` / `src/style.css` for desktop/shared logic, `src/Mobile.jsx` / `src/mobile.css` for the separate mobile experience, `src/motion.jsx` for completion feedback, and `public/images` for artwork.

After making changes, regenerate your GitHub Pages website:

```sh
npm run build:pages
```

Commit/push the updated source and `docs` folder. Pages will redeploy the updated `docs` files. If uploading through the browser, remove obsolete files in `docs/assets` if necessary; only the filenames referenced in the new `docs/index.html` are used.

## Troubleshooting

- **404**: confirm main /docs is selected, `docs/index.html` is at the expected location, and the deployment finished successfully.
- **Old version**: try Ctrl+F5. If necessary, close all tabs for this site and reopen it. Export your tasks before clearing site data.
- **You cannot see Settings**: sign in as the repository owner.
- **Push/upload denied**: the repository URL is public read access, not write authorization. Sign in with your own account locally. Do not share a password or access token in chat.

## Data and privacy

The website is public, but each visitor's tasks stay in their own browser's localStorage. Nothing in the source archive contains your personal task data. There is no cloud sync. Use Settings → Export backup to move tasks from localhost/the preview to the GitHub Pages site: different origins have separate storage.


## Updating to the September 23 palette version

Uploading the new **whole `docs` folder at the repository root** updates the live site if Pages already uses `main` → `/docs`. Commit and wait for the Pages deployment. For the editable repository to match, also update `src`, `public`, `scripts`, `tests`, project manifests and documentation. Upload in batches if the GitHub browser uploader reaches its file limit.

Existing tasks and mood check-ins remain in the same browser workspace. The first-run slides do not automatically replay for existing users. Existing users can change their palette in Settings, including Midnight dark mode. Use a private tab to preview setup without clearing personal data. If the previous app remains visible after deployment, close all site tabs and reopen, or hard-refresh. Export a backup before ever clearing site data.

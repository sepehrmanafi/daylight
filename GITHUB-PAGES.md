# Publish Daylight in your GitHub repository

Repository: https://github.com/sepehrmanafi/daylight
Website address **after successful deployment**: https://sepehrmanafi.github.io/daylight/

This package is ready to upload. It includes the editable React source and a prebuilt `docs` folder configured for your repository's `/daylight/` path. You do not need to run Node.js to publish this prebuilt version.

## 1. Upload the extracted files

1. Extract `Daylight-GitHub-Pages.zip` on your computer.
2. Open the extracted `Daylight-GitHub-Pages` folder. You should see `docs`, `src`, `public`, `package.json`, and other files.
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

Open the local URL printed by Vite, usually http://localhost:5173. Edit `src/main.jsx`, `src/style.css`, and `public/images`.

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

# github-activity

Optimize the display of recent activities of GitHub users

![github-activity](https://socialify.git.ci/gxr404/github-activity/image?font=Raleway&forks=1&issues=1&logo=https%3A%2F%2Fgithub.com%2Fuser-attachments%2Fassets%2F1cbdd4ff-6211-452d-8220-4b449081fbaf&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Dark)

## Preview

[Live Demo](https://github-activity-one.vercel.app/)

<img src="./docs/assets/preview.png" width="500" style="border-radius:6px"/>

<img src="./docs/assets/preview_2.png" width="500" style="border-radius:6px"/>

## Recommend

Collaborating with [github-activity-webext](https://github.com/gxr404/github-activity-webext) browser extension for a better user experience

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Deploy on Vercel

[<img src="https://vercel.com/button" alt="Deploy on Zeabur" height="30">](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgxr404%2Fgithub-activity&env=GITHUB_TOKEN&project-name=github-activity&repository-name=github-activity)

### Environment Variables

1. [Create Token](https://github.com/settings/tokens?type=beta)
2. write `.env` file

    ```env
    GITHUB_TOKEN=YOUR_GITHUB_TOKEN
    ```

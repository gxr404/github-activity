export function getGithubHeader() {
  const header: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  }
  if (process.env.GITHUB_TOKEN) {
    header['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return header
}

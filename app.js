const repo = 'onesdh/info-processor-study';
const branch = 'main';
const fileListEl = document.getElementById('file-list');
const contentEl = document.getElementById('content');

function formatLabel(path) {
  const base = path.replace(/\.md$/i, '').replace(/^\//, '');
  const parts = base.split('/');
  const last = parts[parts.length - 1];

  if (last === 'README') {
    return parts.slice(0, -1).join(' / ') || '홈';
  }

  const m = last.match(/^(\d+)$/);
  if (m) {
    return `${parts.slice(0, -1).join(' / ')} ${m[1]}번`;
  }

  return base.replace(/\//g, ' / ');
}

function buildFileUrl(path) {
  return `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;
}

function setActiveButton(path, button) {
  document.querySelectorAll('.file-link').forEach((el) => el.classList.remove('active'));
  button.classList.add('active');
  sessionStorage.setItem('active-file', path);
}

function renderMarkdown(markdown, title) {
  const html = marked.parse(markdown || '# 문서를 불러오는 중입니다...');
  contentEl.innerHTML = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  document.title = `${title} | 정보처리기사 실기 문제집`;
}

async function loadFile(path) {
  const button = document.querySelector(`button[data-path="${CSS.escape(path)}"]`);
  if (button) setActiveButton(path, button);

  try {
    const response = await fetch(buildFileUrl(path));
    if (!response.ok) throw new Error('문서를 불러오지 못했습니다.');
    const markdown = await response.text();
    renderMarkdown(markdown, formatLabel(path));
  } catch (error) {
    contentEl.innerHTML = `<p>오류가 발생했습니다: ${error.message}</p>`;
  }
}

async function init() {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/git/trees/${branch}?recursive=1`);
    if (!response.ok) throw new Error('GitHub 저장소 목록을 불러오지 못했습니다.');

    const data = await response.json();
    const mdFiles = (data.tree || [])
      .filter((item) => item.type === 'blob' && /\.md$/i.test(item.path))
      .map((item) => item.path)
      .sort();

    if (!mdFiles.length) {
      contentEl.innerHTML = '<p>표시할 마크다운 파일이 없습니다.</p>';
      return;
    }

    const filtered = mdFiles.filter((path) => !path.endsWith('README.md'));
    const files = filtered.length ? filtered : mdFiles;

    files.forEach((path) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'file-link';
      button.dataset.path = path;
      button.textContent = formatLabel(path);
      button.addEventListener('click', () => loadFile(path));
      fileListEl.appendChild(button);
    });

    const initial = sessionStorage.getItem('active-file') || files[0];
    const matched = files.find((path) => path === initial) || files[0];
    const initialButton = document.querySelector(`button[data-path="${CSS.escape(matched)}"]`);
    if (initialButton) {
      setActiveButton(matched, initialButton);
    }
    loadFile(matched);
  } catch (error) {
    contentEl.innerHTML = `<p>오류: ${error.message}</p>`;
  }
}

init();

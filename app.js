const repo = 'onesdh/info-processor-study';
const branch = 'main';
const fileListEl = document.getElementById('file-list');
const contentEl = document.getElementById('content');
const currentRoundEl = document.getElementById('current-round');

function formatGroupLabel(folderPath) {
  return folderPath.replace(/\//g, ' / ');
}

function formatLabel(path) {
  const base = path.replace(/\.md$/i, '').replace(/^\//, '');
  const parts = base.split('/');
  const last = parts[parts.length - 1];

  if (last === 'README') {
    return parts.slice(0, -1).join(' / ') || '홈';
  }

  const m = last.match(/^(\d+)$/);
  if (m) {
    return `${m[1].padStart(2, '0')}번`;
  }

  return base.replace(/\//g, ' / ');
}

function buildFileUrl(path) {
  return `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;
}

function updateCurrentRoundLabel(folderPath) {
  if (!currentRoundEl) return;
  currentRoundEl.textContent = folderPath ? formatGroupLabel(folderPath) : '문서 선택';
}

function setActiveButton(path, button) {
  document.querySelectorAll('.file-link').forEach((el) => el.classList.remove('active'));
  if (button) button.classList.add('active');
  sessionStorage.setItem('active-file', path);

  const folderPath = path.split('/').slice(0, -1).join('/');
  if (folderPath) {
    updateCurrentRoundLabel(folderPath);
  }
}

function setActiveGroup(folderPath, button) {
  document.querySelectorAll('.group-link').forEach((el) => el.classList.remove('active'));
  if (button) button.classList.add('active');

  document.querySelectorAll('.group-items').forEach((list) => {
    const isActive = list.dataset.group === folderPath;
    list.style.display = isActive ? 'flex' : 'none';
  });

  sessionStorage.setItem('active-group', folderPath);
  updateCurrentRoundLabel(folderPath);
}

function resolveAssetUrl(filePath, assetPath) {
  if (!assetPath) return assetPath;

  if (/^https?:\/\//i.test(assetPath) || /^data:/i.test(assetPath) || assetPath.startsWith('//')) {
    return assetPath;
  }

  const directory = filePath.split('/').slice(0, -1).join('/');
  const baseUrl = directory
    ? `https://raw.githubusercontent.com/${repo}/${branch}/${directory}/`
    : `https://raw.githubusercontent.com/${repo}/${branch}/`;

  return new URL(assetPath, baseUrl).toString();
}

function renderMarkdown(markdown, title, filePath = '') {
  const html = marked.parse(markdown || '# 문서를 불러오는 중입니다...');
  const wrapper = document.createElement('div');
  wrapper.innerHTML = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

  wrapper.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    if (!src) return;
    img.setAttribute('src', resolveAssetUrl(filePath, src));
  });

  contentEl.innerHTML = wrapper.innerHTML;
  document.title = `${title} | 정보처리기사 실기 문제집`;
}

async function loadFile(path) {
  const button = document.querySelector(`button[data-path="${CSS.escape(path)}"]`);
  const folderPath = path.split('/').slice(0, -1).join('/');
  const groupButton = document.querySelector(`button[data-group="${CSS.escape(folderPath)}"]`);

  if (button) setActiveButton(path, button);
  if (groupButton) setActiveGroup(folderPath, groupButton);

  try {
    const response = await fetch(buildFileUrl(path));
    if (!response.ok) throw new Error('문서를 불러오지 못했습니다.');
    const markdown = await response.text();
    renderMarkdown(markdown, formatLabel(path), path);
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
      .filter((path) => !path.endsWith('README.md'))
      .sort();

    if (!mdFiles.length) {
      contentEl.innerHTML = '<p>표시할 마크다운 파일이 없습니다.</p>';
      return;
    }

    const groups = new Map();
    mdFiles.forEach((path) => {
      const folderPath = path.split('/').slice(0, -1).join('/');
      if (!folderPath) return;
      if (!groups.has(folderPath)) {
        groups.set(folderPath, []);
      }
      groups.get(folderPath).push(path);
    });

    const sortedGroups = [...groups.entries()].sort(([left], [right]) => left.localeCompare(right, 'ko'));

    sortedGroups.forEach(([folderPath, files]) => {
      const groupWrap = document.createElement('div');
      groupWrap.className = 'exam-group';

      const groupButton = document.createElement('button');
      groupButton.type = 'button';
      groupButton.className = 'group-link';
      groupButton.dataset.group = folderPath;
      groupButton.textContent = formatGroupLabel(folderPath);
      groupButton.addEventListener('click', () => {
        const current = fileListEl.querySelector(`.group-items[data-group="${CSS.escape(folderPath)}"]`);
        const isVisible = current && current.style.display !== 'none';

        if (isVisible) {
          current.style.display = 'none';
          groupButton.classList.remove('active');
          updateCurrentRoundLabel(folderPath);
          return;
        }

        const targetFiles = groups.get(folderPath) || [];
        const firstPath = targetFiles[0];
        if (firstPath) {
          loadFile(firstPath);
        }
      });

      const itemList = document.createElement('div');
      itemList.className = 'group-items';
      itemList.dataset.group = folderPath;

      files.sort().forEach((path) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'file-link';
        button.dataset.path = path;
        button.textContent = formatLabel(path);
        button.addEventListener('click', () => loadFile(path));
        itemList.appendChild(button);
      });

      groupWrap.appendChild(groupButton);
      groupWrap.appendChild(itemList);
      fileListEl.appendChild(groupWrap);
    });

    const savedGroup = sessionStorage.getItem('active-group') || sortedGroups[0][0];
    const savedFile = sessionStorage.getItem('active-file') || (groups.get(savedGroup) || [])[0];

    let initialGroup = savedGroup;
    if (!groups.has(initialGroup)) {
      initialGroup = sortedGroups[0][0];
    }

    const initialFiles = groups.get(initialGroup) || [];
    const initialPath = initialFiles.includes(savedFile) ? savedFile : initialFiles[0];

    const initialGroupButton = document.querySelector(`button[data-group="${CSS.escape(initialGroup)}"]`);
    if (initialGroupButton) {
      setActiveGroup(initialGroup, initialGroupButton);
    }

    const initialButton = document.querySelector(`button[data-path="${CSS.escape(initialPath)}"]`);
    if (initialButton) {
      setActiveButton(initialPath, initialButton);
    }

    loadFile(initialPath);
  } catch (error) {
    contentEl.innerHTML = `<p>오류: ${error.message}</p>`;
  }
}

init();

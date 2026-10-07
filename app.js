const repo = 'onesdh/info-processor-study';
const branch = 'main';
const statusCsvUrl = `https://raw.githubusercontent.com/${repo}/${branch}/data/problem-status.csv`;
const fileListEl = document.getElementById('file-list');
const contentEl = document.getElementById('content');
const currentRoundEl = document.getElementById('current-round');
const groupLookup = new Map();
const groupOrder = [];
const statusMeta = {
  틀림: { className: 'status-badge status-wrong', label: '틀림' },
  맞음: { className: 'status-badge status-correct', label: '맞음' },
  '개념 정리 필요': { className: 'status-badge status-review', label: '개념 정리 필요' },
  '다시 풀기': { className: 'status-badge status-repeat', label: '다시 풀기' },
  '복습 완료': { className: 'status-badge status-done', label: '복습 완료' },
  '안 품': { className: 'status-badge status-unattempted', label: '안 품' },
};
const problemStatusMap = new Map();
const statusFilterOrder = ['전체', '틀림', '맞음', '개념 정리 필요', '다시 풀기', '복습 완료', '안 품'];
let activeStatusFilter = '전체';

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

function normalizeProblemPath(value) {
  return String(value || '')
    .trim()
    .replace(/\\/g, '/')
    .replace(/^\.\//, '')
    .replace(/^\//, '');
}

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result.map((part) => part.trim());
}

function parseCsvRows(csvText) {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    return row;
  });
}

async function loadProblemStatusMap() {
  try {
    const response = await fetch(statusCsvUrl);
    if (!response.ok) throw new Error('문제 상태 CSV를 불러오지 못했습니다.');
    const csvText = await response.text();
    const rows = parseCsvRows(csvText);

    problemStatusMap.clear();
    rows.forEach((row) => {
      const normalizedPath = normalizeProblemPath(row.path);
      if (!normalizedPath) return;
      problemStatusMap.set(normalizedPath, row);
    });
  } catch (error) {
    console.warn(error.message);
  }
}

function getStatusForPath(filePath) {
  const normalizedPath = normalizeProblemPath(filePath);
  return problemStatusMap.get(normalizedPath) || null;
}

function getVisibleFilesForFilter(files) {
  if (activeStatusFilter === '전체') {
    return files;
  }

  return files.filter((path) => {
    const status = getStatusForPath(path);
    return status && status.status === activeStatusFilter;
  });
}

function updateFileButtonStatus(path, button) {
  if (!button) return;
  const status = getStatusForPath(path);
  const statusEl = button.querySelector('.status-chip');

  if (statusEl) {
    statusEl.remove();
  }

  if (!status || !status.status) return;

  const meta = statusMeta[status.status] || { className: 'status-badge status-default', label: status.status };
  const chip = document.createElement('span');
  chip.className = meta.className;
  chip.textContent = meta.label;
  button.appendChild(chip);
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

function getAdjacentPath(currentPath, direction) {
  const folderPath = currentPath.split('/').slice(0, -1).join('/');
  const files = groupLookup.get(folderPath) || [];
  const currentIndex = files.indexOf(currentPath);

  if (direction === 'prev') {
    if (currentIndex > 0) {
      return files[currentIndex - 1];
    }

    const groupIndex = groupOrder.indexOf(folderPath);
    if (groupIndex > 0) {
      const previousGroup = groupOrder[groupIndex - 1];
      const previousFiles = groupLookup.get(previousGroup) || [];
      return previousFiles[0] || null;
    }

    return null;
  }

  if (direction === 'next') {
    if (currentIndex >= 0 && currentIndex < files.length - 1) {
      return files[currentIndex + 1];
    }

    const groupIndex = groupOrder.indexOf(folderPath);
    if (groupIndex >= 0 && groupIndex < groupOrder.length - 1) {
      const nextGroup = groupOrder[groupIndex + 1];
      const nextFiles = groupLookup.get(nextGroup) || [];
      return nextFiles[0] || null;
    }

    return null;
  }

  return null;
}

function buildNavigation(filePath) {
  const nav = document.createElement('div');
  nav.className = 'content-nav';

  const folderPath = filePath.split('/').slice(0, -1).join('/');
  const prevPath = getAdjacentPath(filePath, 'prev');
  if (prevPath) {
    const prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.className = 'nav-button nav-button-prev';
    const prevFolder = prevPath.split('/').slice(0, -1).join('/');
    prevButton.textContent = prevFolder === folderPath ? '이전 문제' : '이전 회차';
    prevButton.addEventListener('click', () => loadFile(prevPath));
    nav.appendChild(prevButton);
  }

  const nextPath = getAdjacentPath(filePath, 'next');
  if (nextPath) {
    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'nav-button nav-button-next';
    const nextFolder = nextPath.split('/').slice(0, -1).join('/');
    nextButton.textContent = nextFolder === folderPath ? '다음 문제' : '다음 회차';
    nextButton.addEventListener('click', () => loadFile(nextPath));
    nav.appendChild(nextButton);
  }

  return nav;
}

function renderMarkdown(markdown, title, filePath = '') {
  const html = marked.parse(markdown || '# 문서를 불러오는 중입니다...');
  const wrapper = document.createElement('div');
  wrapper.className = 'content-body';
  wrapper.innerHTML = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

  wrapper.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    if (!src) return;
    img.setAttribute('src', resolveAssetUrl(filePath, src));
  });

  const status = getStatusForPath(filePath);
  contentEl.innerHTML = '';

  if (status && status.status) {
    const statusWrap = document.createElement('div');
    statusWrap.className = 'status-panel';

    const meta = statusMeta[status.status] || { className: 'status-badge status-default', label: status.status };
    const badge = document.createElement('span');
    badge.className = meta.className;
    badge.textContent = meta.label;
    statusWrap.appendChild(badge);

    if (status.comment) {
      const comment = document.createElement('div');
      comment.className = 'status-comment';
      comment.textContent = status.comment;
      statusWrap.appendChild(comment);
    }

    contentEl.appendChild(statusWrap);
  }

  const nav = buildNavigation(filePath);
  if (nav.children.length) {
    contentEl.appendChild(nav);
  }
  contentEl.appendChild(wrapper);
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

function renderStatusFilters() {
  const container = document.getElementById('status-filters');
  if (!container) return;

  container.innerHTML = '';

  statusFilterOrder.forEach((status) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filter-button ${activeStatusFilter === status ? 'active' : ''}`;
    button.textContent = status;
    button.addEventListener('click', () => {
      activeStatusFilter = status;
      renderStatusFilters();
      renderFileList();
    });
    container.appendChild(button);
  });
}

function renderFileList() {
  const fileListEl = document.getElementById('file-list');
  if (!fileListEl) return;

  fileListEl.innerHTML = '';

  const groups = new Map();
  const mdFiles = (window.allMarkdownFiles || []).filter((path) => !path.endsWith('README.md'));

  mdFiles.forEach((path) => {
    const folderPath = path.split('/').slice(0, -1).join('/');
    if (!folderPath) return;
    if (!groups.has(folderPath)) {
      groups.set(folderPath, []);
    }
    groups.get(folderPath).push(path);
  });

  const visibleGroups = [...groups.entries()]
    .map(([folderPath, files]) => [folderPath, getVisibleFilesForFilter(files)])
    .filter(([, files]) => files.length > 0)
    .sort(([left], [right]) => left.localeCompare(right, 'ko'));

  if (visibleGroups.length === 0) {
    fileListEl.innerHTML = '<div class="empty-state">해당 상태의 문제가 없습니다.</div>';
    return;
  }

  visibleGroups.forEach(([folderPath, files]) => {
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

      const targetFiles = getVisibleFilesForFilter(groups.get(folderPath) || []);
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

      const label = document.createElement('span');
      label.textContent = formatLabel(path);
      button.appendChild(label);

      const status = getStatusForPath(path);
      if (status && status.status) {
        const chip = document.createElement('span');
        const meta = statusMeta[status.status] || { className: 'status-badge status-default', label: status.status };
        chip.className = meta.className + ' status-chip';
        chip.textContent = meta.label;
        button.appendChild(chip);
      }

      button.addEventListener('click', () => loadFile(path));
      itemList.appendChild(button);
    });

    groupWrap.appendChild(groupButton);
    groupWrap.appendChild(itemList);
    fileListEl.appendChild(groupWrap);
  });
}

async function init() {
  try {
    await loadProblemStatusMap();

    const response = await fetch(`https://api.github.com/repos/${repo}/git/trees/${branch}?recursive=1`);
    if (!response.ok) throw new Error('GitHub 저장소 목록을 불러오지 못했습니다.');

    const data = await response.json();
    const mdFiles = (data.tree || [])
      .filter((item) => item.type === 'blob' && /\.md$/i.test(item.path))
      .map((item) => item.path)
      .filter((path) => !path.endsWith('README.md'))
      .sort();

    window.allMarkdownFiles = mdFiles;

    if (!mdFiles.length) {
      contentEl.innerHTML = '<p>표시할 마크다운 파일이 없습니다.</p>';
      return;
    }

    renderStatusFilters();
    renderFileList();

    const groups = new Map();
    mdFiles.forEach((path) => {
      const folderPath = path.split('/').slice(0, -1).join('/');
      if (!folderPath) return;
      if (!groups.has(folderPath)) {
        groups.set(folderPath, []);
      }
      groups.get(folderPath).push(path);
    });

    groupLookup.clear();
    groupOrder.length = 0;
    groups.forEach((files, folderPath) => {
      groupLookup.set(folderPath, files.slice().sort());
      groupOrder.push(folderPath);
    });
    groupOrder.sort((left, right) => left.localeCompare(right, 'ko'));

    const filteredGroups = [...groups.entries()]
      .map(([folderPath, files]) => [folderPath, getVisibleFilesForFilter(files)])
      .filter(([, files]) => files.length > 0)
      .sort(([left], [right]) => left.localeCompare(right, 'ko'));

    if (!filteredGroups.length) {
      contentEl.innerHTML = '<p>해당 상태의 문제가 없습니다.</p>';
      return;
    }

    const initialGroup = filteredGroups[0][0];
    const initialPath = filteredGroups[0][1][0];

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
